const mongoose = require('mongoose');
const { Schema } = mongoose; // schema include from mongoose official docs

const UserSchema = new Schema({
   
     email:{
      type: String,
      require : true
   },
     password:{
        type: String,
        require : true
     },
     aadhar:{
      type: String,
      require : true,
      unique: true
   },
    phone:{
    type: String,
    require : true,
    unique: true
   },
     date:{
      type: Date,
      default: Date.now
   },

});
const User = mongoose.model('User', UserSchema);    
User.createIndexes(); // for crearting seperate indexes in database for checking unique values
module.exports = User;