const path = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
app.use(cors())
// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Directory path for route files
const routesDirectoryPath = path.join(__dirname, 'src/routes');
const router = require("./src/Routes/index")


// Mount the router on the root path ("/") of the Express application
app.use('/', router);

// Export the configured Express application
module.exports = app;
