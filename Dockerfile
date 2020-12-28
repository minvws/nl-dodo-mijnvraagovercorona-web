# copied from https://github.com/minvws/nl-covid19-data-dashboard/blob/develop/Dockerfile

# Stage 0 - Install dependencies
FROM node:14 as react-build-base
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
COPY . .

# Stage 1 - Build application
FROM node:14 as react-build

WORKDIR /app
COPY --from=react-build-base /app/node_modules /app/node_modules
COPY . .
RUN yarn build

RUN yarn global add pm2

EXPOSE 8080
#CMD ["pm2-runtime", "start", "yarn", "--", "start"]
CMD ["yarn", "start", "-p", "8080"]

## Stage 2 - the test environment
#FROM bitnami/nginx:latest

# COPY --from=react-build /app/build /app/

#COPY nginx.conf nginx_headers.conf nginx_common.conf nginx_nl.conf /opt/bitnami/nginx/conf/

#ADD run.sh /
#RUN chmod +x /run.sh

#EXPOSE 8080
#CMD ["/run.sh"]
#CMD ["nginx", "-g", "daemon off;"]
#CMD ["sh", "-c", "pm2-runtime start yarn -- start && nginx -g daemon off;"]
