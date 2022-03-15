# Happiness Journal Web App with Express Server and MongoDB

Capstone project for the final semester of IT Web Programming. A web app for students to enter in reflections throughout the week to keep track of exercise, meditation, gratitude, random act of kindness and a journal. On submission they enter in a final overall reflection that will be visible to the teacher. Students are in control of making their own accounts and the teacher uses an admin account to access all final reflections with the ability to delete students from the database.

This project folder contains the React client side and the Express Server side with MongoDB

## Available Scripts

In the project directory, you can run:

### `docker compose build`

To build the docker container images

### `docker compose up`

Spins up the container that runs the local server (React web app)
Spins up the container that runs the Express server (running on Node.js)
Spins up the container that runs the MongoDB server

### `docker compose -f docker-compose-prod.yml build`
Builds docker container images for production build

### `docker compose -f docker-compose-prod.yml up`

Spins up the container that runs the Express server (running on Node.js) that handles the API requests as well as serves the client side's index.html
Spins up the container that runs the MongoDB server
