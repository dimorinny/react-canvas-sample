### Usage

1. Put `.env` file to root directory (near docker-compose.yaml):

```
SECRET_KEY=<some-secret-key>
HOST=<allowed-host-for-django> || *
ENDPOINT=<api-endpoint-for-frontend-part> || http://localhost/
```

2. Build and start frontend, backand and balancer part using docker compose:

```
docker-compose up -d --build
```
