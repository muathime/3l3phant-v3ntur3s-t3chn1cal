# 🐘 Wanted App - Frontend

This is the React + Vite frontend for the "Wanted List" app. It connects to an Express.js backend for authentication and fetching data from the FBI Wanted API.

---

## Features

- Login with email and password (returns a JWT)
- Protected routes (persisted via localStorage)
- Fetches FBI wanted list using a secure backend proxy
- Toast notifications for feedback
- Built with Vite, React, TypeScript, Tailwind

---

## Run Locally

```
cd frontend
npm install
npm run dev
```

## Note: Make sure `.env` is set up

`VITE_API_URL=http://localhost:3000` //this is local backend

## Running Tests

`npm run test` //Uses Vitest and React Testing Library

## Auth Demo Credentials

```
Email: antony@gmail.com
Password: 1234567
```
