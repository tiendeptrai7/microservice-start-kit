FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr/src/user-module

WORKDIR ${HOME}

COPY ./user-module/package.json ./user-module/yarn.lock ./
COPY ./user-module/ormconfig.js ./
COPY ./user-module .

RUN yarn

RUN yarn run build

EXPOSE 8875
EXPOSE 8876

CMD ["yarn", "start"]