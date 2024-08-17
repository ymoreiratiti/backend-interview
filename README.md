## Luma Technical Interview

Given patient demographics and behavioral data (see sample-data/patients.json), create an algorithm that will process a set of historical patient data and compute a score for each patient that (1 as the lowest, 10 as the highest) that represents the chance of a patient accepting the offer off the waitlist. Take in consideration that patients who have little behavior data should be randomly added to the top list as to give them a chance to be selected. Expose an api that takes a facility's location as input and returns an ordered list of 10 patients who will most likely accept the appointment offer.

## Installation

```bash



$  npm  install



```

## Running the app

```bash





# development





$  npm  run  start







# watch mode





$  npm  run  start:dev







# production mode





$  npm  run  start:prod





```

## Test

```bash





# unit tests





$  npm  run  test







# e2e tests





$  npm  run  test:e2e







# test coverage





$  npm  run  test:cov





# test mutation





$  npm  run  test:mutant





```

## Folder structure

### Project Structure

- **src/configs** - Contains configuration files for the API, including Swagger documentation, environment settings, and container names.

- **src/waitlist/adapter/controllers** - Input adapters for handling HTTP requests, messages, GraphQL, etc.

- **src/waitlist/adapter/repositories** - Repositories for connecting to databases and other APIs.

- **src/waitlist/domain/entities** - Contains domain entities.

- **src/waitlist/domain/exceptions** - Custom exceptions, which are classes that extend `Error`.

- **src/waitlist/domain/interfaces** - Defines interfaces for adapters.

- **src/waitlist/domain/models** - Contains domain models.

- **src/waitlist/domain/services** - Contains domain services.

- **src/waitlist/domain/types** - Contains domain-specific types.

## Technology Stack

This repository leverages a stack centered around the NestJS framework for building scalable server-side applications. Below are the key components:

#### Backend Framework

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Key packages include:

- `@nestjs/common`

- `@nestjs/core`

- `@nestjs/platform-express`

- `@nestjs/swagger`

#### Configuration and Validation

- **class-transformer**: Transforms plain objects into class instances.

- **class-validator**: Validates class instances.

- **env-var**: Manages environment variables.

#### Utility Libraries

- **lodash**: A utility library for JavaScript.

#### TypeScript

- **TypeScript**: A strongly typed programming language that builds on JavaScript.

#### Testing

- **Jest**: A delightful JavaScript testing framework.

- **Supertest**: A library for testing HTTP servers.

- **@automock**: For mocking dependencies in NestJS applications.

#### Linting and Formatting

- **ESLint**: A tool for identifying and fixing problems in JavaScript code.

- **Prettier**: An opinionated code formatter.

#### Mutation Testing

- **Stryker**: A mutation testing framework for JavaScript and TypeScript.

#### Development Tools

- **Nest CLI**: Command-line interface for NestJS.

- **ts-jest**: A Jest transformer for TypeScript.

### Scripts

The `package.json` file includes various scripts for building, starting, linting, formatting, and testing the application. Notable scripts include:

- `build`: Compiles the application.

- `start`: Starts the application.

- `test`: Runs the tests using Jest.

- `test:mutant`: Runs mutation tests using Stryker.

For more details, refer to the `package.json` file.

## How this algorith works:

This algorithm can be broken down into several key steps designed to ensure data validation, normalize input for comparison, and ultimately return a balanced list of users based on behavior data and scoring. Here’s a concise summary:

1. **Data Validation:**

- Validate dataset structure and contents to ensure they conform to expected formats, given Node.js is not strongly typed.

- Validate the geographic coordinates (latitude/longitude) to prevent unexpected behavior.

2. **Offer Calculation:**

- Compute the total number of offers (accepted + rejected) for each user to assess the amount of behavioral data available.

3. **Distance Calculation:**

- Use the distance formula to calculate the distance between users and a facility. This is done for simplicity and practicality.

4. **Normalization:**

- Normalize different data fields to a 0-1 scale for easier comparison across various units (e.g., distance vs. age).

5. **Score Calculation:**

- Apply predefined weights to the normalized values to calculate a score for each user, adding a new column to the dataset.

6. **List Generation:**

- Generate two lists: one prioritizing users with fewer behavioral data points and another ordered by the calculated scores.

- Randomly determine how many users from the "less data" list should be selected, and fill in the remainder from the "higher score" list.

7. **Result Return:**

- Return a balanced list that accounts for users with less behavioral data, ensuring they have a fair chance to be considered.

This approach balances the need to consider both data-rich and data-poor users by combining scoring with a randomized selection process.

## Acknowledgements

- [How to Find the Distance Between Two Points](https://www.wikihow.com/Find-the-Distance-Between-Two-Points)

- [Normalization](https://www.codecademy.com/article/normalization)

## Authors

- [@ymoreiratiti](https://github.com/ymoreiratiti)
