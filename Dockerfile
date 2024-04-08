FROM node:21-slim
WORKDIR /v1
COPY /v1/package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "app.js" ]