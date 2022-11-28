FROM node:14

WORKDIR /usr/local/matapp/

COPY ./matapp-backend/package.json .

RUN npm install

COPY  ./matapp-backend/ .

CMD node index.js