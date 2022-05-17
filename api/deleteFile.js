const provider = require('../provider/index');
const db = require('../models/index');
module.exports = async function deleteFile(req, res) {
    const {privateKey} = req.params
    try {
        const file = await db.fileDetails.findOne({
            where: {
                privatekey: privateKey
            }
        })
        if (file) {
            const result = await provider.removeFile(file.filepath)
            console.log(result)
            if(!result) {
                return res.status(500).json({
                    message: 'Internal server error'
                })
            }
            await db.fileDetails.destroy({
                where: {
                    privatekey: privateKey
                }
            })
            await db.user.update({
                uploaded: db.sequelize.literal('uploaded - ' + file.filesize)
            }, {
                where: {
                    ip: file.ip
                }
            })
            return res.status(200).json({
                message: 'File deleted successfully'
            })
        } else {
            return res.status(404).json({
                message: 'File not found'
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}