const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect(process.env.MONGO_URL).then(
    console.log(`${chalk.green('successfully connected to the database')}`)
).catch((err)=>{
    console.log(`${chalk.red('failed to connect to the database')}`);
    console.log(err);
})

module.exports = mongoose