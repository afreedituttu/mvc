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

module.exports = {
    getAllProduct:async(req, res)=>{
        await productModel.find({}).lean().then((products)=>{
            console.log(products);
            res.render('allProducts', {products})
        }).catch((err)=>{
            res.send('error occured')
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
            throw err
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
    deleteProduct:(req, res)=>{
        const { image, productid } = req.body

        const imagePath = __dirname + '/images' + '/' + image
        fs.unlink(imagePath, (err, result)=>{
            if(err) return res.send('err occured')
        })
        
        productModel.deleteOne({_id:objectId(productid)}).then((err, result)=>{
            if(err){
                res.send('error occured during product delete')
                throw err;
            }
            return res.send('product deleted')
        })
    },
    upload:upload
}