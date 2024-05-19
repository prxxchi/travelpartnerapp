const mongoose = require('mongoose');

require('dotenv').config()


const connectToMongo = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/")
    .then(success => console.log('Purvi Connect To Mongo Successfully'))
}


module.exports = connectToMongo;
