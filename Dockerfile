FROM node:14 AS frontend-build

# Build frontend

COPY ./matapp-frontend/ /usr/local/matapp/frontend/
WORKDIR /usr/local/matapp/frontend/
ENV NODE_ENV=production
RUN npm ci
RUN npm build

FROM node:14

COPY ./matapp-backend/package.json /usr/local/matapp/
WORKDIR /usr/local/matapp/
RUN npm install
ENV NODE_ENV=production
COPY ./matapp-backend/ .
COPY --from=frontend-build /usr/local/matapp/frontend/build /usr/local/matapp/build



CMD node index.js