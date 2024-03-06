# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.12.1 as build-stage

RUN mkdir /vitepress-docs 
WORKDIR /vitepress-docs

COPY ./package.json ./pnpm-lock.yaml /vitepress-docs/
COPY ./src /vitepress-docs/src

RUN npm install pnpm -g
RUN pnpm install
RUN pnpm build


ARG FRONTEND_ENV=production

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /vitepress-docs/docs/.vitepress/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
