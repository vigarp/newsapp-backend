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
const listArticle = (searchQuery) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM articles WHERE status LIKE '%${searchQuery}%'`, (error, result) => {
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

// create model for delete an article
const deleteArticle = (idArticle) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM articles WHERE id = ?', (idArticle), (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                console.log(error);
                reject(error);
            }
        })
    })
}

// create model for accept an article
const updateArticle = (idArticle) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE articles SET status = 'published' WHERE id = '${idArticle}'`, (error, result) => {
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
    deleteArticle,
    updateArticle
}