// import internal modules
const createError = require('http-errors');
const handleResponse = require('../helpers/common');

// import external modules from model
const articlesModel = require('../models/articles_model');

// create controller for add article
const addArticle = async (req, res, next) => {
    try {
        const { id_user, publisher, header, title, category, body, attachment } = req.body;
        const randomIdArticle = 'ART-' + Math.floor(Math.random() * 999);

        const dataArticle = {
            id: randomIdArticle,
            id_user,
            publisher,
            status: "pending",
            category,
            title,
            header,
            body,
            attachment,
            created_at: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
        }
        await articlesModel.addArticle(dataArticle);
        handleResponse.response(res, dataArticle, 200, 'Successfully POST an article');
    } catch (error) {
        console.log(error);
        next(createError(500, new createError.InternalServerError()));
    }
}

// create controller for list articles
const listArticles = async (req, res, next) => {
    try {
        const resultArticles = await articlesModel.listArticle();
        handleResponse.response(res, resultArticles, 200, 'Successfully listed articles');
    } catch (error) {
        console.log(error);
        next(createError(500, new createError.InternalServerError()));
    }
}

// create controller for detail an article
const detailArticle = async (req, res, next) => {
    try {
        const idArticle = req.params.id;
        const [resultArticle] = await articlesModel.detailArticle(idArticle);
        if (resultArticle === undefined) {
            handleResponse.response(res, null, 404, 'Article not found')
        } else {
            handleResponse.response(res, resultArticle, 200, 'Successfully fetched an article');
        }

    } catch (error) {
        console.log(error);
        next(createError(500, new createError.InternalServerError()));

    }
}

module.exports = {
    addArticle,
    listArticles,
    detailArticle
}