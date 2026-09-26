<?php
/**
 * Plugin Name: Revalidation webhook
 * Description: Tells the Next.js site which cache tags to drop when content, menus or options change.
 *
 * Events are queued during the request and sent on shutdown, after SCF has saved
 * the post's fields, so Next never refetches half-saved content.
 * Payload: { type, id, uri }. Next maps it to wp:type:{type}, wp:uri:{uri}, wp:menus, wp:options.
 */

defined('ABSPATH') || exit;

final class Tagline_Revalidate
{
    /** Post types rendered by the Next.js site. */
    private const TYPES = ['page', 'post', 'case_study', 'changelog_entry', 'plan'];

    /** @var array<string, array{type:string,id:int|string|null,uri:?string}> */
    private static array $queue = [];

    public static function boot(): void
    {
        add_action('transition_post_status', [self::class, 'on_transition'], 10, 3);
        add_action('wp_update_nav_menu', fn ($menu_id) => self::push('menu', (int) $menu_id, null));
        add_action('acf/save_post', function ($post_id) {
            if ($post_id === 'options') {
                self::push('options', 'options', null);
            }
        }, 20);
        add_action('shutdown', [self::class, 'flush']);
    }

    public static function on_transition(string $new, string $old, WP_Post $post): void
    {
        // Only changes that touch the live site: publishing, updating a published post, or unpublishing.
        if ($new !== 'publish' && $old !== 'publish') {
            return;
        }
        if (wp_is_post_revision($post) || wp_is_post_autosave($post)) {
            return;
        }
        if (!in_array($post->post_type, self::TYPES, true)) {
            return;
        }

        self::push($post->post_type, $post->ID, self::uri_for($post));
    }

    /** Public path of the post as Next.js routes it, e.g. "/pricing/" or "/blog/hello/". */
    private static function uri_for(WP_Post $post): ?string
    {
        if ($post->post_type === 'changelog_entry') {
            return '/changelog/';
        }
        if ($post->post_type === 'plan') {
            return null; // Plans only appear through pricing_table blocks; the type tag covers them.
        }

        // Resolve the published URL even when the post was just trashed or drafted.
        $clone              = clone $post;
        $clone->post_status = 'publish';
        $clone->post_name   = preg_replace('/__trashed$/', '', $clone->post_name);
        $link               = get_permalink($clone);

        return $link ? wp_make_link_relative($link) : null;
    }

    private static function push(string $type, int|string|null $id, ?string $uri): void
    {
        self::$queue["{$type}:{$id}"] = ['type' => $type, 'id' => $id, 'uri' => $uri];
    }

    public static function flush(): void
    {
        if (!self::$queue) {
            return;
        }

        $endpoint = tagline_site_url() . '/api/revalidate';
        $secret   = tagline_secret('REVALIDATE_SECRET');

        foreach (self::$queue as $event) {
            error_log('[tagline-revalidate] ' . wp_json_encode($event) . " -> {$endpoint}");
            if ($secret === '' || tagline_site_url() === '') {
                continue;
            }
            wp_remote_post($endpoint, [
                'blocking' => false,
                'timeout'  => 2,
                'headers'  => [
                    'content-type'        => 'application/json',
                    'x-revalidate-secret' => $secret,
                ],
                'body'     => wp_json_encode($event),
            ]);
        }
        self::$queue = [];
    }
}

Tagline_Revalidate::boot();
