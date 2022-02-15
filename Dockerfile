FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm build
COPY . .
EXPOSE 8080
CMD [ "node", "./dist/main.js" ]