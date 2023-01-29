FROM node:16-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY .env ./.env

RUN rm -rf node_modules
RUN npm cache clean -force
RUN npm install --verbose
RUN npm install --no-package-lock

COPY . .

EXPOSE 5000
CMD npm start