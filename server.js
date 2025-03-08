const express = require('express')
const app = express()
const env = require("dotenv").config()


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

// Importing the routes
const routes = require('./routes/route')
app.use('/', routes)


app.listen(port, () => {
    console.log(`trial app listening on ${host}:${port}`)
})