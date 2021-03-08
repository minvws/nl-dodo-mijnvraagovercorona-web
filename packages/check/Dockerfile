# Stage 1: Build application
FROM node:14-alpine as check-build
WORKDIR /app

COPY . .

RUN yarn --pure-lockfile --non-interactive

ARG buildid=0

RUN yarn build:check

# Stage 2: Run application
FROM bitnami/nginx:latest

COPY --from=check-build /app/packages/check/out /app/
COPY ./packages/check/nginx.conf ./packages/check/nginx_headers.conf ./packages/check/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
