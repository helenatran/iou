require("dotenv").config();
const router = require('express').Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const PROOF = require("../models/proofModel");

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all Proof Routes
router.route("/").get((req, res, next) => {
    PROOF.find(
        {},
        null,
        {
            sort: { createdAt: 1 }
        },
        (err, proof) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(proof);
        }
    );
});

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

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

    s3bucket.upload(params, function (err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.send({ data });
            const newFileUploaded = {
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
            };
            const proof = new PROOF(newFileUploaded);
            proof.save(function (error, newFile) {
                if (error) {
                    throw error;
                }
            });
        }
    });
});

module.exports = router;
