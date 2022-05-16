const provider = require('../provider/index');
const keyPair = require('keypair')
const db = require('../models/index');
module.exports = async function createFile(req, res) {
    //API controller to handle the incoming file and sending it to the provider, 
    // also saving the file details in db and then returning the response
    try {
        const response = await provider.uploadFile(req.files);
        if (response.status === 'success') {
            const files = await Promise.all(response.fileDetails.map(async (file) => {
                    return {
                        ...file,
                        publickey: await keyPair().public,
                        privatekey: await keyPair().private,
                        ip: req.ip
                    }
                })
            )
            //Add the file to the database
            await db.fileDetails.bulkCreate(files)
            //Update uploaded size in the database to reflect the new file size
            await db.user.update({
                uploaded: db.sequelize.literal('uploaded + ' + files.reduce((acc, file) => {
                    return acc + file.filesize
                }, 0))
            }, {
                where: {
                    ip: req.ip
                }
            })
            const response = files.reduce((acc, file) => {
                acc[file.filename] = {
                    publicKey: file.publickey,
                    privateKey: file.privatekey
                }
                return acc
            }, {})
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}