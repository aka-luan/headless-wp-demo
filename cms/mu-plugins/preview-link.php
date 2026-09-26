<?php
/**
 * Plugin Name: Headless preview
 * Description: Points the editor's "Preview" button at the Next.js Draft Mode route.
 */

defined('ABSPATH') || exit;

add_filter('preview_post_link', function (string $link, WP_Post $post) {
    $site   = tagline_site_url();
    $secret = tagline_secret('PREVIEW_SECRET');
    if ($site === '' || $secret === '') {
        return $link;
    }

    return add_query_arg([
        'secret' => rawurlencode($secret),
        'id'     => $post->ID,
        'type'   => $post->post_type,
    ], $site . '/api/preview');
}, 10, 2);
