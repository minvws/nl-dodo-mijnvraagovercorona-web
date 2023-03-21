FROM bitnami/nginx:latest

COPY packages/mvoc/dist /app/
COPY packages/mvoc/nginx.conf packages/mvoc/nginx_headers.conf packages/mvoc/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
