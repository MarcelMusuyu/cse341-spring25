/* eslint-disable no-undef */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const env = require("dotenv").config();

const connectDB = require('./database/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); // Path to your generated Swagger file

// For parsing application/json
app.use(express.json());

app.use(cors({ origin: '*' })); // Enable CORS for all routes
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

// connectDB.main().catch(console.error);

        // Define your routes here
const routes = require('./routes/route'); // Adjust path as needed
app.use('/', routes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
