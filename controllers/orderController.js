const order = require('../models/order_model');
const product = require('../models/Product_model');

exports.getOrder = async (req,res) => { 
    if(req.query.id){
        var id = req.query.id;
        order.findOne({_id:id},(err,order)=>{
            if (!err) {
                res.status(200).send({data : order});
            } else {
                res.status(500).send({message: "No Record Found!"}); 
            } 
        });
    }else{ 
        order.find((err, getAllorders) => {
            if (!err) {
                res.status(200).send({data : getAllorders});
            } else {
                res.status(500).send({message: "No Record Found!"}); 
            }
        }); 
    }
}

exports.createOrder = async (req,res) => {
    if(req.body){
        if(req.body.order_price==0){
            res.status(400).send("Order price should be greater than 0");
        } 
        const { user_id, product_id, status } = req.body;      
        if(!(user_id && product_id && status)){ 
            res.status(400).send("All input is required");
        }
        try {
            var discount = await product.findOne({_id:product_id});
            var product_discount = discount.discount;
            var pro_price = discount.product_prize;
            if(product_discount != 0){                
               var pro_price_dis = (product_discount/100 * discount.product_prize);
               pro_price = discount.product_prize - pro_price_dis;
            }
            const orderData = await new order({
                user_id     : user_id,
                product_id  : product_id,
                order_price : pro_price,
                status      : status
            });
            orderData.save();
            res.status(200).send({message : "order Save Successfully"});
     
        } catch (error) {
            console.log(error)
        }
    }else{ 
        res.status(400).send("All is required");
    } 
}

exports.updateOrder = async (req,res) => { 
    if(req.body.id){
        order.updateOne(
            { _id: req.body.id }, 
            { 
                user_id     : req.body.user_id,
                product_id  : req.body.product_id,
                order_price : req.body.order_price,
                status      : req.body.status
            },(err)=> {
                if (!err) {
                    res.status(200).send("Successfully updated the selected order."); 
                }else{
                    res.status(500).send({message: "Error occured during updateing data " +err});  
                }   
            }
        ); 
    }else{
        res.status(400).send("Id required");  
    }
}

exports.deleteOrder = async (req,res) => {
    if(req.body.id){ 
        var id = req.body.id;
        order.findByIdAndDelete(id,(err)=>{
            if(err){
                res.status(200).send("No Matching Records",err);
            }else{
                res.status(200).send("Record Deleted Successfully");
            }
        });
    }else{ 
        res.status(400).send("Id required");
    }
}