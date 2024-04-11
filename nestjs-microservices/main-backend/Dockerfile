FROM node:18-alpine as builder

# Create app directory
ENV HOME=usr/src/main-backend

WORKDIR ${HOME}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]