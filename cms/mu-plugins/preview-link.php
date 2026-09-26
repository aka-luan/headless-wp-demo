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
    ], $site . '/api/preview/');
}, 10, 2);

// The block editor's first Preview opens core's "/?p=123&preview=true" on the CMS host, before the
// filtered link is available. Send editors on to the Next.js preview instead of letting the headless
// lock redirect them to the site's home page. Only users who can edit the post get the link, since
// it carries the preview secret. Runs before the headless lock (priority 0).
add_action('template_redirect', function () {
    if (!isset($_GET['preview'])) {
        return;
    }
    $id = absint($_GET['preview_id'] ?? $_GET['p'] ?? $_GET['page_id'] ?? 0);
    if (!$id || !current_user_can('edit_post', $id)) {
        return;
    }
    wp_redirect(get_preview_post_link($id), 302, 'Tagline headless preview');
    exit;
}, -10);
