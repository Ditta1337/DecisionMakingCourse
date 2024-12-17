# Running the Decydent App with Docker

This guide will walk you through the process of running the frontend and backend of the Decydent web application using Docker.
Source code is available at [GitHub](https://github.com/Ditta1337/DecisionMakingCourse).

## Methodology
The AHP algorithm involves hierarchical modeling of a decision-making problem and conducting pairwise comparisons of elements using Saaty's scale. Priority vectors and the Consistency Ratio Index (CRI) are then calculated to assess the consistency of the decision-maker's evaluations. Subsequently, the consistency index is computed to determine whether the pairwise comparison matrix is sufficiently consistent. If its value exceeds an acceptable level, verification and correction of the decision-maker's judgments are necessary. However, if the value falls within the acceptable range, the results can be considered satisfactory. 

## Prerequisites

Make sure you have the following installed on your machine:

- Docker: Install Docker
- Docker Compose: Install Docker Compose

## Step-by-Step Instructions

1. **Prepare the Project Files**
   Ensure the following files are in a folder on your machine:
    - `backend-image.tar`
    - `frontend-image.tar`
    - `docker-compose.yml`

2. **Load the Docker Images**
   Before running the application, you need to load the Docker images from the tar files.

   ```bash
   # Load the backend image
   docker load -i backend-image.tar

   # Load the frontend image
   docker load -i frontend-image.tar
    ```

This will load both the backend and frontend images into your Docker environment.

### 3. Set Up Docker Compose

The `docker-compose.yml` file is used to configure and start the containers. If you don't have the file, create one with the following contents:

```yaml
version: '3.9'

services:
  backend:
    image: decisionmakingcourse-backend:latest
    ports:
      - "8089:8089"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on:
      - frontend
    networks:
      - mynetwork

  frontend:
    image: decisionmakingcourse-frontend:latest
    ports:
      - "3000:80"
    networks:
      - mynetwork

networks:
  mynetwork:
    driver: bridge
```

### 4. Start the Application

With the Docker images loaded and `docker-compose.yml` in place, you can now start the application with Docker Compose.

```bash
# Start the services in detached mode (background)
docker-compose up -d
```

This command will:

- Start both the frontend and backend containers.
- Expose the frontend on port 3000 and the backend on port 8089.

### 5. Check the Status of the Containers

To verify that the containers are running correctly, use the following command:

```bash
# Check the status of the containers
docker-compose ps
```

### 6. Access the Application

- **Frontend**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- **Backend**: The backend will be accessible at [http://localhost:8089](http://localhost:8089).

### 7. View Logs

If you want to check the logs of the running services, use the following command:

```bash
# View logs for all services
docker-compose logs -f
```

### 8. Stop the Application

To stop the running application and remove the containers, use the following command:

```bash
# Stop and remove the containers
docker-compose down
```

## Authors
- Maciej Malinowkski
- Szymon Wojturski
- Artur Dwornik

