# WordleMadness

A web application that solves any wordle. Input the answer and allowed lists and it will tell you the best(or nearly the best) solution that gives you the minimum number of average tries to solve the Wordle! 

To run this application locally, first clone the repository (git clone/zip). Then, install node and npm(insert links) on the machine, move to /frontend, then run (for Windows)  
```npm install```

All the dependencies for the frontend should have been installed.

Note: The environment variables must be configured during a local build. For the frontend, this is in the Constants.js file and for the backend, this is in the MainController.java file.

In particular, for Constants.js, set the variable BACKEND to "https://localhost:8080/" and for MainController.java under the @CrossOrigin annotation, set origins to be "https://localhost:3000/" during a local build.

The live version of the WordleMadness application can be accessed at "https://wordle-madness.vercel.app/".
