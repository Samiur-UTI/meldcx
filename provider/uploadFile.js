const fs = require('fs');
const path = require('path');
module.exports = async function uploadFile(file) {
    console.log(file)
    try {
        file.forEach(async (file) => {
            const writeStream = fs.createWriteStream(path.join(__dirname, '../', process.env.FOLDER, file.originalname));
            writeStream.write(file.buffer)
            writeStream.end();
        })
    } catch (error) {
        throw new Error(error);
    }
}