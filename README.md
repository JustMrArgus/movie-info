# Movies

## Launch

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
