# Project Management Ticketing System

This is a Project Management Ticketing System built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to create tickets, view their own tickets, and for admins to manage all tickets by changing their statuses.

## Features
- **Users** can:
  - Create a ticket.
  - View their own tickets.
  
- **Admins** can:
  - View all tickets.
  - Change the status of tickets (Open, In Progress, Closed).

- **JWT Authentication & Role-Based Authorization**:
  - Authentication is handled using JWT tokens.
  - Role-based access control is implemented using Firebase, ensuring the correct pages and actions are available to the right users (Admin or Client).

## Tech Stack
- **Frontend**: React (Class Components)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Role-Based Authorization**: Firebase
- **Styling**: Tailwind CSS

## Setup

### 1. Add Roles to Database
Before starting the project, add roles to the database. You can do this using tools like **Postman** or **Thunder Client**.

- **Endpoint**: `POST http://localhost:3000/api/roles/create`
  
Make sure to add the necessary roles (e.g., Admin, Client) to your database.

### 2. Frontend Setup

Navigate to the `ticket_system_frontend` directory and install the dependencies:

```bash
cd ticket_system_frontend
npm install
﻿# Ticketing-System
