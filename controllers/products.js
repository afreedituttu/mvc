const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine})

module.exports = {
    getproducts:(req, res)=>{
        res.send('im at products')
    },
    uploadHome:(req, res)=>{
        res.render('upload')
    },
    upload:(req, res)=>{
        upload.single('image')(req, {}, (err)=>{
            if(err) throw err;

            console.log(req.file);
            res.send('image uploaded successfully')
        })
    }
}