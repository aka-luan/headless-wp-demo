<?php
/**
 * Yoast SEO settings for the headless front end.
 */

defined('ABSPATH') || exit;

// Yoast builds indexables (which hold breadcrumb ancestors and SEO data for WPGraphQL) only on
// production by default. Local and staging need them too, or nested pages lose their breadcrumbs.
add_filter('Yoast\WP\SEO\should_index_indexables', '__return_true');
