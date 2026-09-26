<?php
/**
 * One-off: show the feedback sorter in the home page hero (added with the redesign).
 * Touches only that field, unlike a re-seed. Safe to re-run.
 *
 *   docker compose run -T --rm wpcli eval-file - < ../cms/ops/hero-sorter.php
 */

$home = (int) get_option('page_on_front');
$blocks = get_field('field_blocks_blocks', $home, false);
if (!$home || !is_array($blocks)) {
    WP_CLI::error('No front page with blocks.');
}
foreach ($blocks as $i => $row) {
    if (($row['acf_fc_layout'] ?? '') === 'hero') {
        $ok = update_sub_field(['field_blocks_blocks', $i + 1, 'field_blocks_hero_visual'], 'sorter', $home);
        WP_CLI::log("Row {$i}: " . ($ok ? 'set to sorter' : 'unchanged'));
        break;
    }
}
// Content changed outside the editor, so queue the same revalidation a save would (sent on shutdown).
if (class_exists('Tagline_Revalidate')) {
    Tagline_Revalidate::on_transition('publish', 'publish', get_post($home));
}
// Read the stored meta: get_field() would return ACF's cached value from before the update.
foreach ($blocks as $i => $row) {
    if (($row['acf_fc_layout'] ?? '') === 'hero') {
        WP_CLI::success('Home hero visual: ' . get_post_meta($home, "blocks_{$i}_visual", true));
        break;
    }
}
