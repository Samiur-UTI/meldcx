const db = require('../models/index');
const provider = require('../provider/index');
const File = db.fileDetails;

module.exports = async () => {
    //Clean up files not accessed in last 24 hours
    console.log('Cron job started');
    const files = await File.findAll({
        where: {
            updatedat: {
                [db.Sequelize.Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        },
        raw: true
    });
    if (files.length > 0) {
        await Promise.all(files.map(async file => {
            await provider.deleteFile(file.privatekey)
        }));
        await File.destroy({
            where: {
                id: files.map(file => file.id)
            }
        });
    }
    console.log('Cron job finished');
}