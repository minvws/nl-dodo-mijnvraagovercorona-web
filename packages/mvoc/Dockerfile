# Stage 1: Build application
FROM node:16-alpine as mvoc-build
WORKDIR /app

COPY . .

RUN yarn --pure-lockfile --non-interactive

ARG buildid=0

RUN yarn mvoc:build

# Stage 2: Run application
FROM bitnami/nginx:latest

COPY --from=mvoc-build /app/packages/mvoc/dist /app/
COPY ./packages/mvoc/nginx.conf ./packages/mvoc/nginx_headers.conf ./packages/mvoc/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
