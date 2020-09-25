const mongoose = require('mongoose');

const eventsSchema= new mongoose.Schema({
    title: {type: String, required:true},
    location: {type: String, required:true},
    date: {type:String, require:true},
    cost: {type: String, required: false},
    body: {type: String},
    img: String
});

const Today = mongoose.model('Today', eventsSchema)

module.exports = Today;