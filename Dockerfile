FROM node:14.21.2-alpine

USER root

RUN apk update && apk upgrade

RUN npm install -g @nestjs/cli@^9.0.0

WORKDIR /app

RUN chown -R node:node /app

USER node

RUN mkdir -p /app/dist

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000


CMD ["npm", "run", "start:debug"]
