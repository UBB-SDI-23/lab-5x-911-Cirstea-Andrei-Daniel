FROM ubuntu:latest

RUN apt update
RUN apt install python3 -y

COPY dbscripts /

CMD ["python3", "./make_prediction.py", "Canada"]