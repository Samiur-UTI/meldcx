const db = require('../models/index');
const provider = require('../provider/index');
module.exports = async function getFile(req, res) {
    try {
        const publicKey = req.params.publicKey;
        const checkDB = await db.fileDetails.findOne({
            where: {
                publickey: publicKey
            },
            raw: true
        });
        if (!checkDB) {
            return res.status(404).json({
                message: 'File not found'
            });
        }
        const response = await provider.downloadFile(checkDB, res);
        if (!response) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
        await db.user.update({
            downloaded: db.sequelize.literal('downloaded + ' + checkDB.filesize),
            updatedat: Date.now()
        }, {
            where: {
                ip: checkDB.ip
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}