<?php
/**
 * Plugin Name: Tagline config
 * Description: Reads the headless settings from the environment. Loaded first (mu-plugins load alphabetically).
 */

defined('ABSPATH') || exit;

/** Public Next.js site, e.g. https://tagline.example.com (no trailing slash). */
function tagline_site_url(): string
{
    return rtrim((string) getenv('SITE_URL'), '/');
}

function tagline_secret(string $name): string
{
    return (string) getenv($name);
}
