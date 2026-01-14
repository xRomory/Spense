## Local Development Setup

### 1. Configure Environment Variables

Create a `.env` file in the project root (you can copy from `.env.example`):
- Everything is setup for you, check `.env.example`

```bash
cp .env.example .env
```

Edit `.env` and set your desired values. For example:

```
DATABASE_URL=postgres://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5433/<POSTGRES_DB>
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database
```

> **Note:** Never commit your `.env` file to version control.

---

### 2. Start PostgreSQL with Docker Compose

Run the following command to start the database service:

```bash
docker-compose up -d
```

This will start a PostgreSQL instance on port `5433` using the credentials from your `.env` file.

---

### 3. Apply Database Migrations

After the database is running, apply your Drizzle migrations:

```bash
npx drizzle-kit migrate
```

---

### 4. Test Your Database

Run test to check whether you have setup every thing correctly:

```bash
npm run test
```

---

### 5. Run the Application

Start your development server:

```bash
npm run dev
```

---

### 6. Stopping the Database

To stop the database container:

```bash
docker-compose down
```
---