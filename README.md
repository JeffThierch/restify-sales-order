# How Start The Project

1. Install the project dependencies, run the above command in your terminal in the root of the project:

```bash
npm i && cd client && npm i && cd .. && cd server && npm i && cd ..
```

2. Setting the envoriment variables, run the above command in the root project:

```bash
cp .env.example ./.env && cp .env.example ./server/.env && cp .env.example ./client/.env
```

3. Start docker compose dev container to start a MySQL instance, in the root of the project execute:

```bash
npm run dev:up
```

4. Setup the database schema **(if you see acess denied error, await the container finish the startup and try again)**:

```bash
docker exec -i restify-sales-order-dev-database mysql -uroot -proot sales_order < db_schema.sql
```
