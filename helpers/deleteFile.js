const fs = require('fs')

module.exports = {
    deleteFile:(filePath)=>{
        return new Promise(async(resolve, reject)=>{
            fs.unlink(filePath, (err, result)=>{
                if(err){
                    console.log('err');
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }
}