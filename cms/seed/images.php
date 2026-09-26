<?php
/**
 * Placeholder images drawn with GD at seed time, so no binaries live in git.
 * Replace them in the media library once the real design assets exist.
 */

const TAGLINE_ACCENT = [79, 70, 229];
const TAGLINE_PALETTE = [
    [79, 70, 229], [14, 165, 233], [16, 185, 129], [245, 158, 11], [236, 72, 153], [100, 116, 139],
];

function tagline_rgb($im, array $c, int $alpha = 0)
{
    return imagecolorallocatealpha($im, $c[0], $c[1], $c[2], $alpha);
}

function tagline_rrect($im, int $x1, int $y1, int $x2, int $y2, int $r, $color): void
{
    $rgba = imagecolorsforindex($im, $color);
    if ($rgba['alpha'] > 0) {
        // Translucent: draw opaque-overlap-free on a layer, then blend it once.
        $w     = $x2 - $x1 + 1;
        $h     = $y2 - $y1 + 1;
        $layer = imagecreatetruecolor($w, $h);
        imagesavealpha($layer, true);
        imagealphablending($layer, false);
        imagefill($layer, 0, 0, imagecolorallocatealpha($layer, 0, 0, 0, 127));
        $c = imagecolorallocatealpha($layer, $rgba['red'], $rgba['green'], $rgba['blue'], $rgba['alpha']);
        imagefilledrectangle($layer, $r, 0, $w - 1 - $r, $h - 1, $c);
        imagefilledrectangle($layer, 0, $r, $w - 1, $h - 1 - $r, $c);
        foreach ([[$r, $r], [$w - 1 - $r, $r], [$r, $h - 1 - $r], [$w - 1 - $r, $h - 1 - $r]] as [$cx, $cy]) {
            imagefilledellipse($layer, $cx, $cy, $r * 2, $r * 2, $c);
        }
        imagecopy($im, $layer, $x1, $y1, 0, 0, $w, $h);
        imagedestroy($layer);
        return;
    }
    imagefilledrectangle($im, $x1 + $r, $y1, $x2 - $r, $y2, $color);
    imagefilledrectangle($im, $x1, $y1 + $r, $x2, $y2 - $r, $color);
    foreach ([[$x1 + $r, $y1 + $r], [$x2 - $r, $y1 + $r], [$x1 + $r, $y2 - $r], [$x2 - $r, $y2 - $r]] as [$cx, $cy]) {
        imagefilledellipse($im, $cx, $cy, $r * 2, $r * 2, $color);
    }
}

/** Built-in GD font scaled up with nearest-neighbour: blocky, but legible and dependency-free. */
function tagline_text($im, string $text, int $x, int $y, int $scale, $color): void
{
    $w   = imagefontwidth(5) * strlen($text);
    $h   = imagefontheight(5);
    $tmp = imagecreatetruecolor($w, $h);
    imagesavealpha($tmp, true);
    imagefill($tmp, 0, 0, imagecolorallocatealpha($tmp, 0, 0, 0, 127));
    imagestring($tmp, 5, 0, 0, $text, imagecolorallocate($tmp, 255, 255, 255));
    $rgb = imagecolorsforindex($im, $color);
    imagefilter($tmp, IMG_FILTER_COLORIZE, $rgb['red'] - 255, $rgb['green'] - 255, $rgb['blue'] - 255);
    imagecopyresized($im, $tmp, $x, $y, 0, 0, $w * $scale, $h * $scale, $w, $h);
    imagedestroy($tmp);
}

function tagline_canvas(int $w, int $h, bool $transparent = false)
{
    $im = imagecreatetruecolor($w, $h);
    imageantialias($im, true);
    imagesavealpha($im, true);
    imagealphablending($im, !$transparent);
    imagefill($im, 0, 0, $transparent ? imagecolorallocatealpha($im, 0, 0, 0, 127) : imagecolorallocate($im, 255, 255, 255));
    imagealphablending($im, true);
    return $im;
}

function tagline_gradient($im, int $w, int $h, array $from, array $to): void
{
    for ($y = 0; $y < $h; $y++) {
        $t = $y / max(1, $h - 1);
        $c = array_map(fn ($a, $b) => (int) round($a + ($b - $a) * $t), $from, $to);
        imageline($im, 0, $y, $w, $y, tagline_rgb($im, $c));
    }
}

