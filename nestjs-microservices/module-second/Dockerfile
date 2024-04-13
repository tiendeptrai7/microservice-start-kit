FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr/module-second

WORKDIR ${HOME}

COPY ./module-second/package.json ./module-second/yarn.lock ./

RUN yarn

COPY ./module-second .

EXPOSE 8877
EXPOSE 8878

CMD ["yarn", "start"]