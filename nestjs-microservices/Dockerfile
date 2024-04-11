FROM node:18-alpine as builder

# Create app directory
ENV HOME=/nestjs-microservices/main-backend
WORKDIR ${HOME}

# Copy contents from the main-backend directory to /usr/src/app
COPY main-backend/package.json main-backend/yarn.lock ./

RUN yarn

COPY main-backend/ .

EXPOSE 3000

CMD ["yarn", "start"]