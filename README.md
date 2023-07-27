# Installation Guide - World Wide Capitals: Next.js Client and Laravel Sail REST API

This guide will walk you through the installation process for setting up the World Wide Capitals Next.js client and the Laravel Sail REST API.

The Next.js client will allow users to register, login, or use available demo credentials. The REST API will handle user registration, authentication, SPA authentication, and countries data GET requests.

## Prerequisites

Before proceeding, make sure you have the following software installed on your machine:

1. **Git**: Version control system for cloning the repositories.
2. **Node.js**: JavaScript runtime for running the Next.js client.
3. **Docker**: Containerization platform for running the Laravel Sail environment.
4. PHP ^8.1
5. Composer

## Step 1: Clone the Repositories

Open your terminal and clone the two repositories for the Next.js client and the REST API.

```bash
# Clone the Next.js client repo
git clone <https://github.com/tobiom123/world-wide-capitals-client.git>

# Clone the Laravel Sail REST API repo
git clone <https://github.com/tobiom123/world-wide-capitals-rest-api.git>
```

## Step 2: Set up the Next.js Client

1. Change into the Next.js client directory.

```bash
cd world-wide-capitals-client
```

2. Install dependencies.

```bash
npm install
```

3. Update the API endpoint.

Open the Next.js client codebase and copy the `.env.example` file to `.env.local` and supply the URL of your backend:

```javascript
# Inside the .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the Next.js client.

```bash
npm run dev
```

The Next.js client should now be running and accessible at `http://localhost:3000`.

## Step 3: Set up the Laravel Sail REST API

1. Change into the REST API directory.

```bash
cd world-wide-capitals-rest-api
```

2. Install dependencies and set up the environment.

```bash
# Copy the example environment file and update it with your configuration
cp .env.example .env

# Install PHP dependencies
composer install
```

3. Run the Laravel Sail environment using Docker.

```bash
./vendor/bin/sail up


# Generate the application key
./vendor/bin/sail artisan key:generate

# Create the database tables and seed with demo data
./vendor/bin/sail artisan migrate --seed
```

The REST API should now be running and accessible at `http://localhost:8000`.

## Step 4: Using the Demo Credentials

You can use the following demo credentials to log in and explore the application:

- **Username**: example@gmail.com
- **Password**: password

## Conclusion

You can now register, log in, or use the provided demo credentials to explore the World Wide Capitals application.
