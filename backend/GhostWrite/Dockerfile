FROM gcr.io/distroless/java17

WORKDIR /app

# Make sure yiu have the .jar file for the application in the target folder
COPY /target/*.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]