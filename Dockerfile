FROM ubuntu:latest

RUN apt update
RUN apt install python3 -y

WORKDIR /usr/app/src

COPY dbscripts /dbscripts

CMD ["python3", "dbscripts/make_prediction.py", "Canada"]