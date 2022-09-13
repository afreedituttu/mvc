require('dotenv').config()
const S3 = require('aws-sdk').S3
const crypto = require('crypto')
const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const fs = require('fs')
const sharp = require('sharp')
const multer = require('multer') // for memory storage
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const s3 = new S3({
    region:process.env.AWS_BUCKET_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY
})
const s3ClientModel = new S3Client({
    region:process.env.AWS_BUCKET_REGION,
    credentials:{ 
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    }
})

module.exports = {
    // uploadS3:(file)=>{
    //     filepath = __dirname + '\\..\\images\\' + file.filename
    //     const fileStream = fs.createReadStream(filepath)

    //     const uploadParams = {
    //         Bucket: process.env.AWS_BUCKET_NAME,
    //         Body: fileStream,
    //         Key: file.filename
    //     }

    //     return s3.upload(uploadParams).promise()
    // },
    readFromS3:(req, res)=>{

    },
    uploadS3promise:(file)=>{
        return new Promise(async(resolve, reject)=>{
            filepath = __dirname + '\\..\\images\\' + file.filename
            const fileStream = fs.createReadStream(filepath)

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: fileStream,
                Key: file.filename
            }
            console.log('executed upto s3');
            s3.upload(uploadParams).promise().then((result)=>{
                return resolve(result)
            }).catch((err)=>{
                return reject(err)
            })

        })
    },
    readFromS3:(fileKey)=>{
        return new Promise(async(resolve, reject)=>{
            const downloadParams = {
                Key : fileKey,
                Bucket : process.env.AWS_BUCKET_NAME
            }

            s3.getObject(downloadParams, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            })
        })
    },
    directToS3:(file)=>{
        return new Promise(async(resolve, reject)=>{
            console.log(file);
            const imgName = crypto.randomBytes(16).toString('hex') + file.originalname.toString()
            const buffer = await sharp(file.buffer).resize({height:500,widt: 1000, fit:"contain"}).toBuffer()
            const params = {
                Key : imgName,
                Bucket : process.env.AWS_BUCKET_NAME,
                Body: buffer,
                ContentType:file.mimetype
            }
            const command = new PutObjectCommand(params)
            const result = await s3ClientModel.send(command)
            console.log(result);
        })
    },directGetS3:(file)=>{
        return new Promise(async(resolve, reject)=>{
            const getObjectParams = {
                Bucket : process.env.AWS_BUCKET_NAME,
                Key:"Screenshot 2021-12-21 201304.png"
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3ClientModel, command, {expiresIn:60000})
            if(!url) return reject(url)
            return resolve(url)
        })
    },
    uploadDirect:upload
}