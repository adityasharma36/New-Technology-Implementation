# SessionAuth

A TypeScript and Express API project for building session-based authentication with MongoDB. The project is structured around users, sessions, validation, authentication middleware, rate limiting, and centralized error handling.

## Stack

- Node.js
- TypeScript
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens with `jsonwebtoken`
- Password hashing with `bcryptjs`
- Request validation with `zod`
- Rate limiting with `express-rate-limit`
- Environment variables with `dotenv`

## Prerequisites

- Node.js 20 or newer
- A running MongoDB instance or MongoDB Atlas database

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   PORT=3000
   MONGO_URL=mongodb://127.0.0.1:27017/sessionauth
   JWT_SECRET=replace-with-a-long-random-secret
   ```

3. Start the development process:

   ```bash
   npm run dev
   ```

The server uses port `3000` by default when `PORT` is not set.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Compile TypeScript in watch mode and restart the generated server with Nodemon |
| `npm test` | Placeholder test command; tests have not been configured yet |

To compile once without watch mode, run:

```bash
npx tsc
node dist/app.js
```

## Project Structure

```text
src/
├── app.ts                       # Express application entry point
├── config/
│   ├── mongo.config.ts           # MongoDB connection
│   └── server.config.ts          # Environment and server configuration
├── controllers/                  # Request handlers
├── db/models/                    # Mongoose models for users and sessions
├── middlewares/
│   ├── auth.middleware.ts        # Authentication middleware
│   ├── error.middleware.ts       # Centralized error handling
│   └── rateLimit.middleware.ts   # Rate limiting
├── respositorys/                 # Data access layer
├── routers/                      # Express routers
├── services/                     # Application services
├── types/express.d.ts            # Express type extensions
├── utils/errors/                 # Application error types
└── validators/                   # Zod request validation
```

## Current Status

The project foundation is in place, including configuration, database models, middleware, validation utilities, and authentication-related modules. User routes are not currently mounted in `src/app.ts`, and automated tests are not configured yet.

## Environment Variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `PORT` | No | `3000` | Port used by the Express server |
| `MONGO_URL` | Yes | Empty string | MongoDB connection string |
| `JWT_SECRET` | Yes for JWT features | Empty string | Secret used to sign and verify JWTs |

Do not commit `.env` or real secrets to source control.
