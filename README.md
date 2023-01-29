# chef_experience_backend

## Description

This is the backend of the chef experience project, this project is a platform where chefs can share their recipes and users can buy and rate them.

## Technologies

- NodeJS
- Express
- Typescript
- Jest
- Docker
- Docker Compose
- TypeORM
- MySQL
- Clean Architecture

## How to run the project

First, you need to create a `.env` file in the root of the project, you can use the `.env.example` file as a template.

Then, you need to run the following command to start the project:

```bash
npm run dev
```

If you want to run the project with docker, you need to run the following command:

```bash
docker-compose up
```

if you want to build and run the project with docker, you need to run the following command:

```bash
npm run build
npm run start
```

## General information

### Context view

![Context View](/resources/context_view.png)

### Functional view

![Functional View](/resources/functional_view.png)

### Deployment view

![Deployment View](/resources/deployment_view.png)

### Clean Architecture

#### Flow

![Clean Architecture Flow](/resources/clean_architecture_flow.png)

#### Distribution

![Clean Architecture](/resources/clean_architecture_distribution.png)

### DB Diagram

![DB Diagram](/resources/db_diagram.png)

## How to run tests

First, you need to start the server. To do this, run the following command:

```bash
npm run dev
```

Then, you need to create a user and a meal in your local database, for this you need to use Insomnia Rest ([Download here](https://insomnia.rest/download)). In `resources` folder you can find the insomnia workspace called `chef_experience_backend_collection.json`, import it and using the `Users/Register User` request you cant create and user (_**it's important that the user role will be assigned like a chef, otherwise the restrictions doesn't allow this user create meals**_). Using the `Meals/Add Meal` request you can create a meal.

Requests example

![User Registration](/resources/register_request_example.png)

![User Login](/resources/login_request_example.png

\*Use the Insomnia's variables handler system.

![Insomnia variable handler](/resources/insomnia_variable_handler.png)

Then, in a new terminal, run the following command to run the tests:

```bash
npm run test or npm test
```

if you want to run the coverga test, run the following command:

```bash
npm run test:coverage

```

## TODO

- [ ] Clean architecture adapters implementation
- [ ] Swagger
