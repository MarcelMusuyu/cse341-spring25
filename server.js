/* eslint-disable no-undef */
const express = require('express');
const app = express();
const env = require("dotenv").config();

const connectDB = require('./database/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); // Path to your generated Swagger file

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

connectDB.main().catch(console.error);

        // Define your routes here
const routes = require('./routes/route'); // Adjust path as needed
app.use('/', routes);
app.listen(port, () => {
    console.log(`trial app listening on <span class="math-inline">${host} ${port}`);
});
