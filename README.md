# WordleMadness

# About

A web application that solves any [Wordle](). Input the answer and allowed lists and it will tell you the best(or nearly the best) solution that gives you the minimum number of average tries to solve the Wordle! 


# Set-up

## Frontend

To run this application locally, first clone the repository (git clone/zip). Then, install node and npm(insert links) on the machine, move to /frontend, then run

```npm install```

Additionally, you will need to install Jest [here](https://jestjs.io/docs/tutorial-react) under "Set-up with Create React App". You would also need to install [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Axios](https://axios-http.com/docs/intro). You may still get errors when you run `npm start`, in particular, SyntaxError: Invalid or unexpected token when Jest parses CSS files. In which case, see the second answer [here](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css) and change the Babel configuration file to .cjs if needed.

## Backend

For the backend, you will need to install Maven on your computer. Follow the guide at https://maven.apache.org/download.cgi to download Maven for your computer.

## Database

To run the application, you will need a local instance of MySQL. Install MySQL Community Server at the following webpage: https://dev.mysql.com/downloads/installer/ (Note: When prompted, set connection type to TCP/IP and the server port to 3306 under "Type and Networking"). When prompted to add a user, add a user with role "DB Admin", username "backend" and set a password.

Next, connect to the server using \connect backend@localhost:3306 and create a new database called "wordle".

# Running and Deployment

## Environment Variables

The environment variables must be configured during a local build. For the frontend, this is in the Constants.js file and for the backend, this is in the MainController.java file.

In particular, for Constants.js, set the variable BACKEND to "http://localhost:8080/backend/" and for MainController.java under the @CrossOrigin annotation, set origins to be "http://localhost:3000/" during a local build. You can do so by changing the commmented out line for BACKEND and @CrossOrigin (// ... means the line is commented out).

To establish connectivity between the backend and the database, in the /backend/src/main/resources/application.properties file, set the following attributes:
spring.datasource.url=jdbc:mysql://localhost:3306/wordle

spring.datasource.username=backend

spring.datasource.password=(the DB user password you set earlier)

## Running the application

To run the frontend, navigate to the "/frontend" directory, and run 

`npm start`

For the backend, similarly, 

`.\mvnw spring-boot:run`

You will be able to access the local version of the application at http://localhost:3000/.


## Production version

The live version of the WordleMadness application can be accessed at https://wordle-madness.vercel.app/.
