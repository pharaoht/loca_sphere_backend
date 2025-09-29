#!/bin/bash

# Container name
CONTAINER_NAME="redistest"

# Check if Docker daemon is running
if (! docker stats --no-stream ); then
  echo "Docker daemon is not running. Starting Docker..."
  sudo systemctl start docker
else
  echo "Docker daemon is already running."
fi

# Check if the container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME is already running. Using existing container."
else
    # Check if the container exists but is not running
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        echo "Starting existing container $CONTAINER_NAME..."
        docker start $CONTAINER_NAME
    else
        # Build the Docker image
        echo "Building the Docker image..."
        docker build -t your-app-image .

        # Run the Docker container
        echo "Running a new Docker container..."
        docker run -d -p 3000:3000 --name $CONTAINER_NAME your-app-image
    fi
fi
