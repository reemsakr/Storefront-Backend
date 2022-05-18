# Storefront Backend Project
___Table of Contents___

- [Storefront Backend Project](#storefront-backend-project)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Setup environment](#setup-environment)
  - [Running the application](#running-the-application)
  - [Running the unit tests](#running-the-unit-tests)
  - [Built With](#built-with)
  - [Endpoints](#endpoints)
  - [Database Schema](#database-schema)


A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.
## Getting Started

TThese instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.
### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
node 16          # To run the application
npm              # For dependency management
```
### Installing

Simply, run the following command to install the project dependencies:

```bash
npm
```
### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
ENV=dev
PORT=3000
# Set your database connection information here
DPOSTGRES_HOST=127.0.0.1
POSTGRES_DB=database_dev
POSTGRES_TEST_DB=test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
# user

BCRYPT_PASSWORD=reem
SALT_ROUNDS=10
TOKEN_SECRET=secret

```

Next, start the Postgres server:

```bash
npm run start
```

Now, check if Postgres has the database `store`, if not create it:

```bash


# Postgres shell
# This will list out all the databases
\l
# If "database_dev" database is not present
create database database_dev; 
```

Next, you need to run the database migrations:

```bash
db-migrate up
```
## Running the application

Use the following command to run the application in using node:

```bash
npm run start
```

The application will run on <http://localhost:3000/>.
## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```

You may also use the Postman collection present in the repository for testing.
## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [npm](https://npm.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework
## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file


## Database Schema

 - See [REQUIREMENTS.md](./REQUIREMENTS.md) file
<!-- ## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing -->

<!-- ## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission! -->
