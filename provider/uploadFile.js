const fs = require('fs');
const path = require('path');
module.exports = async function uploadFile(file) {
    console.log(file)
    let response
    try {
        file.forEach(async (file) => {
            const writeStream = fs.createWriteStream(path.join(__dirname, '../', process.env.FOLDER, file.originalname));
            writeStream.write(file.buffer, () => {
                writeStream.end(() => {
                    console.log('File uploaded');
                    response = {
                        success: true,
                        message: 'File uploaded successfully',
                    }
                });
            });
            if(!response) {
                response = {
                    success: false,
                    message: 'File upload failed',
                }
            }
            return response
        })
    } catch (error) {
        throw new Error(error);
    }
}