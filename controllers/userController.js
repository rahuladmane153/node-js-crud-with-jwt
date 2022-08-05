var user = require('../models/user_model');

//Create and Save New Users

exports.create = (req,res)=>{ 
    const { name, email, status, mobile, address } = req.body;      
    if(!(name && email && status && mobile && address)){ 
        res.status(400).send("All input is required");
    }
    //New user
    const newUser = new user({
        name : name,
        email: email,
        mobile: mobile,
        address: address,
        status : status
    });
    // Save user into database
    // newUser.save(); 
    newUser.save(function(err) {
        if (err) {
          if (err.keyValue.email) {
            // Duplicate email
            return res.status(422).send({ success: false, message: 'email already exist!' });
          }
          if (err.keyValue.mobile) {
            // Duplicate mobile
            return res.status(422).send({ success: false, message: 'mobile already exist!' });
          }
          // Some other error
          console.warn(err);
          return res.status(422).send(err.keyValue.email);
        }
    
        res.json({
          success: true
        });
    }); 
}; 

//Find All User and Find Single User
exports.find = (req,res)=>{ 
    if(req.body.id || req.param.id){
        var id = req.body.id || req.param.id;
        // console.log(id);
        // Fetching a specific employee
        user.findOne({ _id: id},(err, foundEmployees)=> {
            if (foundEmployees) {
                res.status(200).send({data:foundEmployees});
            } else {
                res.status(500).send("No matching users was found!.",err);
            }
        }); 
    }else{
        user.find((err, foundEmployees) => {
            if (!err) {
                res.status(200).send({data : foundEmployees});
            } else {
                res.status(500).send({message: "Error occured during getting data " +err}); 
            }
        });
    }
}; 

//Update User
exports.update =  (req,res)=>{
    user.findByIdAndUpdate(req.body.id , 
        {   
            name: req.body.name, 
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            status: req.body.status

        },(err)=> {
            if (!err) {

                res.status(200).send("Successfully updated the selected user."); 
            }else{
                res.status(500).send({message: "Error occured during updateing data " +err});  
            }   
        }
    ); 
}; 

//Delete User
exports.delete = (req,res)=>{
    user.remove({ _id: req.body.id },(err)=> {
        if (!err) {
            res.send("Successfully user deleted.");
        } else {
            res.send(err);
        }
    });
};  