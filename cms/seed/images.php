<?php
/**
 * Placeholder images drawn with GD at seed time, so no binaries live in git.
 * Replace them in the media library once the real design assets exist.
 *
 * They follow the site's design tokens (web/src/app/globals.css): cool paper, navy ink,
 * cobalt, and paper-tag colours. Shapes are drawn at 2x and scaled down, so edges are smooth.
 */

const TAGLINE_INK    = [17, 26, 59];
const TAGLINE_ACCENT = [43, 59, 240];
const TAGLINE_PAPER  = [238, 240, 243];
const TAGLINE_LINE   = [211, 216, 226];
const TAGLINE_BAR    = [196, 201, 216];
const TAGLINE_TAGS   = [[236, 217, 159], [184, 232, 211], [255, 202, 214], [200, 217, 255]]; // manila, mint, blush, sky
const TAGLINE_PALETTE = [TAGLINE_ACCENT, ...TAGLINE_TAGS, TAGLINE_INK];

/** Bump when the drawings change: file names include it, so caches never serve an old drawing. */
const TAGLINE_IMAGE_STYLE = 2;

/**
 * Every seed image: key => [alt text, drawer]. content.php and cms/ops/redraw-images.php both use it.
 *
 * @return array<string, array{0: string, 1: callable}>
 */
function tagline_image_catalog(): array
{
    $catalog = [
        'ui-inbox'    => ['Tagline inbox with tagged feedback from several channels', fn () => tagline_draw_ui('inbox')],
        'ui-board'    => ['Tagline board grouping feedback by theme', fn () => tagline_draw_ui('board')],
        'ui-insights' => ['Tagline insights chart showing request volume by theme', fn () => tagline_draw_ui('insights')],
    ];
    foreach (['Northwind', 'Brightpath', 'Lumen', 'Orbitly', 'Cobalt', 'Fieldnote'] as $i => $name) {
        $catalog['logo-' . strtolower($name)] = ["{$name} logo", fn () => tagline_draw_logo($name, $i)];
    }
    foreach (['PS' => 'Priya Shah', 'DK' => 'Daniel Kim', 'AM' => 'Ana Moreira', 'JO' => 'Jonah Okafor'] as $ini => $name) {
        $n = count(array_filter(array_keys($catalog), fn ($k) => str_starts_with($k, 'avatar-')));
        $catalog['avatar-' . strtolower($ini)] = [$name, fn () => tagline_draw_avatar($ini, TAGLINE_TAGS[$n % 4])];
    }
    for ($i = 1; $i <= 5; $i++) {
        $catalog["cover-{$i}"] = ['Abstract cover illustration', fn () => tagline_draw_cover($i)];
    }
    return $catalog;
}

/**
 * Archivo Black for wordmarks and initials, downloaded once from Google Fonts (OFL).
 * Returns null when offline; text then falls back to GD's built-in bitmap font.
 */
function tagline_font(): ?string
{
    static $path = false;
    if ($path !== false) {
        return $path;
    }
    $path = sys_get_temp_dir() . '/tagline-seed-ArchivoBlack-Regular.ttf';
    if (!is_file($path)) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        $tmp = download_url('https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/ArchivoBlack-Regular.ttf', 30);
        if (is_wp_error($tmp) || !function_exists('imagettftext') || !@rename($tmp, $path)) {
            if (class_exists('WP_CLI')) {
                WP_CLI::warning('Could not load Archivo Black; placeholder text uses the bitmap font.');
            }
            return $path = null;
        }
    }
    return $path;
}

/** A GD canvas drawn at 2x in logical coordinates, then scaled down by finish(). */
final class Tagline_Painter
{
    private const K = 2;
    public GdImage $im;

    public function __construct(private int $w, private int $h, ?array $bg)
    {
        $this->im = imagecreatetruecolor($w * self::K, $h * self::K);
        imagesavealpha($this->im, true);
        imagealphablending($this->im, false);
        imagefill($this->im, 0, 0, $bg ? $this->color($bg) : imagecolorallocatealpha($this->im, 0, 0, 0, 127));
        imagealphablending($this->im, true);
    }

    public function color(array $c)
    {
        return imagecolorallocate($this->im, $c[0], $c[1], $c[2]);
    }

    public function rect(float $x1, float $y1, float $x2, float $y2, array $c, float $r = 0): void
    {
        [$x1, $y1, $x2, $y2, $r] = array_map(fn ($v) => (int) round($v * self::K), [$x1, $y1, $x2, $y2, $r]);
        $col = $this->color($c);
        if ($r <= 0) {
            imagefilledrectangle($this->im, $x1, $y1, $x2, $y2, $col);
            return;
        }
        imagefilledrectangle($this->im, $x1 + $r, $y1, $x2 - $r, $y2, $col);
        imagefilledrectangle($this->im, $x1, $y1 + $r, $x2, $y2 - $r, $col);
        foreach ([[$x1 + $r, $y1 + $r], [$x2 - $r, $y1 + $r], [$x1 + $r, $y2 - $r], [$x2 - $r, $y2 - $r]] as [$cx, $cy]) {
            imagefilledellipse($this->im, $cx, $cy, $r * 2, $r * 2, $col);
        }
    }

