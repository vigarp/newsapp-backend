// import modules
const express = require('express');
const route = express.Router();

// import route module from user_routes & usersController
const usersController = require('../controllers/users_controller');
const articlesController = require('../controllers/articles_controller');
const {protect, isAdmin} = require('../middleware/auth')
// declare router

route.post('/register', usersController.addUser);
route.post('/login', usersController.loginUser);

route.get('/users', protect, usersController.listUsers);
route.get('/users/:id', protect, usersController.detailUser);

route.post('/articles', protect, articlesController.addArticle);
route.get('/articles', protect, articlesController.listArticles);
route.get('/articles/:id', protect, articlesController.detailArticle);
route.delete('/articles/:id', protect, isAdmin, articlesController.deleteArticle);
route.get('/articles/pending/:id', protect, isAdmin, articlesController.updateArticle);

module.exports = route