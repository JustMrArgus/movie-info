# Movies

**Deployed version: [LINK](https://movie-info-2.onrender.com/)**

## Launch (Local manual)

### 1. Clone the repository
```bash
git clone REPO_URL
```
### 2. Configure env file for the API
```env
APP_PORT=8000
JWT_SECRET=aldjadjaldaj
JWT_EXPIRES_IN=7d
```

**APP_PORT HAS TO be 8000**
### 3. Run the API
```bash
cd backend
npm run dev
```
### 4. Run the client
```bash
cd frontend
npm run dev
```

## Launch (Docker version)

To run the project, follow these steps:

### 1. Install Docker

Download and install Docker from the [official website](https://www.docker.com/)

### 2. Pull the Docker image

Pull the latest Docker image of the app from Docker Hub:

```bash
docker pull justmrargus/movies:latest
```

### 3. Run the Docker container

Start the container with the following command:

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 justmrargus/movies
```

You can access the app at http://localhost:8000/

## Architecture

### Root folder

- **backend** – contains the API of the app
- **frontend** – contains the frontend part of the app
- **test-data** – contains `sample_movies.txt`, which can be used for testing the app’s import functionality
- **Dockerfile** – used to build the Docker image
- **.dockerignore** – specifies files that should be ignored when creating the Docker image

### Backend folder

- **controllers/** – contains the controllers
- **middleware/protect.js** – middleware that protects routes from unauthorized users
- **middleware/txtMovieDataHandler.js** – middleware that transforms a `.txt` file into an array of JavaScript objects
- **models/index.js** – contains Sequelize setup and models
- **routes/** – contains the routes
- **utils/apiFeatures.js** – contains logic to handle query parameters
- **utils/signToken.js** – creates a JWT token
- **app.js** – defines the Express app logic
- **server.js** – contains the server creation logic

### Frontend folder

- **public/img** – contains image templates for movie cards
- **src/components** – contains React components
- **src/pages** – contains pages built from React components for React Router
- **src/App.js** – main app file, contains React Router logic
