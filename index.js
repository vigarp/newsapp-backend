// import internal modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

const handleURL = require('./src/helpers/common')
const handleResponse = require('./src/helpers/common')
const route = require('./src/routes')

// using app method
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/v1', route)
app.use('/file', express.static('./uploads'));
app.get('/', (req, res) => {
    res.send('mau apa kamu? :)')
})
app.use(handleURL.urlNotFound);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    handleResponse.response(res, null, statusCode, message);
    console.log(err);
})

server.listen(PORT, () => {
    console.log(`server starting on port ${PORT}`);
});

module.exports = app;