const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 5000;
const limitChecker = require('./utils/middleware/limitChecker');
const validate = require('./utils/middleware/validation');
const apiServer = require('./api/index');
const multer = require('multer');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// This is the route controller layer, it is responsible for handling all the routes
// Also its is responsible for validating the request body, with the daily upload-download limit and sending the response

//Apply middleware on upload and download routes

router.post('/',multer().array('files'), limitChecker, apiServer.createFile); 

router.get('/:publicKey',validate, limitChecker, apiServer.getFile);

router.delete('/:privateKey', validate, apiServer.deleteFile);

app.use('/file', router);
app.listen(port, () => console.log(`Listening on port ${port}`));