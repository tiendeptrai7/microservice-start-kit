FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr/src/module-first

WORKDIR ${HOME}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

EXPOSE 8877

CMD ["yarn", "start"]