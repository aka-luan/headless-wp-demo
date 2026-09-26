<?php

defined('ABSPATH') || exit;

// WPGraphQL only exposes menus publicly when they are assigned to a location.
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    register_nav_menus([
        'primary' => 'Primary navigation',
        'footer'  => 'Footer navigation',
    ]);
});
