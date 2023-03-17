FROM bitnami/nginx:latest

COPY dist /app/
COPY nginx.conf nginx_headers.conf nginx_common.conf /opt/bitnami/nginx/conf/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
