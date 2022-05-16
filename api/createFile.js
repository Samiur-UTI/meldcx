const provider = require('../provider/index');

module.exports = async function createFile(req, res) {
    //API controller to handle the incoming file and sending it to the provider, then returning the response
    const response = provider.uploadFile(req.files);
}