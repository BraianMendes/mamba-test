# Mamba Test - Backend

## Introduction

This project was developed using the Nest.js framework to manage campaigns through a RESTful API. We chose Nest.js due to its modular architecture, which facilitates project maintenance and scalability. The module-oriented approach allows for better code organization, where each module encapsulates a specific functionality of the system, promoting the separation of concerns and enabling different teams to work independently on distinct parts of the project.

## Technologies Used

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker**
- **Jest** (for testing)
- **Swagger** (for API documentation)

## Module-Oriented Organization

The module-oriented approach in Nest.js facilitates scalability and project maintenance. Each module encapsulates a set of related functionalities, including controllers, services, and entities. This allows developers to add new features or make changes without impacting other parts of the system, promoting better code management and facilitating team collaboration.

## Setup and Running the Application

### Prerequisites

- Docker
- Node.js (>=16.x)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/mamba-test-backend.git
cd mamba-test-backend
```

### Step 2: Configure Environment Variables

Create a .env file in the root directory with the following content:

```bash
DB_HOST=localhost
DB_PORT=5500
DB_USERNAME=test
DB_PASSWORD=test
DB_DATABASE=test
```

### Step 3: Start the Docker Image

Run Docker Compose to start the PostgreSQL container:

```bash
docker-compose up -d
```

### Step 4: Install Dependencies

Install the project dependencies:

```bash
npm install
```

### Step 5: Build the Application

Build the Nest.js application:

```bash
npm run build
```

### Step 6: Start the Application

Start the Nest.js application:

```bash
npm run start:dev
```

## Accessing Swagger

The interactive API documentation is available through Swagger. Follow the steps below to access and test the API.

### Step 1: Access Swagger

Open your browser and go to:

```bash
http://localhost:3001/api
```

### Step 2: Create a New Campaign

In the Swagger UI, find the POST /campanhas section.
Click on "Try it out".
Fill in the fields with the new campaign data. Example:

```json
{
  "nome": "Test Campaign",
  "dataInicio": "2024-01-01T00:00:00Z",
  "dataFim": "2024-01-31T23:59:59Z",
  "status": "ATIVA",
  "categoria": "Marketing"
}
```

Click on "Execute".

### Step 3: List Campaigns

In the Swagger UI, find the GET /campanhas section.
Click on "Try it out".
Click on "Execute" to list all campaigns.

## Running Tests

### Unit Tests

To run unit tests, use the following command:

```bash
npm run test
```

### Integration Tests

To run integration tests, use the following command:

```bash
npm run test:e2e
```
