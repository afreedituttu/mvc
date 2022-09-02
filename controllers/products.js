const multer = require('multer')
const fs = require('fs')
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

module.exports = {
    getAllProduct:async(req, res)=>{
        await productModel.find({}).lean().then((products)=>{
            console.log(products);
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
        image = req.file.filename

        const product = new productModel({
            name:name,
            price:price,
            image:image
        })
        await product.save().then((result)=>{
            res.send('successfully uploaded')
        }).catch((err)=>{
            const imagePath = __dirname + '\\..\\images\\' + req.file.filename.trim()
            console.log(imagePath);
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
        //upload.array('image',3) && req.files for accessing details
        // upload.single('image')(req, {}, (err)=>{
        //     if(err) throw err;
        //     console.log(req.file);
            
        //     const { name, price } = req.body
        //     image = req.file.filename

        //     const product = new productModel({
        //         name:name,
        //         price:price,
        //         image:image
        //     })

        //     await product.save().then((err, result)=>{
        //         if(err) return res.send('error occured while uploading');

        //         res.send('successfully uploaded')
        //     })
        // })
    },
    deleteProduct:async(req, res)=>{
        const { id, image } = req.body
        


        // const imagePath = __dirname + '\\images' + '\\' + image
        const imagePath = __dirname + '\\..\\images\\' + image
        console.log(('here it is : \n\n\n'));
        console.log(imagePath);
        // await fs.unlink(imagePath, (err, result)=>{
        //     if(err){
        //         console.log(err);
        //         return res.send('err occured at file managing');
        //     }
        // })
        fileHelper.deleteFile(imagePath).then((result)=>{
            productModel.deleteOne({_id:objectId(id)}).then((result)=>{
                return res.send('product deleted')
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
    upload:upload
}