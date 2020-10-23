FROM node:12.16.1 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:12.16.1 AS server-build

COPY --from=ui-build /usr/src/app/client/build ./client/build

COPY package*.json ./server/
COPY server/ ./server/
RUN cd server && npm install
COPY index.js ./server/

EXPOSE 8080

CMD ["node", "./server/index.js"]
