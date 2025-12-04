#!/bin/bash

set -euo pipefail

FRONTEND_DIR="/opt/workflowgenius/frontend"
DEPLOY_DIR="/opt/workflowgenius/deploy"
TEMP_DIR="/tmp/workflowgenius-frontend"
ARCHIVE="/tmp/frontend-dist.tar.gz"

echo "Starting frontend deployment..."

if [ ! -f "$ARCHIVE" ]; then
    echo "Error: Archive file not found at $ARCHIVE"
    exit 1
fi

echo "Extracting archive..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"
tar -xzf "$ARCHIVE" -C "$TEMP_DIR"

echo "Backing up current deployment..."
if [ -d "$FRONTEND_DIR/dist" ]; then
    BACKUP_DIR="$FRONTEND_DIR/dist.backup.$(date +%Y%m%d_%H%M%S)"
    mv "$FRONTEND_DIR/dist" "$BACKUP_DIR"
    echo "Backup created at: $BACKUP_DIR"
    
    # Удаление старых бэкапов (оставляем только последние 3)
    OLD_BACKUPS=$(find "$FRONTEND_DIR" -maxdepth 1 -type d -name "dist.backup.*" | sort -r | tail -n +4)
    if [ -n "$OLD_BACKUPS" ]; then
        echo "$OLD_BACKUPS" | while read -r backup; do
            if [ -n "$backup" ]; then
                rm -rf "$backup"
                echo "Removed old backup: $backup"
            fi
        done
    fi
fi

echo "Deploying new files..."
mkdir -p "$FRONTEND_DIR"
mv "$TEMP_DIR/dist" "$FRONTEND_DIR/dist"
chown -R www-data:www-data "$FRONTEND_DIR/dist"
# Установка правильных прав: директории 755, файлы 644
find "$FRONTEND_DIR/dist" -type d -exec chmod 755 {} \;
find "$FRONTEND_DIR/dist" -type f -exec chmod 644 {} \;

echo "Cleaning up..."
rm -rf "$TEMP_DIR"
rm -f "$ARCHIVE"

echo "Reloading nginx..."
if systemctl is-active --quiet nginx; then
    nginx -t && systemctl reload nginx
    echo "Nginx reloaded successfully"
else
    echo "Warning: Nginx is not running"
fi

echo "Frontend deployment completed successfully!"

