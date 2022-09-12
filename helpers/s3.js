require('dotenv').config()
const S3 = require('aws-sdk').S3
const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')

const s3 = new S3({
    region:process.env.AWS_BUCKET_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY
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
    }
}