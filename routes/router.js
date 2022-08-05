const express = require('express');
const route = express.Router();
const loginController = require('../controllers/login');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/jwt_verify');

//User Auth
route.post('/register', loginController.register);
route.post('/login', loginController.login);
route.post('/forgetPassword', loginController.forgetPassword);
route.post('/resetPassword', loginController.resetPassword);


//API for Users
route.post('/api/users', auth, userController.create);
route.get('/api/users', auth, userController.find);
route.put('/api/users', auth, userController.update);
route.delete('/api/users', auth, userController.delete);

//APIS for Products
route.get('/api/product', auth, productController.getProduct);
route.post('/api/product', auth, productController.createProduct);
route.put('/api/product', auth, productController.updateProduct);
route.delete('/api/product', auth, productController.deleteProduct);

//API for Orders
route.post('/api/orders', auth, orderController.createOrder);
route.get('/api/orders', auth, orderController.getOrder);
route.put('/api/orders', auth, orderController.updateOrder);
route.delete('/api/orders', auth, orderController.deleteOrder);


module.exports = route;