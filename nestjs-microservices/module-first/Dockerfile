FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr/src/module-first

WORKDIR ${HOME}

COPY ./module-first/package.json ./module-first/yarn.lock ./

RUN yarn

COPY ./module-first .

EXPOSE 8875
EXPOSE 8876

CMD ["yarn", "start"]