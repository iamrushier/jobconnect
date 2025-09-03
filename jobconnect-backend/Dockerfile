# Stage 1: Build the JAR
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src ./src

# Make Gradle wrapper executable
RUN chmod +x ./gradlew

# Build the JAR
RUN ./gradlew clean build -x test

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/build/libs/*.jar /app/job-connect-backend.jar

# Run the JAR
ENTRYPOINT ["java", "-jar", "/app/job-connect-backend.jar"]
