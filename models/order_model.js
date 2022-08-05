const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
        user_id: String,
        product_id : String,  
        order_price : Number,      
        status : {type:String, enum:["Pending","Delivered","Cancelled"], default:"Pending"},
    },{
        timestamps: true
});

const orderSchema = mongoose.model("mst_order",OrderSchema);
module.exports = orderSchema;