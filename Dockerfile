FROM node:14.15.4-alpine3.12

WORKDIR /var/www/app

RUN apk add --no-cache bash
