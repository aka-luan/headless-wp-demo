<?php
/**
 * Plugin Name: Headless lock
 * Description: 301-redirects every front-end request on the CMS host to the same path on the Next.js site.
 *
 * template_redirect only runs for theme (front-end) requests, so wp-admin, wp-login.php,
 * wp-cron.php, /graphql and /wp-json never reach it; /wp-content and /wp-includes are
 * static files served by Caddy.
 */

defined('ABSPATH') || exit;

add_action('template_redirect', function () {
    $site = tagline_site_url();
    if ($site === '' || (defined('WP_CLI') && WP_CLI)) {
        return;
    }

    $path = $_SERVER['REQUEST_URI'] ?? '/';
    if (preg_match('#^/(wp-admin|wp-login\.php|graphql|wp-json|wp-content|wp-includes)(/|\?|$)#', $path)) {
        return; // Belt and braces, e.g. /wp-json before pretty permalinks are enabled.
    }

    wp_redirect($site . $path, 301, 'Tagline headless lock');
    exit;
}, 0);