/** A stylised product screenshot: feedback inbox, tag board or insights chart. */
function tagline_draw_ui(string $variant, int $w = 1600, int $h = 1000)
{
    $im = tagline_canvas($w, $h);
    tagline_gradient($im, $w, $h, [238, 242, 255], [224, 231, 255]);
    $white = tagline_rgb($im, [255, 255, 255]);
    $line  = tagline_rgb($im, [226, 232, 240]);
    $muted = tagline_rgb($im, [203, 213, 225]);
    $ink   = tagline_rgb($im, [51, 65, 85]);
    $acc   = tagline_rgb($im, TAGLINE_ACCENT);

    // Window + chrome
    $pad = 70;
    tagline_rrect($im, $pad, $pad, $w - $pad, $h - $pad, 24, $white);
    imagefilledrectangle($im, $pad, $pad + 60, $w - $pad, $pad + 61, $line);
    foreach ([[248, 113, 113], [251, 191, 36], [52, 211, 153]] as $i => $c) {
        imagefilledellipse($im, $pad + 36 + $i * 30, $pad + 30, 16, 16, tagline_rgb($im, $c));
    }
    // Sidebar
    $sx = $pad + 30;
    $sy = $pad + 100;
    tagline_rrect($im, $sx, $sy, $sx + 40, $sy + 40, 10, $acc);
    for ($i = 0; $i < 6; $i++) {
        tagline_rrect($im, $sx, $sy + 90 + $i * 56, $sx + 220, $sy + 118 + $i * 56, 8, $i === 0 ? tagline_rgb($im, [238, 242, 255]) : $white);
        imagefilledrectangle($im, $sx + 16, $sy + 100 + $i * 56, $sx + 60 + ($i * 37 % 110), $sy + 108 + $i * 56, $i === 0 ? $acc : $muted);
    }
    $cx = $sx + 270;
    $cw = $w - $pad - 40 - $cx;
    imagefilledrectangle($im, $cx - 20, $pad + 62, $cx - 19, $h - $pad - 1, $line);

    if ($variant === 'inbox') {
        for ($i = 0; $i < 6; $i++) {
            $y = $sy + $i * 112;
            tagline_rrect($im, $cx, $y, $cx + $cw, $y + 92, 14, $i === 1 ? tagline_rgb($im, [238, 242, 255]) : tagline_rgb($im, [248, 250, 252]));
            imagefilledellipse($im, $cx + 44, $y + 46, 44, 44, tagline_rgb($im, TAGLINE_PALETTE[($i + 2) % 6]));
            imagefilledrectangle($im, $cx + 90, $y + 24, $cx + 90 + 260 + ($i * 53 % 200), $y + 36, $ink);
            imagefilledrectangle($im, $cx + 90, $y + 54, $cx + 90 + 420 + ($i * 91 % 260), $y + 64, $muted);
            for ($t = 0; $t < 1 + $i % 3; $t++) {
                $c = TAGLINE_PALETTE[($i + $t) % 6];
                tagline_rrect($im, $cx + $cw - 120 - $t * 110, $y + 30, $cx + $cw - 30 - $t * 110, $y + 62, 16, tagline_rgb($im, $c, 90));
            }
        }
    } elseif ($variant === 'board') {
        $cols = 3;
        $gap  = 30;
        $colw = (int) (($cw - $gap * ($cols - 1)) / $cols);
        for ($c = 0; $c < $cols; $c++) {
            $x = $cx + $c * ($colw + $gap);
            tagline_rrect($im, $x, $sy, $x + $colw, $h - $pad - 40, 16, tagline_rgb($im, [248, 250, 252]));
            tagline_rrect($im, $x + 20, $sy + 22, $x + 130, $sy + 50, 14, tagline_rgb($im, TAGLINE_PALETTE[$c], 80));
            for ($k = 0; $k < 4 - ($c % 2); $k++) {
                $y = $sy + 80 + $k * 150;
                tagline_rrect($im, $x + 20, $y, $x + $colw - 20, $y + 128, 12, $white);
                imagefilledrectangle($im, $x + 40, $y + 26, $x + $colw - 80 - ($k * 40 % 90), $y + 38, $ink);
                imagefilledrectangle($im, $x + 40, $y + 58, $x + $colw - 60, $y + 66, $muted);
                imagefilledrectangle($im, $x + 40, $y + 78, $x + $colw - 140, $y + 86, $muted);
                imagefilledellipse($im, $x + $colw - 50, $y + 102, 28, 28, tagline_rgb($im, TAGLINE_PALETTE[($c + $k + 3) % 6]));
            }
        }
    } else { // insights
        imagefilledrectangle($im, $cx, $sy + 10, $cx + 320, $sy + 30, $ink);
        $kw = (int) (($cw - 60) / 3);
        foreach ([0, 1, 2] as $k) {
            $x = $cx + $k * ($kw + 30);
            tagline_rrect($im, $x, $sy + 60, $x + $kw, $sy + 190, 14, tagline_rgb($im, [248, 250, 252]));
            imagefilledrectangle($im, $x + 24, $sy + 90, $x + 140, $sy + 100, $muted);
            imagefilledrectangle($im, $x + 24, $sy + 124, $x + 110 + $k * 30, $sy + 160, tagline_rgb($im, TAGLINE_PALETTE[$k]));
        }
        $base = $h - $pad - 70;
        $top  = $sy + 240;
        tagline_rrect($im, $cx, $top, $cx + $cw, $base + 30, 14, tagline_rgb($im, [248, 250, 252]));
        $bars = [0.45, 0.62, 0.38, 0.8, 0.55, 0.92, 0.7, 0.5, 0.86, 0.64];
        $bw   = (int) (($cw - 80) / count($bars)) - 18;
        foreach ($bars as $i => $v) {
            $x = $cx + 40 + $i * ($bw + 18);
            $y = (int) ($base - ($base - $top - 50) * $v);
            tagline_rrect($im, $x, $y, $x + $bw, $base, 8, $i === 5 ? $acc : tagline_rgb($im, TAGLINE_ACCENT, 80));
        }
    }
    return $im;
}

