# Use official OpenJDK runtime
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the entire backend project into the image
COPY . .

# Build the application using Maven (Render’s Java image already includes Maven)
RUN apt-get update && apt-get install -y maven && mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
