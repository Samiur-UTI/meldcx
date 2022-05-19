// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const path = require('path');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client from a Google service account key
const gc = new Storage({
    keyFilename: path.join(__dirname, '../', process.env.CONFIG),
    projectId: "my-first-gcp-project"
});

const myFiles = gc.bucket('gcp-bucket');
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

createBucket().catch(console.error);

module.exports = {
    myFiles
}