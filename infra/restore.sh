#!/usr/bin/env bash
# Restores a backup from infra/backup.sh into this compose project, replacing its database and
# wp-content/uploads + plugins, then rewrites the backup's URLs to this environment's.
#   infra/restore.sh db-XXXX.sql.gz files-XXXX.tar.gz [from-cms-url] [from-site-url]
# The from-URLs default to production. db, wordpress and caddy must be running.
# Extra compose options (another project, env file) go in COMPOSE, e.g.
#   COMPOSE="docker compose -p tagline-restore --env-file restore.env" infra/restore.sh ...
set -euo pipefail

DB_DUMP=$(realpath "$1")
FILES_TAR=$(realpath "$2")
FROM_CMS="${3:-https://cms.tagline.luanalves.com.br}"
FROM_SITE="${4:-https://tagline.luanalves.com.br}"
cd "$(dirname "$0")"
read -r -a DC <<< "${COMPOSE:-docker compose}"

wp() { "${DC[@]}" run --rm -T wpcli "$@" </dev/null; }

echo "Importing database..."
"${DC[@]}" exec -T db sh -c 'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS \`$MARIADB_DATABASE\`; CREATE DATABASE \`$MARIADB_DATABASE\`; GRANT ALL ON \`$MARIADB_DATABASE\`.* TO \`$MARIADB_USER\`@\`%\`;"' </dev/null
gunzip -c "$DB_DUMP" | "${DC[@]}" exec -T db sh -c 'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" "$MARIADB_DATABASE"'

echo "Restoring wp-content..."
"${DC[@]}" exec -T wordpress sh -c 'rm -rf /var/www/html/wp-content/uploads /var/www/html/wp-content/plugins' </dev/null
"${DC[@]}" exec -T wordpress tar -C /var/www/html/wp-content -xzf - < "$FILES_TAR"
"${DC[@]}" exec -T wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads /var/www/html/wp-content/plugins </dev/null

TO_CMS=$(wp eval 'echo getenv("CMS_URL");')
TO_SITE=$(wp eval 'echo getenv("SITE_URL");')
if [ "$FROM_CMS" != "$TO_CMS" ]; then wp search-replace "$FROM_CMS" "$TO_CMS" --all-tables --no-report; fi
if [ "$FROM_SITE" != "$TO_SITE" ]; then wp search-replace "$FROM_SITE" "$TO_SITE" --all-tables --no-report; fi
wp rewrite flush
echo "Restore complete: $TO_CMS"
