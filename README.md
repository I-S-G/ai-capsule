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

## API Routes

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

## Authentication
This application uses Github OAuth provider for authentication. The authentication flow is as follows:
1. User clicks on login with github button
2. Express starts GitHub OAuth
3. GitHub redirects to the express callback
4. Express creates an application JWT
5. JWT is stored in a secure, HttpOnly cookie called token
6. Protected API routes verify the JWT
7. The authenticated user's ID is used for capsule ownership

## Database & Ownership

PostgreSQL database is hosted on Neon and accessed through Prisma ORM. The data is stored persistently in Neon, so restarting/redeploying will not delete the data.

The ownership of each capsule is determined by the userId of the authenticated user. When a capsule is created, it also stores the userId of the authenticated user which is used to check if the authenticated user owns the capsule or not.

## cURL Checks

Two cURL checks were done against the deployed GET /api/capsules endpoint

```bash
curl -i https://ai-capsule-62hs.onrender.com/api/capsules
```
Result:
HTTP/1.1 401 Unauthorized
{"error":"Authentication required"}

```bash
curl -i -H "Cookie: token=fake-token-123" https://ai-capsule-62hs.onrender.com/api/capsules
```

Result:
HTTP/1.1 401 Unauthorized
{"error":"Invalid or expired token"}

## Limitation

Users can't directly upload screenshots. They can only store image url of an image already uploaded in the internet.

## AI-Assisted Development

ChatgGPT was used to assist in the development of this web application.

One problem encountered and corrected in AI-generated code was importation and use of deprecated methods & types. The deprecated types and methods were researched on the documentations and replaced with newer alternative.

### Verification of OAuth and JWT

Github OAuth was tested by:
1. Confirming unauthenticated requests returned HTTP 401.
2. Logging in using github authentication
3. Confirming the dashboard was accessible
4. Confirming that protected capsule requests worked 

The application JWT is stored in an HttpOnly cookie rather than browser local storage. The JWT was not displayed or exposed in the application interface.
It was tested by opening devtools console and running document.cookie. The result was an empty string.

### Protected API Behaviour Verification

Protected API behaviour was verified by testing the /api/capsules endpoint without valid authentication first then with a fake JWT.

### CRUD Behaviour & User Data Ownership Verification
CRUD behaviour was verified by creating, deleting and updating capsules manually in the app. Data Ownership was checked by logging in with multiple github accounts in different browsers and seeing if one user can get information on other user's capsule.

### One Implementation Decision I made

Using react-hook-forms and zod for form creation and validation. The AI by default chose traditional useState hook to create capsule form. However, I quickly realised that the component was performing multiple re-renders everytime the form's value changed as setState was getting triggered. To optimize this, I decided to use react-hook-forms. Since it is a common practice to use Zod validation with react-hook-forms which provides extra security with frontend validation which is always nice to have, I decided to use zod as well. 