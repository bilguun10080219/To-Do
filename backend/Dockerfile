# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose Render's dynamic port
EXPOSE 8080

# Run the Spring Boot JAR file
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
