const mongoose = require('mongoose');
const { Schema } = mongoose;

const CensusSchema = new Schema({
   // for user specific news
     user : {
        type : mongoose.Schema.Types.ObjectId,
       ref : 'user'
     },   // this for associating news to there specific user : using foreign key type logic
     name:{
        type: String
     },
     gender:{
        type: String
     },
     dob:{
        type: String    
     },
     age:{
        type: String

     },
     blood:{
        type: String
     },
     email:{
        type: String
     },
     phone:{
        type: String
     },
     marital:{
        type: String
     },
     mother:{
        type: String
     },
     father:{
        type: String
     },
     grandFather:{
        type: String
     },
     spouse:{
        type: String
     },
     dependent:{
      type: String
   },
   income:{
      type: String
   },
     unemployed:{
        type: String
     },
     familyCount:{
        type: String
     },
     children:{
        type: String
     },
     
     nri:{
        type: String
     },
     gotra:{
        type: String
     },
     kuldevi:{
        type: String
     },
     kuldevta:{
        type: String
     },
     howyouknow:{
        type: String
     },
     native:{
        type: String
     },
     permanentAddress:{
        type: String
     },
     currentAddress:{
        type: String
     },
     vichar:{
        type: String
     },
     remark:{
        type: String
     },
     date:{
        type: Date,     
        default: Date.now
      },
  

});
module.exports = mongoose.model('census', CensusSchema);