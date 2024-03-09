# This repository shows how you can build API with microservice architecture using nestjs
## Features of this example
This example is basically an API for some task manager application.
## Running the example with docker-compose
Execute `docker network create infrastructure docker-compose up -d` from the root of the repository
## Accessing the API itself
- Once you launch the API it will be accessible on port 3000.
- Swagger docs for the API will be accessible locally via URI "**http://localhost:3000**"
## Launch services for integration testing
- Run `cd ./gateway && npm install && npm run test` from the root of this repo
## Brief architecture overview
This API showcase consists of the following parts:
- API gateway
