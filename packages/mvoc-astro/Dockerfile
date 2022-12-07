# Stage 1: Build application
FROM node:16-alpine as mvoc-build
WORKDIR /app

COPY . .

RUN yarn --pure-lockfile --non-interactive

ARG buildid=0

RUN yarn build:mvoc-astro

# Stage 2: Run application
FROM bitnami/nginx:latest

COPY --from=mvoc-build /app/packages/mvoc-astro/dist /app/
COPY ./packages/mvoc-astro/nginx.conf ./packages/mvoc-astro/nginx_headers.conf ./packages/mvoc-astro/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
