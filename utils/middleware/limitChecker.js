//The file upload and download limit is dealt with in the middleware layer.

const db = require('../../models/index');

module.exports = async function limitChecker(req, res, next) {
    //Check if the ip address is in the database.
    try {
        const dbCheck = await db.user.findOne({
            where: {
                ip: req.ip
            },
            raw: true
        });
        //If the ip address is not in the database, add it.

        if (!dbCheck) {
            await db.user.create({
                ip: req.ip
            });
        }
        //If the ip address is in the database, check if the file limit has been reached.
        else {
            //Check if the ip address has reached the file upload limit.
            if (req.method === 'POST') {
                const {uploaded} = dbCheck
                const fileSize = req.files.reduce((acc, file) => {
                    return acc + file.size
                }, 0)
                const limit = (process.env.FILE_UPLOAD_LIMIT * 1024) - uploaded
                if ((fileSize / 1024) > limit) {
                    return res.status(400).json({
                        message: 'File upload limit reached'
                    })
                }
            }
            //Check if the ip address has reached the file download limit.
            else if (req.method === 'GET') {
                const {downloaded} = dbCheck
                const limit = (process.env.FILE_DOWNLOAD_LIMIT * 1024 ) - downloaded
                if (limit < 0) {
                    return res.status(400).json({
                        message: 'File download limit reached'
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
    next();
}