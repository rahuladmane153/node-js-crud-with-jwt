const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const multer = require('multer');  

dotenv.config({path:'config.env'});
const port = parseInt(process.env.PORT) || 8080;

require('./db/connect');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json());

app.use('/',require('./routes/router'))
app.listen(port, () =>{
  console.log(`server running on : http://localhost:${port}`);
})
  
