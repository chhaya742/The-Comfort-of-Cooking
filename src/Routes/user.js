


/**
 * Contains all the users related routes.
 */
'use strict';

const jwt = require('../Middleware/JsonWebToken');

const router = require('express').Router()

router.post("/sign-up", (request, response) => {
    require('../Controller/user').userRegister(request, response);
});

router.post("/login", (request, response) => {
    require('../Controller/user').userLogin(request, response);
});
module.exports = router