    /** A rectangle with a 1px (logical) border. */
    public function panel(float $x1, float $y1, float $x2, float $y2, array $fill, float $r = 0, array $border = TAGLINE_LINE): void
    {
        $this->rect($x1, $y1, $x2, $y2, $border, $r);
        $this->rect($x1 + 1, $y1 + 1, $x2 - 1, $y2 - 1, $fill, max(0, $r - 1));
    }

    public function circle(float $cx, float $cy, float $d, array $c): void
    {
        imagefilledellipse($this->im, (int) round($cx * self::K), (int) round($cy * self::K), (int) round($d * self::K), (int) round($d * self::K), $this->color($c));
    }

    /** @param array<array{0: float, 1: float}> $points */
    public function poly(array $points, array $c): void
    {
        $flat = [];
        foreach ($points as [$x, $y]) {
            $flat[] = (int) round($x * self::K);
            $flat[] = (int) round($y * self::K);
        }
        imagefilledpolygon($this->im, $flat, $this->color($c));
    }

    /**
     * A paper tag like the site's .tag: pointed left end, eyelet punched in the colour behind it.
     * Rotated by $deg around its centre.
     */
    public function tag(float $x1, float $y1, float $x2, float $y2, array $c, array $behind, float $deg = 0): void
    {
        $h     = $y2 - $y1;
        $point = $h * 0.42;
        $mid   = ($y1 + $y2) / 2;
        $cx    = ($x1 + $x2) / 2;
        $cy    = $mid;
        $rad   = deg2rad($deg);
        $rot   = fn ($x, $y) => [
            $cx + ($x - $cx) * cos($rad) - ($y - $cy) * sin($rad),
            $cy + ($x - $cx) * sin($rad) + ($y - $cy) * cos($rad),
        ];
        $this->poly(array_map(fn ($p) => $rot(...$p), [[$x1 + $point, $y1], [$x2, $y1], [$x2, $y2], [$x1 + $point, $y2], [$x1, $mid]]), $c);
        [$hx, $hy] = $rot($x1 + $point + $h * 0.02, $mid);
        $this->circle($hx, $hy, $h * 0.2, $behind);
    }

    public function text(string $text, float $x, float $baseline, float $size, array $c): void
    {
        $font = tagline_font();
        if ($font) {
            imagettftext($this->im, $size * self::K, 0, (int) round($x * self::K), (int) round($baseline * self::K), $this->color($c), $font, $text);
            return;
        }
        // Fallback: GD's bitmap font, scaled up.
        $scale = max(1, (int) round($size * self::K / 13));
        $w     = imagefontwidth(5) * strlen($text);
        $fh    = imagefontheight(5);
        $tmp   = imagecreatetruecolor($w, $fh);
        imagesavealpha($tmp, true);
        imagefill($tmp, 0, 0, imagecolorallocatealpha($tmp, 0, 0, 0, 127));
        imagestring($tmp, 5, 0, 0, $text, imagecolorallocate($tmp, $c[0], $c[1], $c[2]));
        imagecopyresized($this->im, $tmp, (int) round($x * self::K), (int) round($baseline * self::K) - $fh * $scale, 0, 0, $w * $scale, $fh * $scale, $w, $fh);
    }

    /** Logical width of $text at $size. */
    public function textWidth(string $text, float $size): float
    {
        $font = tagline_font();
        if ($font) {
            $box = imagettfbbox($size * self::K, 0, $font, $text);
            return ($box[2] - $box[0]) / self::K;
        }
        return imagefontwidth(5) * strlen($text) * max(1, (int) round($size * self::K / 13)) / self::K;
    }

    public function finish(): GdImage
    {
        $out = imagecreatetruecolor($this->w, $this->h);
        imagealphablending($out, false);
        imagesavealpha($out, true);
        imagecopyresampled($out, $this->im, 0, 0, 0, 0, $this->w, $this->h, $this->w * self::K, $this->h * self::K);
        imagedestroy($this->im);
        return $out;
    }
}

