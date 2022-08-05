const auth = require('../models/Auth_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.register = async (req,res) => {

    if(req.body){
        const {firstname,lastname,email,mobile,password} = req.body;
         // Validate user input
        if (!(email && password && firstname && lastname && mobile)) {
            res.status(400).send("All input is required");
        }
        try {
            var duplicate = await auth.findOne({email});
            if(duplicate){
                res.status(400).send("User is already register,Please Login");
            }else{
                var encPass = await bcrypt.hash(password,10);
                const user_register = await auth({
                    "firstname":firstname,
                    "lastname":lastname,
                    "mobile":mobile,
                    "email" :email.toLowerCase(),
                    "password": encPass,
                    "showpass" :password
                }); 
                await user_register.save();
                console.log(user_register);
                res.send("Saved Successfully");
            }
            
        } catch (error) {
            console.log(error);
        }

    }else{
        res.status(401).send({message:"All fields are required"});
    }    
}

exports.login = async (req,res) => {
    if(req.body){
        const {email,password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        try {
            const getUser = await auth.findOne({email});
            if(getUser && (await bcrypt.compare(password, getUser.password))){
                const token = jwt.sign({email: getUser.email},process.env.TOKEN_KEY,{expiresIn:"1h"});

                const userData = {getUser,token}

                res.status(200).json(userData);
            }else{
                res.status(400).send("Invalid Credentials");
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(401).send({message:"All fields are required"});
    }
}

exports.forgetPassword = async (req,res) => {
    if(req.body){
        const {email,new_password} = req.body;
        if (!(email && new_password)) {
            res.status(400).send("All input is required");
        }
        try {
            const getUser = await auth.findOne({email});
            if(getUser){
                var encPass = await bcrypt.hash(new_password,10);
                const user_forget = await auth.findByIdAndUpdate(getUser._id,{
                    "password": encPass,
                    "showpass" :new_password
                });
                await user_forget.save();
                res.send("Password Reset Successfully");

            }else{
                res.status(400).send("Invalid Credentials");
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(401).send({message:"All fields are required"});
    }
}

exports.resetPassword = async (req,res) => {
    if(req.body){
        const {email,password,new_password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        try {
            const getUser = await auth.findOne({email});
            if(getUser && (await bcrypt.compare(password, getUser.password))){
                var encPass = await bcrypt.hash(new_password,10);
                const user_reset = await auth.findByIdAndUpdate(getUser._id,{
                    "password": encPass,
                    "showpass" :new_password
                });
                await user_reset.save();
                res.send("Password Changed Successfully");
            }else{
                res.status(400).send("Invalid Credentials");
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(401).send({message:"All fields are required"});
    }
}
