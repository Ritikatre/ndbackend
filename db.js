const mongoose = require('mongoose');

// "mongodb://localhost:27017/" <- Connection String available at mongo Compass
const mongoUrI = "mongodb+srv://ritikatre:Rtk2Mongodb@narmadiya.5babnpx.mongodb.net/test" // nduser is database name 
 
const connectToMongo = ()=>{
  
    mongoose.connect(mongoUrI, ()=> {

        console.log("Connected To Mongo Successfully!");
    })
}
module.exports =  connectToMongo; 