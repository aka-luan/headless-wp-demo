<?php
/**
 * Plugin Name: GraphQL hardening
 * Description: Public introspection only in local/development (codegen needs it); always off in production.
 */

defined('ABSPATH') || exit;

add_filter('graphql_get_setting_section_field_value', function ($value, $default, $option_name, $section_fields, $section_name) {
    if ($section_name === 'graphql_general_settings' && $option_name === 'public_introspection_enabled') {
        return in_array(wp_get_environment_type(), ['local', 'development'], true) ? 'on' : 'off';
    }
    return $value;
}, 10, 5);
