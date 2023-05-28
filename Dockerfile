FROM openjdk:18-jdk-alpine3.14

# Install Python and necessary packages
RUN apk add --no-cache python3 py3-pip

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

# Copy the Python scripts and requirements file
COPY dbscripts/requirements.txt /

COPY dbscripts /dbscripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

CMD /wait

CMD ["java", "-jar", "application.jar"]

EXPOSE 8080