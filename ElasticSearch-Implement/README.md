# Elasticsearch Implement

A small TypeScript and Express REST API for creating, reading, searching, and updating complaint documents stored in Elasticsearch.

## Features

- Connects to Elasticsearch using the official `@elastic/elasticsearch` client.
- Creates the complaint index automatically when the server starts.
- Indexes complaint documents with a caller-provided document ID.
- Retrieves a complaint by ID.
- Searches complaints by matching text against the `heading` field.
- Updates a complaint's `description` by ID.

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Elasticsearch 9 client
- `tsx` for running TypeScript in watch mode
- `dotenv` for environment configuration

## Prerequisites

- Node.js and npm
- A running Elasticsearch instance
- Elasticsearch credentials with permission to create, read, search, and update documents in the complaint index

## Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
ELASTICSEARCH_NODE=https://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your-elasticsearch-password
```

Do not commit `.env` or real credentials. The file is ignored by Git.

## Running the Server

Start the development server with watch mode:

```bash
npm start
```

The API is available at:

```text
http://localhost:3000/api/v1
```

On startup, the application attempts to connect to Elasticsearch and creates the complaint index if it does not already exist.

## API Reference

All request and response bodies use JSON.

### Complaint document shape

```json
{
  "heading": "Delayed order delivery",
  "description": "The order has not arrived after the expected delivery date."
}
```

The Elasticsearch index used by the application is currently named `comaplain`.

### Create or index a complaint

```http
POST /api/v1/complain
Content-Type: application/json
```

Request body:

```json
{
  "id": "complaint-001",
  "docs": {
    "heading": "Delayed order delivery",
    "description": "The order has not arrived after the expected delivery date."
  }
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/v1/complain \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "complaint-001",
    "docs": {
      "heading": "Delayed order delivery",
      "description": "The order has not arrived after the expected delivery date."
    }
  }'
```

Returns `201 Created` when Elasticsearch accepts the document.

### Get a complaint by ID

```http
GET /api/v1/complain
Content-Type: application/json
```

The current implementation reads the ID from the request body:

```json
{
  "id": "complaint-001"
}
```

Example:

```bash
curl -X GET http://localhost:3000/api/v1/complain \\
  -H "Content-Type: application/json" \\
  -d '{"id":"complaint-001"}'
```

Returns `200 OK` when the document is found, or `404 Not Found` when Elasticsearch cannot retrieve it.

### Search complaints by heading

```http
POST /api/v1/complains?heading=delivery
```

The search uses an Elasticsearch `match` query against `heading`.

Example:

```bash
curl -X POST "http://localhost:3000/api/v1/complains?heading=delivery"
```

The `heading` query parameter is required. A missing or blank value returns `400 Bad Request`.

### Update a complaint description

```http
POST /api/v1/complain/update
Content-Type: application/json
```

Request body:

```json
{
  "id": "complaint-001",
  "description": "The order arrived two days late."
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/v1/complain/update \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "complaint-001",
    "description": "The order arrived two days late."
  }'
```

Returns `200 OK` when the description is updated. The `description` field is required and must be a string.

## Response Format

Successful responses follow this general structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Errors follow this general structure:

```json
{
  "success": false,
  "message": "Operation failed"
}
```

## Project Structure

```text
src/
├── index.ts                         # Express application entry point
├── configs/
│   ├── elastic.config.ts            # Elasticsearch client and startup connection
│   └── server.config.ts             # Environment variable configuration
├── controllers/
│   └── eSearch.controller.ts        # HTTP request and response handling
├── db/
├── dtos/
│   └── document.dtos.ts              # Complaint document types
├── middlewares/
├── repository/
│   └── eSearch.respository.ts        # Elasticsearch operations
├── routes/
│   └── eSearch.route.ts              # Complaint routes
├── services/
│   └── eSearch.service.ts            # Service layer
├── utils/
│   └── helpers/
│       └── index.helper.ts            # Elasticsearch index name
└── validators/
```

The request flow is:

```text
HTTP request -> route -> controller -> service -> repository -> Elasticsearch
```

## Configuration Notes

- `PORT` defaults to `3000` when omitted.
- `ELASTICSEARCH_NODE`, `ELASTICSEARCH_USERNAME`, and `ELASTICSEARCH_PASSWORD` default to empty strings when omitted, but valid values are required for a successful Elasticsearch connection.
- The Elasticsearch client currently sets `tls.rejectUnauthorized` to `false`. This allows local/self-signed HTTPS certificates, but certificate verification should be enabled and configured properly for production.
- An `ELASTIC_CA_CERT` variable may exist in local environments, but it is not currently consumed by the application.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Runs `src/index.ts` with `tsx` watch mode |
| `npm test` | Placeholder script; no automated tests are currently configured |

## Development Notes

- The API enables Express JSON parsing with `express.json()`.
- The complaint index is created during server startup after the Elasticsearch ping succeeds.
- Indexing uses the supplied ID, so indexing an existing ID will replace the document associated with that ID.
- Search is currently exposed as `POST /complains` even though it only reads a query parameter.
