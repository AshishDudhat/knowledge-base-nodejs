const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');
const fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bucket = process.env.AWS_BUCKET;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET
});


// this is just to test locally if multer is working fine.
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'src/api/media/profiles')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const multerS3Config = multerS3({
    s3: s3,
    bucket: 'talktotucker-new-website',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
});


contentRouter.post('/add-content', upload.single('file'), contentController.addContent);
contentRouter.get('/get-content', contentController.getContent);
contentRouter.get('/get-filtered-content', contentController.getFilteredContent);

module.exports = contentRouter;