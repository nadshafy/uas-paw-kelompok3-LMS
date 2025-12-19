FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -e .
CMD ["pserve", "development.ini", "--reload"]