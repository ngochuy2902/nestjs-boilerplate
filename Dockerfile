FROM node:22.14.0-alpine AS dev-dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:22.14.0-alpine AS prod-dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

FROM node:22.14.0-alpine AS prod-builder
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build
RUN find dist -type f -name '*.map' -delete

FROM node:22.14.0-alpine AS development
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
ENTRYPOINT [ "yarn", "dev" ]

FROM node:22.14.0-alpine AS production
WORKDIR /app
COPY --from=prod-dependencies /app/package.json ./package.json
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=prod-builder /app/dist ./dist
ENTRYPOINT [ "yarn", "start:prod" ]
