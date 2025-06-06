# Use Node base image
FROM node:18-alpine

# Install git for the sparse-checkout
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (cache layer)
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install

# Copy the rest of your source
COPY . .

# ─── Sparse-checkout of public/data ───────────────────────────────────────────
RUN set -eux; \
    REPO_URL="https://github.com/HBClab/boost-act.git"; \
    BRANCH="dev"; \
    TEMP_DIR="$(pwd)/.temp_sparse_checkout"; \
    TARGET_DIR="$(pwd)/public/data"; \
    \
    echo "🔄 Creating sparse-checkout in ${TEMP_DIR}"; \
    mkdir -p "${TEMP_DIR}"; \
    git init "${TEMP_DIR}"; \
    git -C "${TEMP_DIR}" remote add origin "${REPO_URL}"; \
    git -C "${TEMP_DIR}" config core.sparseCheckout true; \
    mkdir -p "${TEMP_DIR}/.git/info"; \
    printf "code/plots/\ncode/data.json\n" > "${TEMP_DIR}/.git/info/sparse-checkout"; \
    git -C "${TEMP_DIR}" pull origin "${BRANCH}" --depth=1; \
    \
    echo "🔁 Copying sparse-checked data to ${TARGET_DIR}"; \
    rm -rf "${TARGET_DIR}"; \
    mkdir -p "${TARGET_DIR}"; \
    cp -R "${TEMP_DIR}/code/plots/." "${TARGET_DIR}/"; \
    if [ -f "${TEMP_DIR}/code/data.json" ]; then \
      cp "${TEMP_DIR}/code/data.json" "${TARGET_DIR}/data.json"; \
    fi; \
    \
    echo "✅ Cleaning up"; \
    rm -rf "${TEMP_DIR}"; \
    rm -rf "${TARGET_DIR}/junk"

RUN ls -R public/data

# Build the React (or other front-end) app
RUN npm run build

# Install serve to run the static site
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
