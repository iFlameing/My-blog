const Blog=require("../models/blog")

const middlewareObj={};

function checkOwnership(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundblog){
            if(err){
                console.log(err)
                res.redirect("back");
            }
            else{
                if(foundblog.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log("you are not the right user");

                }
            }
        })
    }
    else{
        console.log("please log in before edit/delete");
        res.redirect("/blogs");
    }

}

module.exports=middlewareObj;