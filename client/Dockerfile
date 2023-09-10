# Dockerfile for the front end client

# Build the client

FROM node:18.17-alpine3.17

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
