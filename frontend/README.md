# Mamba Test - Frontend

This project is a web application for managing campaigns, created as part of a technical challenge. The user interface consumes a RESTful API to perform CRUD (Create, Read, Update, Delete) operations on campaigns.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for building server-side rendered applications.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Axios**: HTTP client for making requests to the API.
- **Material UI**: React component library for building modern web applications.

## Features

The frontend application allows the following operations:

- List all campaigns
- Create a new campaign
- Edit an existing campaign
- Delete a campaign
- View details of a campaign

## Interface Requirements

- **endDate** must always be greater than **startDate**.
- **startDate** must be equal to or later than the current date at the time of creation.
- If **endDate** is earlier than the current date, the campaign should be marked as "expired".

## Installation

To set up and run the application, follow these steps:

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd frontend
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

The application will be available at <http://localhost:3000>.

## Data Logic

This frontend project includes an interesting data handling logic:

- If there is a connection to the backend on port 3001, it will consume data from the backend.
- If there is no connection to the backend on port 3001, it will consume data from useContext and mock data.
  
This ensures that the frontend will always have data to display and test, regardless of the backend connection status.
