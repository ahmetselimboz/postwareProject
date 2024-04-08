FROM node:21-slim

WORKDIR /v1

COPY v1/package.json ./
COPY v1/app.js ./

RUN npm install 

EXPOSE 4000

CMD [ "node", "app.js" ]
