# 🐘 Wanted App - Backend

This is the Express.js backend for the "Wanted List" app. It handles authentication and acts as a proxy to the FBI's public wanted API.

## Features

- `/auth` endpoint (returns JWT)
- `/wanted` endpoint fetches FBI wanted list (with middleware auth check)
- Simple JWT middleware
- Built-in logger for requests

## Tech Stack

- Express.js
- JWT (jsonwebtoken)
- Axios
- CORS

## Run Locally

```bash
cd backend
npm install
npm run dev //runs with nodemon for hot reload for dev
```

## Note Make sure `.env` is set up

```
JWT_SECRET=3l3ph@ntv3ntur3s
APIURL=https://api.fbi.gov/wanted
PORT=3000
```

## Running Tests

`npm run test` //uses jest

## Auth Demo Credentials (supply from frontend or test via an api client e.g. Postman)

```
Email: antony@gmail.com
Password: 1234567
```
