FROM python:3.10.1-alpine

ENV PATH="/scripts:${PATH}"

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers
RUN pip install -r /requirements.txt
RUN apk del .tmp

RUN mkdir /backend
COPY ./backend /backend
WORKDIR / backend
COPY ./scripts /scripts
RUN chmod +x /scripts/*

RUN adduser -D user
RUN 
