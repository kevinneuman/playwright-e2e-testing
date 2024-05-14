# playwright-e2e-testing

The repository features a Next.js frontend, Node.js backend, and a PostgreSQL database with Prisma ORM. The entire stack is containerized using Docker. It showcases end-to-end testing with Playwright and utilizes GitHub Actions for automation.

## Setup

Install the dependencies

```
yarn install
yarn playwright install
```

Spin up the services

```
docker-compose up -d
```

## Usage

Run tests

```
yarn test
```

or with UI

```
yarn test-ui
```
