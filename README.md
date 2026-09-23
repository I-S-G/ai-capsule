# AI Capsule

AI Capsule is a private AI prompt library for authenticated users to create, view, update, and delete AI prompts.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Node.js + Express
- Prisma ORM
- PostgreSQL (Neon)
- GitHub OAuth
- JWT authentication

## Deployment

**Platform:** Render  
**Database:** Neon PostgreSQL  
**Public URL:** https://ai-capsule-62hs.onrender.com/

The React frontend and Express API are deployed through the same Render Web Service.

## Setup

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev

```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

1. Create a .env file inside both frontend and backend folders.
2. Copy the contents of .env.example file to their corressponding .env files inside both frontend and backend folders.
3. Inside frontend/ .env, put the value of VITE_API_URL to your backend url (eg: http://localhost:3001)
4. Inside backend/ .env, set the values for your github client, backend port, github secret, jwt secret, frontend url, backend url, node_env (production/development). You can generate a jwt secret with the commmand:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Backend .env file should consist of:

| Variable               | Purpose                               |
| ---------------------- | ------------------------------------- |
| `DATABASE_URL`         | Neon PostgreSQL connection            |
| `GITHUB_CLIENT_ID`     | GitHub OAuth client ID                |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret            |
| `JWT_SECRET`           | Secret used to sign and verify JWTs   |
| `FRONTEND_URL`         | Frontend application URL              |
| `BACKEND_URL`          | Backend application URL               |
| `NODE_ENV`             | Development or production environment |

Frontend .env file should consist of:

| Variable       | Purpose         |
| -------------- | --------------- |
| `VITE_API_URL` | Express API URL |



### Database

This application uses PostgreSQL hosted by Neon.

1. Create a new project with PostgreSQL database in Neon
2. Copy the database connection string
3. Add it to backend/ .env as DATABASE_URL.
4. Run prisma migrations:

```bash
npx prisma migrate dev
```

| Method | Route                       | Authentication |
| ------ | --------------------------- | -------------- |
| GET    | `/api/health`               | Public         |
| GET    | `/api/capsules`             | JWT            |
| POST   | `/api/capsules`             | JWT            |
| PUT    | `/api/capsules/:id`         | JWT            |
| DELETE | `/api/capsules/:id`         | JWT            |
| GET    | `/api/auth/github`          | Public         |
| GET    | `/api/auth/github/callback` | Public         |
| POST   | `/api/auth/logout`          | JWT            |
