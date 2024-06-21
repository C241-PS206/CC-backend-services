const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { PROJECT_ID, BUCKET_NAME } = process.env;

const keyFilename = path.join(__dirname, './service-account-key.json');
const projectId = PROJECT_ID; 

const storage = new Storage({ projectId, keyFilename });
const bucketName = BUCKET_NAME; 

const bucket = storage.bucket(bucketName);

module.exports = bucket;