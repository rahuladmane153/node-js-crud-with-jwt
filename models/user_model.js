const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    mobile : {
        type : Number,
        required : true,
        unique : true,
    },
    address : {
        type : String,
        required : true, 
    },
    status:{
        type : String
    }
});

const users = mongoose.model('users',schema);
module.exports = users;