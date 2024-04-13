FROM node:18-alpine as builder

# Create app directory
ENV HOME=/usr1/main-backend

WORKDIR ${HOME}

COPY ./main-backend/package.json ./main-backend/yarn.lock ./

RUN yarn

COPY ./main-backend .

EXPOSE 3000

CMD ["yarn", "start"]