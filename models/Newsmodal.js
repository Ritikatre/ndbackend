const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
   // for user specific news
     user : {
        type : mongoose.Schema.Types.ObjectId,
       ref : 'user'
     },   // this for associating news to there specific user : using foreign key type logic
     title:{
        type: String
     },
     description:{
        type: String
     },
     tag:{
        type: String,
        default : "General",
     },
     date:{
        type: Date,     
        default: Date.now
      },
     publisher:{
        type: String,
        require: true
     },

});
module.exports = mongoose.model('news', NewsSchema);