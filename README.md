# To install dependencies:
```sh
bun install
```

# Deployed link
https://bitespeed-backend-dl9z.onrender.com

https://bitespeed-backend-dl9z.onrender.com/health-check to check if server is running.

# Secret variables
- Create .env file in the root directory.
- Add DATABASE_URL in the .env file.

# Database
- Neon postgres db is used as database.
- Go to https://neon.tech/ and create a new project.
- Create a new database.
- Get the connection string from the Neon dashboard.
- Add the connection string to the .env file.
- For sql queries use the query editor in the Neon dashboard and run the queries
present in drizzle/meta/0000_snapshot.json.
- If there is any schema change run the following command to get the sql queries to update neon db:
```sh
bun run drizzle-kit
```


# To run:
```sh
bun run dev
```

open http://localhost:3000
