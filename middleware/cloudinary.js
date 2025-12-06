const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dcf7461mx',
  api_key: '962377966169948',
  api_secret: 'vMqZHYM5_yxsh2ht1Dknrexs0Jw'
});

module.exports = cloudinary;