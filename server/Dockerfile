# Dockerfile for Node server

FROM node:18.17-alpine3.17

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . /usr/src/app

EXPOSE 2999

RUN npx tsc

CMD ["npm", "run", "start"]