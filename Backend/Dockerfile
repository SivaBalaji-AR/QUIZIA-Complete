 FROM openjdk:17-jdk-slim 
 WORKDIR /app
 COPY target/first-0.0.1-SNAPSHOT.jar app.jar
 ENTRYPOINT ["Java","-Jar","app.jar"]