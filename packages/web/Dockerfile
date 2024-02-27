FROM bitnami/nginx:latest

COPY packages/web/dist /app/
COPY packages/web/nginx.conf packages/web/nginx_headers.conf packages/web/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