/** A stylised product screenshot: feedback inbox, theme board or insights chart. */
function tagline_draw_ui(string $variant, int $w = 1600, int $h = 1000): GdImage
{
    $p     = new Tagline_Painter($w, $h, TAGLINE_PAPER);
    $white = [255, 255, 255];
    $pad   = 56;

    // App window: top bar with the tag mark, sidebar, content area.
    $p->panel($pad, $pad, $w - $pad, $h - $pad, $white, 14);
    $p->rect($pad + 1, $pad + 64, $w - $pad - 1, $pad + 65, TAGLINE_LINE);
    $p->tag($pad + 28, $pad + 20, $pad + 64, $pad + 44, TAGLINE_ACCENT, $white, -12);
    $p->rect($pad + 80, $pad + 27, $pad + 190, $pad + 37, TAGLINE_INK, 5);
    $p->rect($w - $pad - 250, $pad + 18, $w - $pad - 30, $pad + 46, TAGLINE_PAPER, 6);

    $sx = $pad + 28;
    $sy = $pad + 100;
    for ($i = 0; $i < 7; $i++) {
        $y = $sy + $i * 50;
        if ($i === 0) {
            $p->rect($sx - 10, $y - 12, $sx + 210, $y + 22, TAGLINE_PAPER, 6);
            $p->rect($sx - 10, $y - 12, $sx - 6, $y + 22, TAGLINE_ACCENT);
        }
        $p->rect($sx + 8, $y, $sx + 60 + ($i * 37 % 110), $y + 10, $i === 0 ? TAGLINE_INK : TAGLINE_BAR, 5);
    }
    $cx = $sx + 250;
    $cw = $w - $pad - 36 - $cx;
    $p->rect($cx - 22, $pad + 65, $cx - 21, $h - $pad - 1, TAGLINE_LINE);

    if ($variant === 'inbox') {
        $p->rect($cx, $sy - 6, $cx + 240, $sy + 14, TAGLINE_INK, 5);
        for ($i = 0; $i < 6; $i++) {
            $y = $sy + 50 + $i * 112;
            $p->rect($cx, $y + 100, $cx + $cw, $y + 101, TAGLINE_LINE);
            $p->circle($cx + 30, $y + 44, 44, TAGLINE_TAGS[($i + 1) % 4]);
            $p->rect($cx + 70, $y + 26, $cx + 70 + 240 + ($i * 53 % 200), $y + 38, TAGLINE_INK, 6);
            $p->rect($cx + 70, $y + 56, $cx + 70 + 380 + ($i * 91 % 260), $y + 66, TAGLINE_BAR, 5);
            for ($t = 0; $t < 1 + $i % 2; $t++) {
                $x2 = $cx + $cw - 10 - $t * 150;
                $p->tag($x2 - 136, $y + 28, $x2, $y + 60, TAGLINE_TAGS[($i + $t * 2) % 4], $white);
                $p->rect($x2 - 96, $y + 40, $x2 - 24, $y + 48, TAGLINE_INK, 4);
            }
        }
    } elseif ($variant === 'board') {
        // Theme columns of feedback tags: the same picture as the home page sorter.
        $cols = 4;
        $gap  = 24;
        $colw = ($cw - $gap * ($cols - 1)) / $cols;
        for ($c = 0; $c < $cols; $c++) {
            $x = $cx + $c * ($colw + $gap);
            $p->rect($x, $sy, $x + $colw * 0.5, $sy + 14, TAGLINE_INK, 7);
            $p->rect($x + $colw - 56, $sy - 6, $x + $colw, $sy + 20, TAGLINE_INK, 6);
            $p->rect($x, $sy + 44, $x + $colw, $sy + 45, TAGLINE_LINE);
            for ($k = 0; $k < 4 - $c % 3; $k++) {
                $y = $sy + 70 + $k * 128;
                $p->tag($x, $y, $x + $colw, $y + 108, TAGLINE_TAGS[$c], $white, ($k * 7 + $c * 3) % 5 * 0.4 - 0.8);
                $p->rect($x + 58, $y + 30, $x + $colw - 30 - ($k * 40 % 90), $y + 42, TAGLINE_INK, 6);
                $p->rect($x + 58, $y + 56, $x + $colw - 60, $y + 66, [90, 98, 130], 5);
                $p->rect($x + 58, $y + 78, $x + 58 + 70, $y + 86, [90, 98, 130], 4);
            }
        }
    } else { // insights
        $p->rect($cx, $sy - 6, $cx + 300, $sy + 14, TAGLINE_INK, 5);
        $kw = ($cw - 48) / 3;
        foreach ([0, 1, 2] as $k) {
            $x = $cx + $k * ($kw + 24);
            $p->panel($x, $sy + 44, $x + $kw, $sy + 176, $white, 8);
            $p->rect($x + 24, $sy + 72, $x + 130, $sy + 82, TAGLINE_BAR, 5);
            $p->rect($x + 24, $sy + 110, $x + 120 + $k * 36, $sy + 150, $k === 0 ? TAGLINE_ACCENT : TAGLINE_INK, 6);
        }
        $base = $h - $pad - 70;
        $top  = $sy + 220;
        foreach ([0, 1, 2, 3] as $g) {
            $gy = $top + 40 + $g * ($base - $top - 40) / 4;
            $p->rect($cx, $gy, $cx + $cw, $gy + 1, TAGLINE_LINE);
        }
        $p->rect($cx, $base, $cx + $cw, $base + 2, TAGLINE_INK);
        $bars = [0.45, 0.62, 0.38, 0.8, 0.55, 0.92, 0.7, 0.5, 0.86, 0.64];
        $bw   = ($cw - 40) / count($bars) - 20;
        foreach ($bars as $i => $v) {
            $x = $cx + 20 + $i * ($bw + 20);
            $y = $base - ($base - $top - 50) * $v;
            $p->rect($x, $y, $x + $bw, $base, $i === 5 ? TAGLINE_ACCENT : TAGLINE_TAGS[$i % 4], 4);
        }
    }
    return $p->finish();
}

