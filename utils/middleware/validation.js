module.exports = async function validation(req, res, next) {
    const { method, url } = req;
    if(method === 'GET') {
        if(!req.params.publicKey || ! req.params.publicKey.length) {
            return res.status(400).json({
                message: 'Missing query parameter: publicKey'
            });
        }
        return next();
    }
    if(method === 'DELETE') {
        if(!req.params.privateKey || ! req.params.privateKey.length) {
            return res.status(400).json({
                message: 'Missing query parameter: privateKey'
            });
        }
        return next();
    }
}