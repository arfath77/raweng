# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public
CMD ["pnpm", "start"]