function tagline_draw_logo(string $name, int $shape): GdImage
{
    $p  = new Tagline_Painter(360, 120, null);
    $cx = 44;
    $cy = 60;
    $c  = [TAGLINE_INK, TAGLINE_ACCENT][($shape + intdiv($shape, 4)) % 2];
    switch ($shape % 4) {
        case 0: // Northwind: a compass notch
            $p->circle($cx, $cy, 52, $c);
            $p->poly([[$cx, $cy - 18], [$cx + 9, $cy + 12], [$cx - 9, $cy + 12]], [255, 255, 255]);
            break;
        case 1: // Brightpath: stepped path
            foreach ([0, 1, 2] as $s) {
                $p->rect($cx - 26 + $s * 18, $cy + 8 - $s * 16, $cx - 10 + $s * 18, $cy + 26 - $s * 16, $c, 3);
            }
            break;
        case 2: // Lumen: a lens
            $p->circle($cx, $cy, 54, $c);
            $p->circle($cx + 12, $cy - 8, 30, [255, 255, 255]);
            break;
        default: // Orbitly, Fieldnote: a diamond
            $p->poly([[$cx, $cy - 28], [$cx + 28, $cy], [$cx, $cy + 28], [$cx - 28, $cy]], $c);
    }
    $p->text($name, 84, 73, 29, TAGLINE_INK);
    return $p->finish();
}

function tagline_draw_avatar(string $initials, array $color): GdImage
{
    $p    = new Tagline_Painter(256, 256, $color);
    $size = 88;
    $p->text($initials, (256 - $p->textWidth($initials, $size)) / 2, 128 + $size * 0.36, $size, TAGLINE_INK);
    return $p->finish();
}

/** Blog covers: a few big paper tags on a flat colour, laid out differently per seed. */
function tagline_draw_cover(int $seed): GdImage
{
    $w      = 1200;
    $h      = 630;
    $colors = [TAGLINE_INK, TAGLINE_ACCENT, ...TAGLINE_TAGS];
    $bg     = $colors[$seed % 6];
    $p      = new Tagline_Painter($w, $h, $bg);
    mt_srand($seed * 7);
    for ($i = 0; $i < 5; $i++) {
        $tw  = mt_rand(360, 620);
        $th  = $tw * 0.4;
        $x   = mt_rand(-120, $w - $tw + 120);
        $y   = mt_rand(-60, $h - (int) $th + 60);
        $c   = $colors[($seed + 1 + $i) % 6];
        if ($c === $bg) {
            $c = [255, 255, 255];
        }
        $p->tag($x, $y, $x + $tw, $y + $th, $c, $bg, mt_rand(-28, 28));
    }
    return $p->finish();
}

/** Writes an image to a temp PNG named for the current drawing style. */
function tagline_render_image(string $key, callable $draw): string
{
    $tmp = wp_tempnam($key . '.png');
    $im  = $draw();
    imagepng($im, $tmp, 8);
    imagedestroy($im);
    return $tmp;
}

/** File name for a seed image in the current drawing style, e.g. "ui-inbox-v2.png". */
function tagline_image_filename(string $key): string
{
    return $key . '-v' . TAGLINE_IMAGE_STYLE . '.png';
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

    $tmp = tagline_render_image($key, $draw);
    $id  = media_handle_sideload(['name' => tagline_image_filename($key), 'tmp_name' => $tmp], 0, $alt);
    if (is_wp_error($id)) {
        @unlink($tmp);
        WP_CLI::error("Image {$key}: " . $id->get_error_message());
    }
    update_post_meta($id, '_tagline_seed', $key);
    update_post_meta($id, '_wp_attachment_image_alt', $alt);
    return (int) $id;
}
