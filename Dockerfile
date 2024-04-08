FROM node:21-slim
WORKDIR /usr/src/app
COPY /v1/package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "app.js" ]