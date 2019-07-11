const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
require('dotenv').config();

// aws configuration with accessKeyId and secretAccessKey
aws.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET,
})
//define bucket
const S3_BUCKET = process.env.BUCKET_NAME;

// Upload endpoint
router.post('/', (req, res) => {
    // Create a new instance of S3
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `test_folder/${Math.random() * 1000}_${fileName}.${fileType}`,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read',
    };
    // request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log('put error');
            console.log(err);
            res.json({
                success: false,
                error: err
            })
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${s3Params.Key}`
        };
        console.log(data);
        // Send it all back
        res.json({
            success: true,
            data: {
                returnData
            }
        });
    });
    
    // const image = req.files.image;

    // image.mv(`../public/uploads/${image.name}`, error => {
    //     if (error) {
    //         console.error(error);
    //         return res.status(500).send(error);
    //     }

    //     res.json({
    //         imageName: image.name,
    //         imagePath: `/uploads/${image.name}`
    //     });
    // });
    // {
    //     "Version": "2012-10-17",
    //     "Statement": [{
    //         "Sid": "AddCannedAcl",
    //         "Effect": "Allow",
    //         "Principal": {
    //             "AWS": "arn:aws:iam::941143299627:user/parkview"
    //         },
    //         "Action": [
    //             "s3:PutObject",
    //             "s3:PutObjectAcl"
    //         ],
    //         "Resource": "arn:aws:s3:::parkviewmplsbucket/*",
    //         "Condition": {
    //             "StringEquals": {
    //                 "s3:x-amz-acl": "public-read"
    //             }
    //         }
    //     }]
    // }
});

module.exports = router;