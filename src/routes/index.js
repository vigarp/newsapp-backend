// import modules
const express = require('express');
const route = express.Router();

// import route module from user_routes & usersController
const usersController = require('../controllers/users_controller');
// declare router

route.post('/register', usersController.addUser);

module.exports = route