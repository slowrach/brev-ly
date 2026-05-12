FROM node:24-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --prod

CMD ["node", "dist/server.js"]