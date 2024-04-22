FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr/src/user-module

WORKDIR ${HOME}

COPY ./user-module/package.json ./user-module/yarn.lock ./

RUN yarn

COPY ./user-module .

EXPOSE 8875
EXPOSE 8876

CMD ["yarn", "start"]