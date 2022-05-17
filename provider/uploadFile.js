const fs = require('fs');
const path = require('path');
module.exports = async function uploadFile(file) {
    let response = {
        status: '',
        message: '',
        fileDetails: []
    };
    try {
        return new Promise((resolve, reject) => {
            file.forEach(async (file) => {
                const writeStream = fs.createWriteStream(path.join(__dirname, '../', process.env.FOLDER, file.originalname));
                writeStream.write(file.buffer)
                writeStream.on('finish', () => {  
                    response.status = 'success';
                    response.message = 'File uploaded successfully';
                    response.fileDetails.push({
                        filename : file.originalname,
                        filepath : path.join(__dirname, '../', process.env.FOLDER, file.originalname),
                        filesize : file.size / 1024
                    })
                    resolve(response)
                })
                writeStream.on('error', (err) => {
                    response.status = 'error';
                    reject(response)
                })
                writeStream.end();
            })
        })
    } catch (error) {
        throw new Error(error);
    }
}