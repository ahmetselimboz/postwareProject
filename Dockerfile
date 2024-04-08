FROM node:21-slim
COPY package.json ./
RUN npm install
EXPOSE 4000
CMD [ "node", "./bin/www" ]