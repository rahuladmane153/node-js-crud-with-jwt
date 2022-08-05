const mongoose = require('mongoose');

const auth_schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mobile: Number,
    email: String,
    password: String,
    showpass: String,
    status: {type:String,enum:["Active","Block"],default:"Active"}
},{
    timestamps: true
});

const auth_model = mongoose.model("user_authentication",auth_schema);
module.exports = auth_model;