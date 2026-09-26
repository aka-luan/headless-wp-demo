<?php
/**
 * One-off: redraw the seed placeholder images in the current style (cms/seed/images.php).
 * Each attachment keeps its ID, so every page, logo cloud and case study that uses it
 * picks up the new file. The new file name carries the style version, so no cache
 * serves the old drawing. Safe to re-run: images already in this style are skipped.
 *
 *   docker compose run -T --rm wpcli eval-file - < ../cms/ops/redraw-images.php
 *
 * Next.js caches rendered pages, so run this before rebuilding the web image
 * (or edit and save any page to revalidate).
 */

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';

// This file is piped in on stdin, so load images.php from the seed mount (see docker-compose.yml).
$images = getenv('TAGLINE_SEED_DIR') ?: '/seed';
require_once $images . '/images.php';

foreach (tagline_image_catalog() as $key => [$alt, $draw]) {
    $ids = get_posts([
        'post_type'   => 'attachment',
        'post_status' => 'inherit',
        'meta_key'    => '_tagline_seed',
        'meta_value'  => $key,
        'fields'      => 'ids',
        'numberposts' => 1,
    ]);
    if (!$ids) {
        WP_CLI::log("{$key}: no attachment, skipped (run the seed to create it)");
        continue;
    }
    $id      = (int) $ids[0];
    $oldFile = get_attached_file($id);
    $name    = tagline_image_filename($key);
    if ($oldFile && basename($oldFile) === $name) {
        WP_CLI::log("{$key}: already current");
        continue;
    }

    $tmp    = tagline_render_image($key, $draw);
    $upload = wp_upload_bits($name, null, file_get_contents($tmp));
    @unlink($tmp);
    if ($upload['error']) {
        WP_CLI::error("{$key}: {$upload['error']}");
    }

    $oldMeta = wp_get_attachment_metadata($id);
    update_attached_file($id, $upload['file']);
    wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $upload['file']));
    if ($oldFile && is_array($oldMeta)) {
        wp_delete_attachment_files($id, $oldMeta, [], $oldFile);
    }
    WP_CLI::log("{$key}: redrawn as " . basename($upload['file']));
}
WP_CLI::success('Images are in style v' . TAGLINE_IMAGE_STYLE . '.');
