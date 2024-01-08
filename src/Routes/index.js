/**
 * Classifications of routes in logical manner.
 */
'use strict';

const router = require('express').Router();
const userRoutes = require('./user');
const recipeRoutes = require('./recipe');


router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);


module.exports = router