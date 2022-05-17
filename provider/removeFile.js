const fsPromises = require('node:fs/promises');
const path = require('path')
module.exports = async function removeFile(filePath) {
    return new Promise((resolve, reject) => {
        try {
            fsPromises.unlink(filePath);
            console.log('Successfully removed file!');
            resolve(true);
          } catch (err) {
            console.log(err);
            reject(false);
          }
    })
}