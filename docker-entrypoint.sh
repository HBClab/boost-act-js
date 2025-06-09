#!/bin/sh
set -e

# 1) run your sparse‐checkout on every start
/sparse_checkout.sh

# 2) list to verify (optional)
/usr/bin/ls -R public/data

# 3) hand off to whatever CMD you supplied
exec "$@"
