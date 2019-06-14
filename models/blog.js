const mongoose=require("mongoose");
const User    = require("./user.js");
const blogSchema = new mongoose.Schema({
      title:String,
      image:String,
      body:String,
      author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username:String
     },
      created:{type:Date,default:Date.now}
                 
      })
var Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;    
