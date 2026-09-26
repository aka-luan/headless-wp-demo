#!/usr/bin/env bash
# Nightly backup: database dump + wp-content/uploads, keeping 7 days.
#   infra/backup.sh [backup-dir]         (default: infra/backups)
# Scheduled nightly by a systemd timer (infra/systemd/, runs as root since compose needs Docker):
#   sudo cp infra/systemd/tagline-backup.* /etc/systemd/system/ && sudo systemctl enable --now tagline-backup.timer
# Restore: see "Backups" in the README.
set -euo pipefail
umask 077 # dumps hold password hashes

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
