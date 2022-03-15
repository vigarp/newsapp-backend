const createError = require('http-errors');
const handleResponse = require('../helpers/common');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import modules from models
const usersModel = require('../models/users_model');

// create controller for register user
const addUser = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 999);
        const randomIdWallet = 'W-' + Math.floor(Math.random() * 999);
        const { email, password, username } = req.body;
        const emailRegistered = await usersModel.findUser('email', email);
        if (username === undefined || email === undefined || password === undefined || username === '' || email === '' || password === '') {
            return next(createError(403, 'registration failed, please check the input'));
        } else if (emailRegistered.length > 0) {
            return next(createError(403, 'Email Already Registered'));
        } else {
            const passwordHash = await bcrypt.hash(password, 10);
            const dataUSer = {
                id: randomId,
                username: username,
                email: email,
                password: passwordHash,
            };
            await usersModel.addUser(dataUSer);
            const resultUser = {
                id: dataUSer.id,
                username: dataUSer.username,
                email: dataUSer.email
            }
            handleResponse.response(res, resultUser, 201, 'user successfully registered');
        }
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()));
    }
}


// export modules to routes
module.exports = {
    addUser,
}