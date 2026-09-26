#!/bin/sh
# Installs WordPress, the plugins and the theme, then loads sample content.
# Safe to re-run: content is upserted by slug.
#
#   cd infra && docker compose run --rm seed
set -eu
cd /var/www/html

if ! wp core is-installed 2>/dev/null; then
  wp core install \
    --url="$CMS_URL" \
    --title="$BRAND_NAME" \
    --admin_user="$WP_ADMIN_USER" \
    --admin_password="$WP_ADMIN_PASSWORD" \
    --admin_email="$WP_ADMIN_EMAIL" \
    --skip-email
fi

# Pinned so a fresh clone gets the versions this repo was built against.
install_plugin() {
  wp plugin install "$1" --version="$2" --activate --force
}
install_plugin secure-custom-fields 6.9.5
install_plugin wp-graphql 2.23.1
install_plugin wpgraphql-acf 3.0.0
install_plugin wordpress-seo 28.5
install_plugin add-wpgraphql-seo 5.1.0
wp plugin delete akismet hello 2>/dev/null || true

wp theme activate tagline
wp option update blogname "$BRAND_NAME"
wp option update blogdescription "Customer feedback, sorted."
wp option update timezone_string "UTC"
# Hide the plugins' telemetry opt-in banners (no data is sent either way).
wp option update wp-graphql_tracking_notice hide
wp option update wpgraphql-acf_tracking_notice hide

# URIs in WordPress match the Next.js routes: /blog/{slug}/, /blog/category/{slug}/, /customers/{slug}/
wp rewrite structure '/blog/%postname%/'
wp option update category_base 'blog/category'

# Yoast: titles use the same separator as the Next.js fallbacks ("Page · Tagline").
wp option patch update wpseo_titles separator sc-middot
wp option patch update wpseo_titles title-tax-category '%%term_title%% articles %%sep%% %%sitename%%'

wp eval-file /seed/content.php
wp rewrite flush
# Yoast's indexables hold breadcrumb ancestors and the SEO data WPGraphQL serves.
wp yoast index

# Application Password the Next.js server uses for previews and leads (WP_APP_PASSWORD in .env).
# WordPress shows a new password only once, so it is created on the first run only.
if ! wp user application-password list "$WP_APP_USER" --field=name | grep -qx tagline-next; then
  APP_PASSWORD=$(wp user application-password create "$WP_APP_USER" tagline-next --porcelain)
  echo ""
  echo "Application Password created. Put this in infra/.env, then run 'docker compose up -d web':"
  echo "  WP_APP_PASSWORD=$APP_PASSWORD"
  echo ""
fi

echo "Seed complete. Admin: $CMS_URL/wp-admin  GraphiQL: $CMS_URL/wp-admin/admin.php?page=graphiql-ide"
