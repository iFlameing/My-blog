const mongoose=require("mongoose");
const passportLocalmongoose= require("passport-local-mongoose");
const Blog = require("./blog.js")

UserSchema=new mongoose.Schema({
  username:String,
  password:String,
  blog:[
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
   }
  ]
})

UserSchema.plugin(passportLocalmongoose);

var User=mongoose.model("User",UserSchema)

module.exports = User;
