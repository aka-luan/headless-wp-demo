#!/usr/bin/env bash
# Nightly backup: database dump + wp-content/uploads, keeping 7 days.
#   infra/backup.sh [backup-dir]         (default: infra/backups)
# Cron (root, since the compose commands need Docker):
#   15 3 * * * /home/ubuntu/headless-wp-demo/infra/backup.sh >> /var/log/tagline-backup.log 2>&1
# Restore: see "Backups" in the README.
set -euo pipefail

cd "$(dirname "$0")"
DIR="${1:-$PWD/backups}"
KEEP_DAYS=7
STAMP=$(date -u +%Y%m%d-%H%M%S)
mkdir -p "$DIR"

# Write to temp names, then rename, so a failed run never leaves a truncated "good" file.
docker compose exec -T db sh -c 'exec mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" --single-transaction --quick --routines "$MARIADB_DATABASE"' \
  | gzip > "$DIR/.db-$STAMP.sql.gz"
docker compose exec -T wordpress tar -C /var/www/html/wp-content -czf - uploads > "$DIR/.uploads-$STAMP.tar.gz"
mv "$DIR/.db-$STAMP.sql.gz" "$DIR/db-$STAMP.sql.gz"
mv "$DIR/.uploads-$STAMP.tar.gz" "$DIR/uploads-$STAMP.tar.gz"

find "$DIR" -maxdepth 1 \( -name 'db-*.sql.gz' -o -name 'uploads-*.tar.gz' \) -mtime +$((KEEP_DAYS - 1)) -delete
echo "$(date -u +%FT%TZ) backup ok: $DIR/db-$STAMP.sql.gz $DIR/uploads-$STAMP.tar.gz"
