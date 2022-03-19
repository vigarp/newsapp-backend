// import modules
const express = require('express');
const route = express.Router();

// import route module from user_routes & usersController
const usersController = require('../controllers/users_controller');
const articlesController = require('../controllers/articles_controller');
// declare router

route.post('/register', usersController.addUser);
route.post('/login', usersController.loginUser);

route.get('/users', usersController.listUsers);
route.get('/users/:id', usersController.detailUser);

route.post('/articles', articlesController.addArticle);
route.get('/articles', articlesController.listArticles);
route.get('/articles/:id', articlesController.detailArticle);

module.exports = route