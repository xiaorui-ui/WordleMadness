# WordleMadness

## About

A web application that solves any [Wordle](). Input the answer and allowed lists and it will tell you the best(or nearly the best) solution that gives you the minimum number of average tries to solve the Wordle! 


## Set-up

To run this application locally, first clone the repository (git clone/zip). Then, install node and npm(insert links) on the machine, move to /frontend, then run (for Windows) 

```npm install```

Additionally, you will need to install Jest [here](https://jestjs.io/docs/tutorial-react) under "Set-up with Create React App". You would also need to install [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Axios](https://axios-http.com/docs/intro). You may still get errors when you run `npm start`, in particular, SyntaxError: Invalid or unexpected token when Jest parses CSS files. In which case, see the second answer [here](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css) and change the Babel configuration file to .cjs if needed.   

## Running and Deployment

The environment variables must be configured during a local build. For the frontend, this is in the Constants.js file and for the backend, this is in the MainController.java file.

In particular, for Constants.js, set the variable BACKEND to "ht<span>tps://localhost:8080/" and for MainController.java under the @CrossOrigin annotation, set origins to be "ht<span>tps://localhost:3000/" during a local build. You can do so by changing the commmented out line for BACKEND and @CrossOrigin (// ... means the line is commented out).

To run the frontend, navigate to the "/frontend" directory, and run 

`npm start`

For the backend, similarly, 

`mvnw spring-boot:run`
In particular, for Constants.js, set the variable BACKEND to "https://localhost:8080/" and for MainController.java under the @CrossOrigin annotation, set origins to be "https://localhost:3000/" during a local build.

The live version of the WordleMadness application can be accessed at "https://wordle-madness.vercel.app/".
