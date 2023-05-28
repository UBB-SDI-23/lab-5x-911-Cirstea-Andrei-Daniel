FROM ubuntu:latest

RUN apt update
RUN apt install python3 -y

WORKDIR /usr/app/src

COPY dbscripts /

CMD ["python3", "./make_prediction.py", "Canada"]