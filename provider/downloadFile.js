const fs = require('fs');
const bucket = require('./gc')
module.exports = async function downloadFile(req, res) {
    if (process.env.PROVIDER === 'local') {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(req.filepath)
            readStream.on('error', (err) => {
                reject(err)
            })
            readStream.on('open', () => {
                readStream.pipe(res)
                resolve(true)
            })
        })
    } else {
        //This is where the code to download the file from google cloud goes
        const sourcePath = path.join('https://storage.googleapis.com/', process.env.STORAGE_PATH, req.filename)
        const destPath = path.join(__dirname, '../', process.env.FOLDER, req.filename)
        return new Promise((resolve, reject) => {
            bucket.file(sourcePath).download({
                destination: destPath
            }, (err) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        })
    }
}