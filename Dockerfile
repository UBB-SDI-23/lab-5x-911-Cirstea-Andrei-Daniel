FROM ubuntu:latest

RUN apt update
RUN apt install python3 -y
RUN apt install pip -y
RUN pip install tensorflow==2.12.0

COPY dbscripts /

CMD ["python3", "./make_prediction.py", "Canada"]