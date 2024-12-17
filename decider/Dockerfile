# Use the OpenJDK 21 base image from Eclipse Temurin
FROM eclipse-temurin:21 AS base

# Install Python3, pip, and necessary dependencies using apt
RUN apt-get update && apt-get install -y python3 python3-pip python3-numpy && apt-get clean && \
    ln -s /usr/bin/python3 /usr/bin/python

# Copy the Spring Boot JAR file
COPY build/libs/*.jar app.jar

# Copy Python scripts from resources to a known location in the container
COPY src/main/resources/*.py /app/scripts/

# Expose the application port
EXPOSE 8089

# Run the Spring Boot JAR file
CMD ["java", "-jar", "app.jar"]
