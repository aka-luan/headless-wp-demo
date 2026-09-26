<?php
/**
 * Editor experience tweaks.
 */

defined('ABSPATH') || exit;

// Page blocks come first on the edit screen; SEO settings sit below them.
add_filter('wpseo_metabox_prio', fn () => 'low');

// Plans and changelog entries have no URLs of their own: no SEO box, no sitemap entry.
add_filter('wpseo_accessible_post_types', function (array $types) {
    return array_diff_key($types, array_flip(['plan', 'changelog_entry', 'lead']));
});
