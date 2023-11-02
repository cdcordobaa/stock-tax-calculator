# Stock Tax Calculator

## Technical and Architectural Decisions

The project's architecture was crafted, adhering to principles of Domain-Driven Design (DDD) with a hexagonal architecture approach. This paradigm was chosen to promote a clear separation of concerns, encapsulate business logic within the domain model, and allow our application to be agnostic of the delivery mechanism.

The domain is the center of the application, where all business logic, particularly the tax calculation algorithm, resides. It's segregated into three principal entities:

- **Tax**: Represents the tax-related data and operations.
- **Operation**: Encapsulates individual financial transactions.
- **Trading Context**: Acts as a shared state through the entire calculation process, ensuring consistency and integrity of the data flow.

TypeScript was selected as the primary language because of its robust type system, which enhances code reliability and maintainability. It greatly reduces the likelihood of runtime errors and streamlines the debugging process by catching errors at compile-time.

## Functional Programming Approach

In the development of this project, I've made a conscious decision to adhere to functional programming principles where possible.

- **Immutability**: We treat data as immutable. Once created, our data structures are never changed, helping us to avoid unexpected side effects and making our application more predictable.
- **Pure Functions**: We strive to make our functions pure. Each function's output depends only on its input parameters, making them easy to reason about and facilitating parallel processing.
- **First-Class Functions**: Functions are treated as first-class citizens in our codebase. They can be assigned to variables, passed as arguments, or returned from other functions, providing us with a high degree of flexibility in how we structure our code.
- **Declarative Code Style**: Our code emphasizes what to do, rather than how to do it. This makes our code more readable and maintainable.

This approach not only aligns with modern JavaScript best practices but also simplifies the codebase, making it easier for developers to contribute

## Frameworks and Libraries

For testing, we employed Jest, a JavaScript Testing Framework with a focus on simplicity. Jest's zero-config and vast community support make it the go-to choice for testing TypeScript applications.

## Compilation and Execution Instructions

To compile the TypeScript source code into JavaScript, follow these simple steps:

1. Ensure Node.js and npm are installed on your system.
2. Navigate to the project directory and run `npm install` to install all dependencies.
3. Execute `npm run build` to compile the TypeScript code.

To run the compiled application, especially with Docker encapsulation:

1. Make sure Docker is installed and running on your machine.
2. Use the provided Dockerfile to build an image with `docker build -t your-app-name .`
3. Start the application with `docker run -it your-app-name`.

## Test Execution Instructions

Tests are an integral part of our application, verifying the correctness of our business logic and ensuring code quality. To run the tests:

- Execute `npm test` to run the Jest test suites.
- For coverage reports, use `npm test -- --coverage`.

## Additional Notes for Evaluation

The application's entry point is designed to be flexible. Currently, it is a Command Line Interface (CLI) app, but it could easily be modified to be a web endpoint, demonstrating the versatility of the hexagonal architecture.

The application is dockerized for ease of deployment and ensuring a consistent environment for running the app across different systems. It is a testament to our commitment to operational excellence and a seamless developer experience.

The domain logic is intentionally isolated from external concerns, which not only makes our codebase more testable and maintainable but also facilitates potential future expansions, such as integrating additional services or changing the user interface without impacting the core business rules.

## Conclusion

In crafting the architecture of this application, the focus was not solely on meeting the current demands but also on building a resilient and scalable foundation. This structure not only supports the current application requirements but also sets the stage for future enhancements.

## Frameworks and Libraries

The selection of Jest for our testing needs was a strategic decision to capitalize on its user-friendly setup and comprehensive testing capabilities. The framework's seamless integration with TypeScript makes it a reliable partner for our testing strategy.

## Running and Testing Instructions

The solution is fully dockerized, streamlining deployment and execution. To run the stock-tax-calculator application:

1. Build the Docker image by running the following command at the root of the project:

    ```
    docker run -i stock-tax-calculator < input.txt
    ```

2. Once the image is built, you can run the application with:

    ```
    docker run -i stock-tax-calculator < input.txt
    ```

This command will process the data provided in `input.txt` and output the tax calculations accordingly.

For those looking to run specific tests or test cases using Jest, a local environment setup is required:

1. Ensure that Node.js and npm are installed on your machine.
2. Navigate to the project's root directory.
3. Run `npm install` to install all node dependencies.
4. Execute `npm run test` to initiate the Jest test suites and observe the results.

By dockerizing the application, we eliminate the variability of individual development environments and ensure that our application runs consistently across all platforms. It underscores our commitment to operational reliability and a frictionless setup process. This, combined with Jest for our testing framework, positions us to maintain high standards of quality and deliver an application that is robust, tested, and reliable.
