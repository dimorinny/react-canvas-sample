FROM python:3.6-jessie

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT gunicorn -c gunicorn.conf.py circle.wsgi:application