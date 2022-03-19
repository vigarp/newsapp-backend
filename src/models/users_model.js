// import modules
const connection = require('../helpers/db_connection');

// create model for register user
const addUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?', dataUser, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error)
                reject(error);
            }
        });
    });
};

// create model for find/handling user by email
const findUser = (field, record) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE ${field} = '${record}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        });
    });
};

// create model for list users
const listUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                console.log(error)
                reject(error)
            }
        })
    })
}

// create model for detail an user
const detailUser = (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', (idUser), (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error)
            }
        })
    })
}

// export modules to controllers
module.exports = {
    addUser,
    findUser,
    listUsers,
    detailUser
}