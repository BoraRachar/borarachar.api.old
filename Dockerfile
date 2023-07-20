FROM node:18.4-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-slim as production

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
