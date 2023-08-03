#######################
# Development stage
#######################

FROM node:current-alpine3.18 as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

#######################
# Production builder stage
#######################

FROM development as build

RUN yarn build

#######################
# Production stage
#######################

FROM node:current-alpine3.18 as production

ENV NODE_ENV=production

RUN npm install --global dotenv

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile --production=true
RUN yarn cache clean

COPY --from=build /usr/src/app/dist ./dist
COPY ./src/infrastructure/secrets ./dist/src/infrastructure/secrets

EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]
