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

/**
 * Where WordPress POSTs revalidation webhooks. Defaults to SITE_URL/api/revalidate/.
 * REVALIDATE_URL overrides it for local Docker, where cURL maps *.localhost to 127.0.0.1
 * (ignoring Docker DNS), so WordPress must call the Next.js container directly.
 */
function tagline_revalidate_url(): string
{
    $url = (string) getenv('REVALIDATE_URL');
    return $url !== '' ? $url : tagline_site_url() . '/api/revalidate/';
}

function tagline_secret(string $name): string
{
    return (string) getenv($name);
}
