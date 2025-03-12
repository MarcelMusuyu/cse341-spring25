// eslint-disable-next-line no-undef
const swaggerDoc = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/route']; // Add all your route files here

const doc = {
  info: {
    title: 'REST API for CSE341', 
    description: ' This is a REST API for CSE341 course. The purpose of this API is to provide a way to manage contacts. This API will allow you to create, read, update, and delete contacts. This API is built using Node.js, Express, and MongoDB. The API is hosted on Render and the database is hosted on MongoDB Atlas. The API is secured using JWT tokens. The API is documented using Swagger. The API is tested using Postman. The API is deployed using GitHub Actions', 
  },
  host: 'localhost:3000', // Change to your host and port
  schemes: ['http'], // Change to https if you're using https
};

swaggerDoc(outputFile, endpointsFiles, doc);