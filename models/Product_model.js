const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
        product_name : String,
        product_prize : String,
        expiry_date : {
            type : Date,
            default : Date.now
        },
        quantity : Number,
        discount : Number,        
        status : {type:String, enum:["Active","Block"], default:"Active"},
    
    },{
        timestamps: true
});

const product_model = mongoose.model("mst_product",product_schema);
module.exports = product_model;