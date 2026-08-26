FROM node:20-alpine

WORKDIR /app

COPY client/build ./client/build

COPY server/package*.json ./server/
COPY server/ ./server

RUN mkdir -p server/uploads && \
chmod -R 777 server/uploads

RUN cd server && npm install && npm ci --omit=dev

USER node
EXPOSE 5000

CMD ["node", "server/server.js"]
