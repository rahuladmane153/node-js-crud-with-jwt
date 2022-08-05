const product = require('../models/Product_model');

exports.getProduct = async (req,res) => { 
    if(req.query.id){
        var id = req.query.id;
        product.findOne({_id:id},(err,product)=>{
            if (!err) {
                res.status(200).send({data : product});
            } else {
                res.status(500).send({message: "No Record Found!"}); 
            } 
        });
    }else{ 
        product.find((err, getAllProducts) => {
            if (!err) {
                res.status(200).send({data : getAllProducts});
            } else {
                res.status(500).send({message: "No Record Found!"}); 
            }
        }); 
    }
}

exports.createProduct = async (req,res) => {
    if(req.body){
        if(req.body.product_prize==0){
            res.status(400).send("Product price should be greater than 0");
        } 
        const { product_name, product_prize, expiry_date, quantity, status } = req.body;      
        if(!(product_name && expiry_date && quantity && status)){ 
            res.status(400).send("All input is required");
        }
        try {
            var dublication = await product.findOne({product_name});
            if(dublication){
                res.status(400).send("Product already exists");
            }else{
                const producData = await new product({
                    product_name    : product_name,
                    product_prize   : product_prize,
                    expiry_date     : expiry_date,
                    quantity        : quantity,
                    discount        : req.body.discount,
                    status          : status
                });
                producData.save();
                res.status(200).send({message : "Product Save Successfully"});
            }
        } catch (error) {
            console.log(error)
        }
    }else{ 
        res.status(400).send("All is required");
    } 
}

exports.updateProduct = async (req,res) => { 
    if(req.query.id){
        product.updateOne(
            { _id: req.params.id }, 
            { 
                product_name: req.body.product_name, 
                product_prize: req.body.product_prize,
                expiry_date: req.body.expiry_date,
                quantity: req.body.quantity,
                discount: req.body.discount,
                status: req.body.status 
            },(err)=> {
                if (!err) {
                    res.status(200).send("Successfully updated the selected user."); 
                }else{
                    res.status(500).send({message: "Error occured during updateing data " +err});  
                }   
            }
        ); 
    }else{
        res.status(400).send("Id required");  
    }
}

exports.deleteProduct = async (req,res) => {
    if(req.query.id){ 
        var id = req.query.id;
        product.findByIdAndDelete(id,(err)=>{
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