#!/usr/bin/env bash
set -euxo pipefail

# ─── CONFIGURATION ────────────────────────────────────────────────────────────
REPO_URL="https://github.com/HBClab/boost-act.git"
BRANCH="main"
# staging area for sparse-checkout
TEMP_DIR="$(pwd)/.temp_sparse_checkout"
# where to drop the plots, group files, and data.json
TARGET_DIR="$(pwd)/public/data"

# ─── SPARSE-CHECKOUT SETUP ────────────────────────────────────────────────────
echo "🔄 Creating sparse-checkout in ${TEMP_DIR}"
rm -rf "${TEMP_DIR}"
mkdir -p "${TEMP_DIR}"

git init "${TEMP_DIR}"
git -C "${TEMP_DIR}" remote add origin "${REPO_URL}"
git -C "${TEMP_DIR}" config core.sparseCheckout true

# only pull these paths
cat > "${TEMP_DIR}/.git/info/sparse-checkout" <<EOF
code/plots/
code/data.json
EOF

echo "🔄 Pulling ${BRANCH} (depth=1)…"
git -C "${TEMP_DIR}" pull --depth=1 origin "${BRANCH}"

# ─── COPY OUT THE CHECKED-OUT CONTENTS ────────────────────────────────────────
echo "🔁 Preparing ${TARGET_DIR}"
rm -rf "${TARGET_DIR}"
mkdir -p "${TARGET_DIR}"

echo "🔁 Copying plots → ${TARGET_DIR}"
cp -a "${TEMP_DIR}/code/plots/." "${TARGET_DIR}/"

if [ -f "${TEMP_DIR}/code/data.json" ]; then
  echo "🔁 Copying data.json → ${TARGET_DIR}/data.json"
  cp "${TEMP_DIR}/code/data.json" "${TARGET_DIR}/data.json"
fi

# ─── CLEANUP ─────────────────────────────────────────────────────────────────
echo "✅ Cleaning up ${TEMP_DIR}"
rm -rf "${TEMP_DIR}"

echo "🎉 Done!"
