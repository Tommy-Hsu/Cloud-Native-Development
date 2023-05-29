FROM python:3.10.11-alpine

WORKDIR /server

COPY . .

ENV FLASK_APP=app.py FLASK_RUN_HOST=0.0.0.0

RUN pip3 install -r requirements.txt
RUN echo $ATLAS_URI

EXPOSE 5000

CMD ["flask", "run"]