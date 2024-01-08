

/**
 * Contains all the users related routes.
 */
'use strict';

const router = require('express').Router()

router.get("/list", (request, response) => {
    require('../Controller/recipe').getRecipe(request, response);
});

router.post("/get-list", (request, response) => {
    require('../Controller/recipe').getrRecipeLocal(request, response);
});

router.post("/recipe-details", (request, response) => {
    require('../Controller/recipe').getPDP(request, response);
});

module.exports = router
