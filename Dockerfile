FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && \
    npm i -g @nestjs/cli

EXPOSE 3000
