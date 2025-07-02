<div align="center">
  
# Baobbab

Search engine to find the best leisure courses near you. 

<p>
  <a href="#about">About the project</a> &nbsp;&bull;&nbsp;
  <a href="#key_features">Key Features</a> &nbsp;&bull;&nbsp;
  <a href="#tech_stack">Tech Stack</a> &nbsp;&bull;&nbsp;
  <a href="#getting_started">Getting Started</a> &nbsp;&bull;&nbsp;
  <a href="#contact">Contact</a>
</p>

</div>

---
<div id="about">

## 📖 About the project
<br>
<p>
Purpose of the application:
Baobbab is an essential search engine to find the best leisure courses near you. Easily connect with passionate teachers, dynamic associations, and excellent clubs around you, and discover a new way to learn and grow.
</p>
<br>
</div>

****
<!-- Key Features -->
<div id="key_features">

## Key Features

- **Map Visualization:** View available courses on an interactive map.
- **Course Details:** Access detailed information about each course with photos or videos.
- **Quick Booking:** Book a trial class with a single click.
- **Role-based access:**
  - **User:** Books trial classes and views information.
  - **Organization Admin:** Manages courses for their organization.
  
****
<!-- Teck Stack -->
<div id="tech_stack">  
## Technologies Used

### Frontend

- **React:** JavaScript framework for building user interfaces.
- **TanStack Query:** Data-fetching library for managing asynchronous data.
- **Ky:** HTTP client for API requests.
- **React Hook Form:** Form management library.
- **Zod:** Data validation library.
- **TailwindCSS:** CSS framework for modern and responsive design.
- **Shadcn:** Prebuilt components to accelerate UI development.
- **MapLibre:** Library for creating interactive maps.

### Backend

- **NestJS:** Backend framework for a modular and robust architecture.
- **MikroORM:** ORM for database management.
- **PostgreSQL:** Relational database.
- **PostGIS:** Spatial extension for PostgreSQL to handle geographic data.

### External Service

- **API Adresse (.gouv):** Service for geolocating addresses.  
- **Brevo** for email automation (still in progress)
- **Render** for deployment

****
<!-- GETTING STARTED -->
<div id="getting_started">

## 🛠 Getting Started
<br>
<p>Clone down this repository.</p>
` git clone git@github.com:Elodieguay/baobbab.git `

### Prerequisites:
You need:

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)


### Installation:

1. **Clone the repository**

```bash
git clone git@github.com:Elodieguay/baobbab.git 
cd baobbab
```

2. **Create .env files** 
You need one .env file in:
```bash
./apps/api
./apps/web
root
```
Use the `.env.example` files provided.

3. **Install all dependencies** 
`pnpm install`

### Start with Docker (PostgreSQL + API + Frontend):

1. **Launch Docker containers**
`docker-compose up --build`

This will start:
PostgreSQL database, NestJS API and React Vite Front

2. **If you do not use Docker for the API, start it manually:**

```bash
cd apps/api
pnpm dev
```
3. **Launch the DTO's in the package folder with pnpm dev** 

`pnpm dev`

4. **Launch the front with pnpm dev**

`pnpm dev`

## Execute Migrations and Seeders

1. **In a shell execute :**
`docker compose exec api sh`

**Then inside the api container execute:**
`pnpm mikro-orm migration:up`

**Create initial categories using an API client like HTTPie :**
`http POST http://localhost:4000/categories`

After you can seed ( it is optional)
Synchronize schemas:  `pnpm orm:sync`
Launch seeders : `pnpm orm:seed`

## Developper Notes

- Front + API +  Database can be fully managed with Docker.

- Make sure ports 5432 (Postgres), 3000 (API), 5173 (Frontend Vite) are free.

## Interact with the Database

**Open a shell in the database container:**

`docker compose exec db sh`

**Launch the psql interactive console**

`psql -U postgres -d baobbab_db`
-U postgres: the defaul database user
-d baobbab_db: your database name

## Example commands inside 

**List all tables:**

`\dt`

**Run SQL Query:**

`SELECT* FROM "categories"`