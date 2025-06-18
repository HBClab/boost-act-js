#!/bin/bash
set -eux

# ─── Config Variables ────────────────────────────────────────────────────────
REPO_URL="https://github.com/HBClab/boost-act.git"
BRANCH="dev"
TEMP_DIR="$(pwd)/.temp_sparse_checkout"
TARGET_DIR="$(pwd)/public/data"

# ─── Create Sparse Checkout ──────────────────────────────────────────────────
echo "🔄 Creating sparse-checkout in ${TEMP_DIR}"
mkdir -p "${TEMP_DIR}"
git init "${TEMP_DIR}"
git -C "${TEMP_DIR}" remote add origin "${REPO_URL}"
git -C "${TEMP_DIR}" config core.sparseCheckout true
mkdir -p "${TEMP_DIR}/.git/info"
printf "code/plots/\ncode/data.json\n" > "${TEMP_DIR}/.git/info/sparse-checkout"
git -C "${TEMP_DIR}" pull origin "${BRANCH}" --depth=1

# ─── Copy Extracted Files ────────────────────────────────────────────────────
echo "🔁 Copying sparse-checked data to ${TARGET_DIR}"
rm -rf "${TARGET_DIR}"
mkdir -p "${TARGET_DIR}"
cp -R "${TEMP_DIR}/code/plots/." "${TARGET_DIR}/"
if [ -f "${TEMP_DIR}/code/data.json" ]; then
    cp "${TEMP_DIR}/code/data.json" "${TARGET_DIR}/data.json"
fi

# ─── Cleanup ─────────────────────────────────────────────────────────────────
echo "✅ Cleaning up"
rm -rf "${TEMP_DIR}"
rm -rf "${TARGET_DIR}/junk"

# Start the app
exec "$@"
