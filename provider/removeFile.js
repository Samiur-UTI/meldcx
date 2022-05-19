const fsPromises = require('node:fs/promises');
const bucket = require('./gc')
module.exports = async function removeFile(req) {
  if (process.env.PROVIDER === 'local') {
    return new Promise((resolve, reject) => {
      try {
        fsPromises.unlink(req.filePath);
        console.log('Successfully removed file!');
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(false);
      }
    })
  }else {
    //This is where the code to remove the file from google cloud goes
    const sourcePath = path.join('https://storage.googleapis.com/', process.env.STORAGE_PATH, req.originalname)
    return new Promise((resolve, reject) => {
      bucket.file(sourcePath).delete((err) => {
        if (err) {
          reject(false)
        }
        resolve(true)
      })
    })
  }
}