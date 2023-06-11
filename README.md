# Restaurant CMS

This is a **fullstack application** based on my template own (https://github.com/philippemalo/MVC-template).
This web application features an admin panel with a basic authentication system. It allows the user to create, update and delete food menus.

## Installation

To use this application, you need to have **Node.js** and **Docker** installed on your system. Once you have them, follow these steps:

Clone this repository: `git clone https://github.com/philippemalo/resto-app.git\`<br>
Change to the project directory: `cd resto-app`

## Database

This application uses **MongoDB** as the database. The configuration is located in the `/Model/.env` file.

### Docker

This application includes a `Dockerfile` for each service and a `docker-compose.yml`, which allows you to run the application in a **Docker** container. (flexible solutions for production version)

### Development

To use Docker, follow these steps:

Build the Docker image: `docker-compose -f docker-compose.dev.yml build`<br>
Run the Docker container: `docker-compose -f docker-compose.dev.yml up -d`

Once the Docker container is built and running, you can access it's bash shell locally using `docker exec -it resto-app_mongo_1 bash`<br>
The `mongo` shell is available there. From the Mongo shell, you can use `show dbs` to show available databases (at this point, you should only see the default databases; admin, config and local)

## Server

The server-side code is located in the `Controller` directory. It's built with **Nodejs** and **Typescript**. It uses **Prisma** to facilitate interactions with the **MongoDB** database. The main entry point is `index.ts`.

Install the dependencies: `npm install`

Once the database is up and running inside the Docker container, generate the Prisma client: `npm run gen`<br>
When the Prisma client is succesfully generated, push the model to the database: `npm run dbp`<br>
You can also use Prisma studio once the database is up: `npm run studio`

Start the development server: `npm run dev`<br>
Open `http://localhost:4466/` in your web browser to see the server running.

## Client

The client-side code is located in the `View` directory. It is built with **Vitejs** and **Vue3**, and uses **TailwindCSS** for styling. The main entry point is `main.ts`.

Install the dependencies: `npm install`<br>
Start the development server: `npm run dev`<br>
Open `http://localhost:8000/` in your web browser to see the application running.
