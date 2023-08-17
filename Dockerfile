#######################
# Development stage
#######################

FROM node:current-alpine3.18 as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .


FROM node:current-alpine3.18 as production

ENV NODE_ENV=production

RUN npm install --global dotenv

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY --from=development /usr/src/app/dist  ./dist

RUN yarn install --frozen-lockfile --production=true

RUN yarn cache clean


EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]
