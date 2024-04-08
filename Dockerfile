FROM node:21-slim

WORKDIR /v1

COPY package.json ./
COPY ./v1 /v1


RUN npm install 


EXPOSE 4000

CMD [ "node", "app.js" ]
