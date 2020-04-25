# MERN Authentication Example

![screenshot](https://github.com/gabriardi/mern-authentication-example/blob/master/screenshot.png)

Simple full-stack MERN app with authentication using [Passport](http://www.passportjs.org/) and [jwt](https://github.com/auth0/node-jsonwebtoken#readme) with refresh tokens.

- Front-end built with [React](https://reactjs.org/) and [Redux](https://redux.js.org/) using [Scss](https://sass-lang.com/) modules
- Back-end built with [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/)

Inspired by the numerous articles and tutorials on this matter.  
Special mention to this series of articles:

- [Build a Login/Auth App with the MERN Stack ](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669)

## Getting started

## Prerequisites

[**MongoDB**](https://www.mongodb.com/) database up and running

## Installation and configuration

1. Clone the repo
   ```bash
   git clone https://github.com/gabriardi/mern-authentication-example.git
   ```
2. Install NPM packages for server and client from the server directory

   ```bash
   cd mern-authentication-example/server

   npm install && npm run client-install
   ```

3. Create a .env file in the server folder with the following environment variables

   ```
   DB_URI=YourMongoDbURI
   JWT_SECRET=YourSecret
   JWT_REFRESH_SECRET=YourOtherSecret
   ```

4. Run client & server with concurrently
   ```bash
   npm run dev
   ```
