const fs = require('fs');
module.exports = async function downloadFile(path, res) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path)
        readStream.on('error', (err) => {
            reject(err)
        })
        readStream.on('open', () => {
            readStream.pipe(res)
            resolve(true)
        })
    })
}