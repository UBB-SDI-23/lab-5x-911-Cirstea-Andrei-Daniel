FROM python:3.9-slim as builder

# Install necessary packages
RUN apt-get update && apt-get install -y python3.9

# Set the Python executable and symlink
RUN ln -s /usr/bin/python3.9 /usr/local/bin/python

# Install Python packages
RUN pip install tensorflow==2.12.0

FROM openjdk:18-jdk-alpine3.14

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

COPY dbscripts /dbscripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

# Copy Python installation from the builder stage
COPY --from=builder /usr/local /usr/local

CMD /wait

CMD ["java", "-jar", "application.jar"]

EXPOSE 8080