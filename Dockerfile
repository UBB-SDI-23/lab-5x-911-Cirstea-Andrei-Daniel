FROM openjdk:18-jdk-alpine3.14

# Install Python and necessary packages
RUN apk add --no-cache python3 py3-pip
RUN pip3 install --no-cache-dir tensorflow==2.12.0

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

COPY dbscripts /dbscripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

CMD /wait

CMD ["java", "-jar", "application.jar"]

EXPOSE 8080