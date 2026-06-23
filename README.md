# Product Browser API

## Overview

This project is a backend system for browsing approximately 200,000 products with fast pagination and category filtering.

The system is built using:

* Node.js
* Express.js
* PostgreSQL (Supabase)
* React (optional frontend)

## Features

* Browse products sorted by newest first
* Category filtering
* Cursor-based pagination
* Handles large datasets efficiently
* Batch product seeding
* 200,000 generated products

## Why Cursor Pagination?

Offset pagination can become slow on large datasets and may return duplicate or missing records when new products are inserted while users are browsing.

Cursor pagination uses `(created_at, id)` as the cursor and provides:

* Better performance
* Consistent results
* No duplicate records
* No skipped records

## Database Design

Products table:

* id
* name
* category
* price
* created_at
* updated_at

Indexes:

* (created_at DESC, id DESC)
* category

## API Endpoints

### Get Products

GET /products

Query Parameters:

* limit
* category
* cursorCreatedAt
* cursorId

Example:

GET /products?limit=20

GET /products?category=Electronics

GET /products?cursorCreatedAt=2026-06-23T09:33:12.557Z&cursorId=134259

## Product Generation

Products are generated using a seed script and inserted in batches for better performance.

## Improvements With More Time

* Full-text search
* Price range filtering
* Caching
* Automated tests
* Docker deployment


## AI Usage

AI was used as a development assistant throughout the project.

Specifically, AI helped with:

* Understanding cursor-based pagination concepts.
* Generating the initial product seeding script for large-scale data generation.
* Reviewing PostgreSQL queries and indexing strategies.
* Debugging connection, environment variable, and database issues.
* Discussing tradeoffs between offset and cursor pagination.
