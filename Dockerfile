FROM node:21-slim

WORKDIR /v1

COPY package.json ./
COPY src/ ./src

RUN npm install 


EXPOSE 4000

CMD [ "node", "app.js" ]
