FROM bitnami/nginx:latest

COPY packages/cms/dist /app/
COPY packages/cms/nginx.conf packages/cms/nginx_headers.conf packages/cms/nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