function tagline_draw_logo(string $name, int $shape, array $color)
{
    $im = tagline_canvas(360, 120, true);
    $c  = tagline_rgb($im, $color);
    $cx = 50;
    $cy = 60;
    switch ($shape % 4) {
        case 0: imagefilledellipse($im, $cx, $cy, 56, 56, $c); break;
        case 1: tagline_rrect($im, $cx - 28, $cy - 28, $cx + 28, $cy + 28, 12, $c); break;
        case 2: imagefilledpolygon($im, [$cx, $cy - 30, $cx + 30, $cy + 26, $cx - 30, $cy + 26], $c); break;
        default: imagefilledpolygon($im, [$cx, $cy - 32, $cx + 32, $cy, $cx, $cy + 32, $cx - 32, $cy], $c);
    }
    tagline_text($im, $name, 96, 45, 2, tagline_rgb($im, [51, 65, 85]));
    return $im;
}

function tagline_draw_avatar(string $initials, array $color)
{
    $im = tagline_canvas(256, 256);
    tagline_gradient($im, 256, 256, $color, array_map(fn ($v) => (int) ($v * 0.7), $color));
    $w = imagefontwidth(5) * strlen($initials) * 6;
    tagline_text($im, $initials, (int) ((256 - $w) / 2), 83, 6, tagline_rgb($im, [255, 255, 255]));
    return $im;
}

function tagline_draw_cover(int $seed)
{
    $w  = 1200;
    $h  = 630;
    $a  = TAGLINE_PALETTE[$seed % 6];
    $b  = TAGLINE_PALETTE[($seed + 2) % 6];
    $im = tagline_canvas($w, $h);
    tagline_gradient($im, $w, $h, $a, $b);
    mt_srand($seed);
    for ($i = 0; $i < 9; $i++) {
        $r = mt_rand(80, 320);
        imagefilledellipse($im, mt_rand(0, $w), mt_rand(0, $h), $r, $r, tagline_rgb($im, [255, 255, 255], mt_rand(95, 118)));
    }
    tagline_rrect($im, 140, 180, 1060, 450, 28, tagline_rgb($im, [255, 255, 255], 20));
    for ($i = 0; $i < 3; $i++) {
        imagefilledrectangle($im, 200, 240 + $i * 60, 200 + 700 - $i * 180, 262 + $i * 60, tagline_rgb($im, [148, 163, 184], $i ? 30 : 0));
    }
    return $im;
}

/**
 * Returns the attachment ID for a seed image, creating it on first run.
 */
function tagline_seed_image(string $key, string $alt, callable $draw): int
{
    $existing = get_posts([
        'post_type'   => 'attachment',
        'post_status' => 'inherit',
        'meta_key'    => '_tagline_seed',
        'meta_value'  => $key,
        'fields'      => 'ids',
        'numberposts' => 1,
    ]);
    if ($existing) {
        return (int) $existing[0];
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    $im  = $draw();
    $tmp = wp_tempnam($key . '.png');
    imagepng($im, $tmp, 8);
    imagedestroy($im);

    $id = media_handle_sideload(['name' => $key . '.png', 'tmp_name' => $tmp], 0, $alt);
    if (is_wp_error($id)) {
        @unlink($tmp);
        WP_CLI::error("Image {$key}: " . $id->get_error_message());
    }
    update_post_meta($id, '_tagline_seed', $key);
    update_post_meta($id, '_wp_attachment_image_alt', $alt);
    return (int) $id;
}
