FROM ubuntu:latest

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

COPY dbscripts /dbscripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

RUN apt update
RUN apt install python3 -y
RUN apt install pip -y
RUN pip install tensorflow==2.12.0
RUN pip install scikit-learn

# Install OpenJDK
RUN apt install -y openjdk-17-jdk

CMD /wait

CMD ["java", "-jar", "application.jar"]

EXPOSE 8080