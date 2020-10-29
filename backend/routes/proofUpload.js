require("dotenv").config();
const router = require('express').Router();
const multer = require("multer");
const AWS = require("aws-sdk");

// Multer ships with storage engines DiskStorage and MemoryStorage
// Multer adds a body object and a file to the request object. 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST request - Route to upload the file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/upload", upload.single("file"), function (req, res) {
    const file = req.file;

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    //Where you want to store your file
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };

    //Upload on our Amazon S3 bucket
    s3bucket.upload(params, function (err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.send({ data });
        }
    });
});

module.exports = router;
