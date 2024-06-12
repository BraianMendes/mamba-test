# Campaign Manager Project

This project is a Campaign Manager application, consisting of a backend API and a frontend interface. The backend is built with Node.js and the frontend with React, Next.js, and TypeScript.

## Table of Contents

- [Campaign Manager Project](#campaign-manager-project)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
  - [Testing](#testing)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Thank You](#thank-you)

## Prerequisites

- Node.js
- Docker
- Docker Compose

## Backend Setup

1. **Navigate to the backend directory**:

    ```bash
    cd backend
    ```

2. **Build and start the Docker containers**:

    ```bash
    docker-compose up --build
    npm run start:dev
    ```

    This will start the backend server on port `3001` and set up the database.

3. **API Documentation**:
    The API routes and their documentation can be accessed at `http://localhost:3001/api`.

## Frontend Setup

1. **Navigate to the frontend directory**:

    ```bash
    cd frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev
    ```

    The frontend application will be available at `http://localhost:3000`.

## Usage

The frontend application will attempt to connect to the backend API at `http://localhost:3001`. If the backend is not available, the frontend will use mocked data through the `useContext` API.

- **List Campaigns**: Displays all campaigns.
- **Create Campaign**: Form to create a new campaign.
- **Edit Campaign**: Edit an existing campaign.
- **Delete Campaign**: Soft delete a campaign.
- **View Campaign Details**: Detailed view of a single campaign.

## Testing

### Backend

1. **Navigate to the backend directory**:

    ```bash
    cd backend
    ```

2. **Run tests**:

    ```bash
    npm test
    ```

### Frontend

1. **Navigate to the frontend directory**:

    ```bash
    cd frontend
    ```

2. **Run tests**:

    ```bash
    npm test
    ```

## Thank You

Thank you for taking the time to review and work with this project. Your efforts and feedback are greatly appreciated. If you have any questions, need further clarification, or would like to collaborate further, please don't hesitate to reach out.

Together, we can create amazing things! 🚀

Best regards,
Braian
