# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.12.1 as build-stage

WORKDIR /vitepress-docs

COPY . /vitepress-docs

RUN npm install pnpm -g && pnpm install && pnpm build


ARG FRONTEND_ENV=production

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /vitepress-docs/docs/.vitepress/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /vitepress-docs/node_modules
