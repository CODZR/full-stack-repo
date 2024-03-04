# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.12.1 as build-stage

WORKDIR /vitepress-docs

COPY package*.json /vitepress-docs/

RUN npm install pnpm -g
RUN pnpm install

COPY ./ /vitepress-docs/

ARG FRONTEND_ENV=production

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Comment out the next line to disable tests
# RUN pnpm run test:unit

RUN npm install pnpm -g
RUN pnpm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /vitepress-docs/docs/.vitepress/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
