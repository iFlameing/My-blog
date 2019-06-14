var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/data")


const blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   },
    created:{type:Date,default:Date.now}
               
    })
var Blog = mongoose.model("Blog",blogSchema);

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
  
  var User=mongoose.model("User",UserSchema)


User.create({
    username:"Alok Kumar",
    password:"password"
},function(err,data){
    console.log(data)
})
