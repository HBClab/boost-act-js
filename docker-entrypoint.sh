#!/bin/bash
set -e

echo "→ listing /usr/local/bin:"
ls -l /usr/local/bin

echo "→ running sparse-checkout…"
sh /usr/local/bin/sparse-checkout.sh

exec npm run start
