const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const router = express.Router();
const port = process.env.PORT || 5000;
const limitChecker = require('./utils/middleware/limitChecker');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// This is the route controller layer, it is responsible for handling all the routes
// Also its is responsible for validating the request body, with the daily upload-download limit and sending the response

//Apply middleware on upload and download routes

router.post('/', limitChecker,async (req, res) => {
    res.json({
        message: 'File uploaded successfully'
    });
})

router.get('/:publicKey', limitChecker, async (req, res) => {
    console.log("REQ",req.params.publicKey);
    res.json({
        message: 'File uploaded successfully'
    });
})

router.delete('/:privateKey', async (req, res) => {
    res.json({
        message: 'File deleted successfully'
    });
})

app.use('/file', router);
app.listen(port, () => console.log(`Listening on port ${port}`));