var mongoose = require('mongoose');
const url = 'mongodb+srv://shriram_bhadang:pass123@cluster0.gfyzhnx.mongodb.net/db_rahul';

mongoose.connect(url, () =>{
    try {
      console.log("DB connected");
    } catch (error) {
      console.log(error);
    }
})

