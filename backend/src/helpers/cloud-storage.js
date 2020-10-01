const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const sharp = require('sharp');

const cloudStorage = require('../config');

const bucket = cloudStorage.bucket(process.env.BUCKET_NAME);

const uploadImage = async (buffer, originalname, filename) => {
  const resizedBuffer = await sharp(buffer).resize({ height: 400 }).toBuffer();

  const miniBuffer = await imagemin.buffer(resizedBuffer, {
    plugins: [imageminPngquant({ quality: [0.7, 0.8] }), imageminMozjpeg()],
  });

  return new Promise((resolve, reject) => {
    const blob = bucket.file(`${filename}.${originalname.split('.').pop()}`);

    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream.on('error', error => {
      reject(error);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(miniBuffer);
  });
};

const deleteImage = async filename => {
  await bucket.file(filename.split('/').pop()).delete();
};

exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
