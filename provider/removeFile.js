const fs = require('node:fs/promises');

module.exports = async function removeFile(req, res) {
    const deleteFile = async (filePath) => {
        try {
            await fsPromises.unlink(filePath);
            console.log('Successfully removed file!');
        } catch (err) {
            console.log(err);
        }
    };

    // Try it
    const filePath = "./kindacode.com";
    deleteFile(filePath);
}