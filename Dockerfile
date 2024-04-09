FROM node:21-slim
WORKDIR /app
COPY package.json ./

ENV PORT = 4000

ENV LOG_LEVEL = "debug"

ENV MONGODB_CONNECTION_STRING = "mongodb+srv://ahmetselimboz46:Aa...2003@selim.f75ymah.mongodb.net/posttwareV2DB?retryWrites=true&w=majority"

ENV TOKEN_EXPIRE_TIME = 1200

ENV JWT_SECRET = W/H73+IV^&18!$=-XQW5

ENV DEFAULT_LANG = TR

ENV SESSION_SECRET = WGI/xj/50GEQ%F&+,.

ENV MAIL_HOST=smtp-relay.brevo.com

ENV MAIL_USER=ahmetselimboz26@gmail.com

ENV MAIL_PASS=C2OHqYbNUMRgIQJX

ENV REDIS_HOST=redis://redis:6379

RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]