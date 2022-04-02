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

// create model for find/handling authentication user
const findUser = (field, record) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, username, email, password, fullname, role, job, phone, picture, about FROM users WHERE ${field} = '${record}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error)
            }
        })
    })
}

// create model for detail user by field
const detailUser = (field, record) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, username, email, fullname, role, job, phone, picture, about FROM users WHERE ${field} = '${record}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        });
    });
};


// create model for display all list users
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

// export modules to controllers
module.exports = {
    addUser,
    findUser,
    listUsers,
    detailUser
}