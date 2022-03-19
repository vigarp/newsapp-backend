// import modules
const connection = require("../helpers/db_connection");

// create model for add article
const addArticle = (dataArticle) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO articles SET ?', dataArticle, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create model for list articles
const listArticle = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM articles', (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create model for detail an article
const detailArticle = (idArticle) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM articles WHERE id = ?', (idArticle), (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}


module.exports = {
    addArticle,
    listArticle,
    detailArticle,
}