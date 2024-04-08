FROM node:21-slim
WORKDIR /v1
COPY . .  
RUN npm install
COPY /v1/package.json ./  
EXPOSE 4000
CMD [ "node", "app.js" ]
