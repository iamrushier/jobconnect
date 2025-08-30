# Use Java 17 runtime
FROM eclipse-temurin:17

# Metadata (optional)
LABEL maintainer="iamrushier.github.io"

# Set working directory
WORKDIR /app

# Copy your JAR into the container
COPY build/libs/*.jar /app/job-connect-backend.jar

# Run the JAR
ENTRYPOINT ["java", "-jar", "/app/job-connect-backend.jar"]
