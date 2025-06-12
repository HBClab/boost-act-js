# Use Node base image
FROM node:18-alpine

# Install git for the sparse-checkout
RUN apk add --no-cache git


# Copy package files and install dependencies (cache layer)
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install

# Copy the rest of your source
COPY . .

# copy your two scripts in, make them executable
COPY sparse-checkout.sh /usr/local/bin/sparse-checkout.sh
COPY docker-entrypoint.sh  /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/sparse-checkout.sh \
    /usr/local/bin/docker-entrypoint.sh

# expose port
EXPOSE 3000

# run entrypoint, then CMD
ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]
