module.exports = async function validation(req, res, next) {
    const { method, url } = req;
    if(method === 'GET' && url === '/api/getFile') {
        if(!req.query.publicKey) {
            return res.status(400).json({
                message: 'Missing query parameter: publicKey'
            });
        }
        return next();
    }
    if(method === 'DELETE' && url === '/api/deleteFile') {
        if(!req.query.privateKey) {
            return res.status(400).json({
                message: 'Missing query parameter: privateKey'
            });
        }
        return next();
    }
}