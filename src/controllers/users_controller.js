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
        const { email, password, phone } = req.body;
        const emailRegistered = await usersModel.findUser('email', email);
        if (email === undefined || password === undefined || phone === undefined || email === '' || password === '' || phone === '') {
            return next(createError(403, 'registration failed, please check the input'));
        } else if (emailRegistered.length > 0) {
            return next(createError(403, 'Email Already Registered'));
        } else {
            const passwordHash = await bcrypt.hash(password, 10);
            const dataUSer = {
                id: randomId,
                email: email,
                password: passwordHash,
                phone: phone
            };
            await usersModel.addUser(dataUSer);
            const resultUser = {
                id: dataUSer.id,
                username: dataUSer.username,
                email: dataUSer.email,
                phone: dataUSer.phone
            }
            handleResponse.response(res, resultUser, 201, 'user successfully registered');
        }
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()));
    }
}

// create controller for login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [userRegistered] = await usersModel.findUser('email', email);
        if (email === undefined || password === undefined || email === '' || password === '') {
            return next(createError(403, 'login failed, please check the input'));
        } else if (!userRegistered) {
            return next(createError(403, 'Email or Password Wrong'))
        } else {
            const resultHash = await bcrypt.compare(password, userRegistered.password)
            if (!resultHash) return next(createError(403, 'Email or Password Invalid'));
            const secretKey = process.env.SECRET_KEY_JWT;
            const payload = {
                id: userRegistered.id,
                name: userRegistered.name,
                username: userRegistered.username,
                role: userRegistered.role,
                picture: userRegistered.picture,
            };
            const verifyOptions = {
                expiresIn: '1 days'
            };
            const token = jwt.sign(payload, secretKey, verifyOptions);
            const { id, name, username, role, picture} = userRegistered;
            const result = {
                id,
                name,
                username,
                role,
                picture,
                token: token
            };
            handleResponse.response(res, result, 200, 'successfully login');
        }
    } catch (error) {
        next(createError(500, new createError.InternalServerError()));
    }
}

// export modules to routes
module.exports = {
    addUser,
    loginUser,
}