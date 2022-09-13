
const multer = require('multer')
const productModel = require('../models/product')
const objectId = require('mongoose').Types.ObjectId
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images')
    },
    filename:(req, file, cb)=>{

        cb(null, Date.now().toString() + '_' + file.originalname.trim())
    }
})
const upload = multer({ storage: fileStorageEngine})
const fileHelper = require('../helpers/deleteFile')
const s3Helper = require('../helpers/s3')

module.exports = {
    getAllProduct:async(req, res)=>{
        await productModel.find({}).lean().then((products)=>{
            res.render('allProducts', {products})
        }).catch((err)=>{
            res.send('error occured at getallproducts')
            throw err
        })
    },
    addProductHome:(req, res)=>{
        res.render('addProducts')
    },
    addProduct:async(req, res)=>{

        const { name, price } = req.body
        console.log(req.file);
        image = req.file.filename

        const product = new productModel({
            name:name,
            price:price,
            image:image
        })
        await product.save().then((result)=>{
            res.redirect('/product/add')
        }).catch((err)=>{
            const imagePath = __dirname + '\\..\\images\\' + req.file.filename.trim()
            fileHelper.deleteFile(imagePath).then((result)=>{
                res.send('product addition cannot be completed due to unknown error')
            }).catch((error)=>{
                res.send('err occured at promise of file handling at adding product');
                console.log('err from fileHelper\n');
                console.log(error);
            })
            console.log('err from database\n');
            console.log(err);
        })
    },
    deleteProduct:async(req, res)=>{
        const { id, image } = req.body
        const imagePath = __dirname + '\\..\\images\\' + image
        fileHelper.deleteFile(imagePath).then((result)=>{
            productModel.deleteOne({_id:objectId(id)}).then((result)=>{
                return res.redirect('/product/all')
            }).catch((err)=>{
                if(err){
                    res.send('err occured at database product deletion')
                    console.log(err);
                }
            })
        }).catch((err)=>{
            res.send('err occured at promise of file handling');
            console.log(err);
        })
    },
    uploadtos3Home:async(req, res)=>{
        res.render('s3test')
    },
    uploadtos3:async(req, res)=>{
        // console.log(req.file);
        // const result = await s3Helper.uploadS3(req.file)
        // console.log(result);
        // res.send('im at s3 post')

        console.log(req.file);
        s3Helper.uploadS3promise(req.file).then((result)=>{
            console.log(result);
            
            const imagePath = __dirname + '\\..\\images\\' + req.file.filename
            
            fileHelper.deleteFile(imagePath).then((result2)=>{
                console.log(result.key);
                res.send('successfully completed all procedure '+result.key);
            }).catch((err)=>{
                res.send('some err occured to complete every procedure')
            })
        }).catch((err)=>{
            console.log("err occured myr \n", err);
            res.send('some internal error')
        })
    },
    readFromS3:(req, res)=>{
        key = req.params.key
        console.log(key);
        s3Helper.readFromS3(key).then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err);
            res.send('internal err')
        })
    },
    directToS3Home:(req, res)=>{
        res.render('direcTtoS3')
    },
    directToS3:(req, res)=>{
        s3Helper.directToS3(req.file).then((result)=>{
            console.log(result);
            res.send('k')
        }).catch((err)=>{
            console.log(err);
            res.send(err)
        })
    },directGetS3:(req, res)=>{
        s3Helper.directGetS3(req).then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err);
            res.send(err)
        })
    },
    upload:upload
}