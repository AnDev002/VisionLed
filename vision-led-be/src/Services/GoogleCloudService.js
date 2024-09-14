const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

const storage = new Storage({
    keyFilename: path.join(__dirname, '../Config/gcp-credentials.json'),
    projectId: "vision-led-408309"
});

const bucketName = 'visionled';



async function uploadToGCP(base64Data, fileName) {
    return new Promise((resolve, reject) => {
        const base64Image = base64Data.split(';base64,').pop();
        const fileBuffer = Buffer.from(base64Image, 'base64');

        const file = storage.bucket(bucketName).file(fileName);
        const fileStream = file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg' // Định dạng của file là JPEG
            }
        });

        fileStream.on('error', (err) => {
            console.error('Lỗi khi upload file lên GCP:', err);
            reject(err);
        });

        fileStream.on('finish', () => {
            const imageURL = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            console.log('Upload thành công file lên GCP');
            resolve(imageURL);
        });

        fileStream.end(fileBuffer);
    });
}



module.exports = {
    uploadToGCP
};