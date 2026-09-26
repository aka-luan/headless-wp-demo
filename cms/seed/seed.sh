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

wp eval-file /seed/content.php
wp rewrite flush

echo "Seed complete. Admin: $CMS_URL/wp-admin  GraphiQL: $CMS_URL/wp-admin/admin.php?page=graphiql-ide"
