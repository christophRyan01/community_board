const mongoose = require('mongoose');
const Events = require('./events')

const futureSchema = new mongoose.Schema({
    title: {type: String, required:true},
    location: {type: String, required:true},
    date: {type:String, require:true},
    cost: {type: String, required: false},
    body: {type: String},
    img: String
});

const Future = mongoose.model('Future', futureSchema)

module.exports = Future;