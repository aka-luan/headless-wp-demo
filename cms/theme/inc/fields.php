<?php
/**
 * Field groups are stored as JSON in the theme's acf-json folder so the
 * content model is versioned in git. SCF reads and writes them there.
 */

defined('ABSPATH') || exit;

add_filter('acf/settings/save_json', fn () => get_stylesheet_directory() . '/acf-json');
add_filter('acf/settings/load_json', fn () => [get_stylesheet_directory() . '/acf-json']);

// WPGraphQL for ACF turns every empty() value into null, so a $0 plan price comes back as null.
// Restore stored zeros for number fields.
add_filter('wpgraphql/acf/field_value', function ($value, $field, $root, $node_id) {
    if ($value !== null || ($field['type'] ?? '') !== 'number') {
        return $value;
    }
    $raw = is_array($root) ? ($root[$field['key']] ?? $root[$field['name']] ?? null) : null;
    if ($raw === null && $node_id) {
        $raw = get_field($field['key'], $node_id, false);
    }
    return is_numeric($raw) ? (float) $raw : null;
}, 10, 4);

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title'         => 'Site settings',
        'menu_title'         => 'Site settings',
        'menu_slug'          => 'site-settings',
        'capability'         => 'edit_theme_options',
        'icon_url'           => 'dashicons-admin-generic',
        'position'           => 59,
        'redirect'           => false,
        'show_in_graphql'    => true,
        'graphql_field_name' => 'globals',
    ]);
});
