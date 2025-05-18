FROM node:22-alpine
WORKDIR /usr/src/app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
CMD ["pnpm", "start"]