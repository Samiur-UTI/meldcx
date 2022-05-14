module.exports = async function limitChecker(req, res, next) {
    const { method, url } = req;
    const { limit } = req.query;
    const { body } = req;
    const { file } = body;
    const { size } = file;
    const { fileSize } = config.limits;
    if (method === 'POST' && url === '/api/createFile') {
        if (size > fileSize) {
            return res.status(400).json({
                message: 'File size is too large'
            });
        }
    }
    next();
}