# vouch-technical-test-solution

## Date submission

December 5 2023, 23:51

## Instructions to run assignment locally

### Requirements

- MongoDB
- Node ^20

### Getting started (local development)

#### Frontend

- clone this repo
- go to folder `frontend`
- run `cp env-example .env`
- adjust `.env` file (or leave it as it is)
- run `npm install`
- run `npm start`
- open `localhost:3000` on your favorite browser

#### Backend

- go to folder `backend`
- run `cp env-example .env`
- run `npm install`
- run `npm start` to start the backend server or using vscode `Run and debug` and choose `debug-dev`

## Time spent

3 days

## Assumption made

- authentication: I assumed that user authentication is not a primary focus of this technical test, and as such, I implemented a username/email password authentication to show i am capable to design robust authentication system with encryption and secure password handling.
- Real-time Communication: Given the nature of a chat app, I assumed that real-time communication is a key requirement. Therefore, I integrated a WebSocket-based solution to enable instant message delivery. In a production environment, I would consider additional optimizations for scalability and potential load balancing.

## Shortcuts/Compromises made

- Error Handling: While I implemented basic error handling, I acknowledge that a comprehensive error handling system is crucial for a production environment. This includes logging, detailed error messages, and user-friendly error pages.
- Code Optimization: Given the limited time, I focused on functionality over extensive code optimization. In a real-world scenario, I would conduct more thorough code reviews and performance optimizations to ensure efficient resource utilization.

## Assume your application will go into production…

- What would be your approach to ensuring the application is ready for production
(testing)?
  - Unit Testing: Implementing comprehensive unit tests to validate the functionality of individual components.
  - Integration Testing: Ensuring seamless interaction between different modules and components.
  - User Acceptance Testing (UAT): Involving end-users or stakeholders to validate that the application meets their requirements.
  - Performance Testing: Simulating various user scenarios to assess application responsiveness and scalability.
  - Security Testing: Conducting vulnerability assessments and penetration testing to identify and address potential security risks.
- Ensuring Smooth User Experience with Thousands of Users:
  - Load Testing: Simulating a high volume of concurrent users to identify performance bottlenecks and optimize server capacity.
  - Caching: Implementing caching mechanisms for frequently accessed data to reduce server load.
  - Content Delivery Network (CDN): Utilizing a CDN to distribute static assets and improve response times globally.
- Key Steps for Ensuring Application Security:
  - Data Encryption: Implementing encryption for data in transit and at rest.
  - Input Validation: Ensuring thorough validation of user inputs to prevent common vulnerabilities like SQL injection and cross-site scripting (XSS).
  - Authentication and Authorization: Implementing secure user authentication and authorization mechanisms.
  - Regular Security Audits: Conducting periodic security audits to identify and address potential vulnerabilities.
  - Updating Dependencies: Keeping third-party libraries and dependencies up to date to address security patches.

## What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

- Comprehensive Logging: While I included basic logging, a more detailed logging system for monitoring and debugging purposes was not fully implemented.
- Group channel
- delete message (Conversations he has with other people can still be seen by that person even though he has deleted the conversation)
- multi theme
- voice call
- video call

## Other information

Given the constraints of the technical challenge, i am not focused on the requirements of the technical test. I simply build the actual chat app where user can register and login, find other users, start conversation with other users, create a group channel. The reason i am doing this is because is want to keep this solution for my `portfolio`. The solution i put here is not complete since there are lot of features is not done yet, so i hope the reviewer also review my code.

## Feedback on the Technical Challenge

I appreciate the opportunity to work on this technical challenge. It provided a valuable platform to showcase my skills in a limited timeframe. The scenario allowed me to demonstrate my ability to make decisions, prioritize tasks, and deliver a functional solution. I am open to any feedback you may have and am eager to discuss any areas for improvement or further exploration.

### Thanks!
