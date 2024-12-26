# Backend Acara

Backend Acara is an event management system backend built with Node.js, Express, TypeScript, and MongoDB. It provides APIs for user authentication, event management, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Scripts](#scripts)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/fajritaridala/Event-Backend.git backend-acara
   cd backend-acara
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the required environment variables (see Environment Variables).

## Usage

To start the development server, run:

```sh
npm run dev
```

The server will start on http://localhost:3000.

## API Documentation

API documentation is generated using Swagger. To view the documentation, start the server and navigate to https://event-backend-sage.vercel.app/api-docs/.

## Environment Variables

Create a **.env** file in the root directory and add the following environment variables:

```
DATABASE_URL=your_database_url
SECRET=your_secret_key
EMAIL_SMTP_SECURE=true_or_false
EMAIL_SMTP_PASS=your_smtp_password
EMAIL_SMTP_USER=your_smtp_user
EMAIL_SMTP_PORT=your_smtp_port
EMAIL_SMTP_HOST=your_smtp_host
EMAIL_SMTP_SERVICE_NAME=your_smtp_service_name
CLIENT_HOST=http://localhost:3001
```

## Project structure

```
├──.env
├──.gitignore
├──package.json
├──postman_docs/
│  ├──be-acara.postman_collection.json
│  └──keys.json
├──Readme.md
├──src/
│  ├──controllers/
│  │  └──auth.controller.ts
│  ├──docs/
│  │  ├──route.ts
│  │  ├──swagger_output.json
│  │  └──swagger.ts
│  ├──index.ts
│  ├──middlewares/
│  │  └──auth.middleware.ts
│  ├──models/
│  │  └──user.model.ts
│  ├──routes/
│  │  └──api.ts
│  └──utils/
│     ├──database.ts
│     ├──encryption.ts
│     ├──env.ts
│     ├──jwt.ts
│     └──mail/
│        ├──mail.ts
│        └──templates/
│            └──registration-success.ejs
├──tsconfig.json
└──vercel.json
```

- **src/controllers**: Contains the controller files for handling requests.
- **src/docs**: Contains Swagger documentation files.
- **src/middlewares**: Contains middleware files.
- **src/models**: Contains Mongoose models.
- **src/routes**: Contains route definitions.
- **src/utils**: Contains utility functions and configurations.

## Scripts

```
npm run dev: Start the development server.
npm run docs: Generate API documentation.
```
