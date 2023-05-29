#FROM ubuntu:latest as builder


FROM openjdk:18-jdk-alpine3.14

RUN apt-get update && apt-get install -y python3

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} application.jar

COPY dbscripts /dbscripts

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait



# Copy Python installation from the builder stage
#COPY --from=builder /usr/local /usr/local

RUN apt update
RUN apt install python3 -y
RUN apt install pip -y
RUN pip install tensorflow==2.12.0
RUN pip install scikit-learn

CMD /wait

#CMD ["java", "-jar", "application.jar"]
CMD ["python3", "/dbscripts/make_prediction.py", "Canada"]

EXPOSE 8080