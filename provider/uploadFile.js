const fs = require('fs');
const path = require('path');
const bucket = require('./gc')
module.exports = async function uploadFile(file) {
    let response = {
        status: '',
        message: '',
        fileDetails: []
    };
    try {
        if (process.env.PROVIDER === 'local') {
            return new Promise((resolve, reject) => {
                file.forEach(async (file) => {
                    const writeStream = fs.createWriteStream(path.join(__dirname, '../', process.env.FOLDER, file.originalname));
                    writeStream.write(file.buffer)
                    writeStream.on('finish', () => {
                        response.status = 'success';
                        response.message = 'File uploaded successfully';
                        response.fileDetails.push({
                            filename: file.originalname,
                            filepath: path.join(__dirname, '../', process.env.FOLDER, file.originalname),
                            filesize: file.size / 1024
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
        } else {
            //This is where the code to upload the file to google cloud goes
            new Promise((resolve, reject) => {
                const { originalname, buffer } = file

                const blob = bucket.file(originalname.replace(/ /g, "_"))
                const blobStream = blob.createWriteStream({
                    resumable: false
                })
                blobStream.on('finish', () => {
                    const publicUrl = format(
                        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                    )
                    response.status = 'success';
                    response.message = 'File uploaded successfully';
                    response.fileDetails.push({
                        filename: file.originalname,
                        filepath: publicUrl,
                        filesize: file.size / 1024
                    })
                    resolve(response)
                })
                    .on('error', () => {
                        response.status = 'error';
                        reject(response)
                    })
                    .end(buffer)
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}