FROM node:18-alpine as builder

# Install the Nest CLI globally
RUN yarn global add @nestjs/cli

# Create app directory
ENV HOME=/usr/src/order-module

WORKDIR ${HOME}

COPY ./order-module/package.json ./order-module/yarn.lock ./

RUN yarn

COPY ./order-module .

EXPOSE 8888

CMD ["yarn", "start"]