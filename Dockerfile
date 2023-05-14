FROM openjdk:18-jdk-alpine3.14

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

COPY init-db.sql /docker-entrypoint-initdb.d/
COPY dbscripts /scripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

CMD /wait

CMD ["java", "-jar", "application.jar"]

EXPOSE 8080