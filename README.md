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
Now, create the database


```bash


# Postgres shell
create database  database_dev; 
create database  test;

```
Next, start the Postgres server:

```bash
npm run start
```

Now, check if Postgres has the database `database_dev`, if not create it:

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
