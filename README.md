## Installation and Running the Nest.js app with Docker

```bash
$ sudo docker-compose up --build
```
## Installation without Docker

```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Settings
- Insert JWT secret key on src/constants.ts

## OpenAPI Swagger Documentation
- GET request to root/api -> ex http://localhost:3000/api

## Info

DockerFile also run a seeder that seeds MongoDB Database with mockup data (src/seed/seed.ts), in order to test the app.
To log in to ACME Corporation from mockup data, as admin use these credentials : user:easypol@easypol.it pw:passeasy
To log in to Technology ARC from mockup data, as admin use these credentials : user:easypoltech@easypol.it pw:passpol
