<?php
/**
 * Custom post types and taxonomies. Registered in code (not the SCF UI) so the
 * GraphQL names are fixed and reviewed in git.
 */

defined('ABSPATH') || exit;

add_action('init', function () {
    register_post_type('case_study', [
        'labels'              => tagline_labels('Case study', 'Case studies'),
        'public'              => true,
        'has_archive'         => false,
        'menu_icon'           => 'dashicons-awards',
        'menu_position'       => 21,
        'supports'            => ['title', 'thumbnail', 'revisions'],
        'rewrite'             => ['slug' => 'customers', 'with_front' => false],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'caseStudy',
        'graphql_plural_name' => 'caseStudies',
    ]);

    register_post_type('changelog_entry', [
        'labels'              => tagline_labels('Changelog entry', 'Changelog'),
        'public'              => true,
        'publicly_queryable'  => false, // Listed on /changelog only; no single pages.
        'has_archive'         => false,
        'menu_icon'           => 'dashicons-megaphone',
        'menu_position'       => 22,
        'supports'            => ['title', 'revisions'],
        'rewrite'             => false,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'changelogEntry',
        'graphql_plural_name' => 'changelogEntries',
    ]);

    register_post_type('plan', [
        'labels'              => tagline_labels('Plan', 'Plans'),
        'public'              => true, // WPGraphQL hides non-public types from anonymous queries.
        'publicly_queryable'  => false, // Used only through pricing_table blocks; no URLs.
        'exclude_from_search' => true,
        'show_in_nav_menus'   => false,
        'rewrite'             => false,
        'menu_icon'           => 'dashicons-money-alt',
        'menu_position'       => 23,
        'supports'            => ['title', 'page-attributes', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'plan',
        'graphql_plural_name' => 'plans',
    ]);

    // Contact-form submissions, created by the Next.js /api/contact route over REST.
    register_post_type('lead', [
        'labels'          => tagline_labels('Lead', 'Leads'),
        'public'          => false,
        'show_ui'         => true,
        'menu_icon'       => 'dashicons-email-alt',
        'menu_position'   => 24,
        'supports'        => ['title', 'custom-fields'],
        'show_in_rest'    => true,
        'rest_base'       => 'leads',
        'show_in_graphql' => false,
    ]);
    foreach (['lead_name', 'lead_email', 'lead_company', 'lead_message'] as $key) {
        register_post_meta('lead', $key, [
            'type'          => 'string',
            'single'        => true,
            'show_in_rest'  => true,
            'auth_callback' => fn () => current_user_can('edit_posts'),
        ]);
    }

    register_taxonomy('change_type', ['changelog_entry'], [
        'labels'              => tagline_labels('Change type', 'Change types'),
        'public'              => false,
        'show_ui'             => true,
        'show_admin_column'   => true,
        'hierarchical'        => true, // Checkbox UI in the editor.
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'changeType',
        'graphql_plural_name' => 'changeTypes',
    ]);

    // Pages are assembled from the "blocks" field; the editor body is unused.
    remove_post_type_support('page', 'editor');
});

// Changelog entries have no page of their own, but editors still need the Preview button (it opens
// /changelog/ in Draft Mode, drafts included). Core shows it only for viewable types, so mark the type
// viewable and point its links at the list on the site.
add_filter('is_post_type_viewable', function (bool $viewable, WP_Post_Type $type) {
    return $type->name === 'changelog_entry' ? true : $viewable;
}, 10, 2);
add_filter('post_type_link', function (string $link, WP_Post $post) {
    if ($post->post_type !== 'changelog_entry' || tagline_site_url() === '') {
        return $link;
    }
    return tagline_site_url() . '/changelog/';
}, 10, 2);

// Everything except blog posts is edited through fields, so use the classic screen.
// This also means fields save in the same request as the post (see revalidate webhook).
add_filter('use_block_editor_for_post_type', function (bool $use, string $post_type) {
    return $post_type === 'post' ? $use : false;
}, 10, 2);

// Leads list and read-only detail box.
add_filter('manage_lead_posts_columns', function (array $cols) {
    return array_slice($cols, 0, 2) + ['lead_email' => 'Email', 'lead_company' => 'Company'] + $cols;
});
add_action('manage_lead_posts_custom_column', function (string $col, int $post_id) {
    if (in_array($col, ['lead_email', 'lead_company'], true)) {
        echo esc_html((string) get_post_meta($post_id, $col, true));
    }
}, 10, 2);
add_action('add_meta_boxes_lead', function () {
    add_meta_box('tagline_lead', 'Lead', function (WP_Post $post) {
        $rows = ['lead_name' => 'Name', 'lead_email' => 'Email', 'lead_company' => 'Company', 'lead_message' => 'Message'];
        echo '<table class="form-table"><tbody>';
        foreach ($rows as $key => $label) {
            printf(
                '<tr><th>%s</th><td>%s</td></tr>',
                esc_html($label),
                nl2br(esc_html((string) get_post_meta($post->ID, $key, true)))
            );
        }
        echo '</tbody></table>';
    }, 'lead', 'normal', 'high');
});

function tagline_labels(string $singular, string $plural): array
{
    return [
        'name'          => $plural,
        'singular_name' => $singular,
        'add_new_item'  => "Add {$singular}",
        'edit_item'     => "Edit {$singular}",
        'new_item'      => "New {$singular}",
        'view_item'     => "View {$singular}",
        'search_items'  => "Search {$plural}",
        'not_found'     => 'Nothing found',
        'all_items'     => "All {$plural}",
        'menu_name'     => $plural,
    ];
}
