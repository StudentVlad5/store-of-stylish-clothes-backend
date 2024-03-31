const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
console.log("process.env.CLOUDINARY_SECRET", process.env.CLOUDINARY_SECRET,)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'quillis_users',
    resource_type: 'auto',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
  },
  filename: (req, res, cb) => {
    cb(null, res.originalname);
  },
  transformation: [{ width: 300, height: 300, crop: 'limit' }],
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
