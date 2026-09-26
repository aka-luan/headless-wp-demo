# Production image: Next.js standalone output served by `node server.js`.
# `next build` prerenders from WordPress, so the CMS must be reachable at WP_GRAPHQL_URL during the build.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS build
WORKDIR /app
ARG WP_GRAPHQL_URL
ARG SITE_URL
ENV WP_GRAPHQL_URL=$WP_GRAPHQL_URL \
    SITE_URL=$SITE_URL \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
# Docker sets HOSTNAME to the container id; server.js binds to it unless overridden.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
