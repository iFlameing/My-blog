const  express            =      require("express") ,
       User               =      require("../models/user.js"),
       Blog               =      require("../models/blog.js"),
       router             =      express.Router(),
//     middleware         =      require("../middlewareObj/ware")
       passport           =      require("passport");



     router.get("/",function(req,res){
        res.redirect("/blogs");
      })
      router.get("/blogs",function(req,res){
        Blog.find({},function(err,blogs){
          if(err){
            console.log("You got an error");
          }
          else {
            res.render("index",{blogs:blogs})
      
          }
        })
      })
      
      
      
      router.get("/blogs/new",isLoggedIn,function(req,res){
        res.render("new")
      })
      
      //This is my route for blog posting
      router.post("/blogs",function(req,res){
        var author ={
          id:req.user._id,
          username:req.user.username
        }
        req.body.blog.body=req.sanitize(req.body.blog.body)
        req.body.blog.author=author;
        Blog.create(req.body.blog,function(err,newBlog){
          if(err){
            console.log(err);
          }
          else {
            User.findOne({username:req.user.username},function(error,foundUser){
              foundUser.blog.push(newBlog);
              foundUser.save()
            })
            res.redirect("/blogs")
          }
        })
      })
      
      //This is my router for read more
      router.get("/blogs/:id",function(req,res){
        Blog.findById(req.params.id,function(err,foundBlog){
          if(err){
            res.redirect("/blogs");
          }
          else {
            res.render("show",{blog:foundBlog});
          }
        })
      })
      
      //This is my router for edit form
      router.get("/blogs/:id/edit",function(req,res){
        Blog.findById(req.params.id,function(err,update){
          if(err){
            res.redirect("/blogs")
          }
          else {
            res.render("edit",{blog:update});
          }
        })
      })
      
      //This is my put method for edit 
      router.put("/blogs/:id",function(req,res){
        req.body.blog.body=req.sanitize(req.body.blog.body)
        Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updaate){
          if(err){
            res.redirect("/blogs/"+req.params.id);
      
          }
          else {
            res.redirect("/blogs/"+req.params.id);
          }
        })
      })
      
      //This is my authentication route
      router.get("/login",function(req,res){
        res.render("login")
      })
      
      router.get("/register",function(req,res){
        res.render("register");
      })
      
      router.post("/register", function(req, res){
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            }
            passport.authenticate("local")(req, res, function(){
               res.redirect("/blogs");
            });
        });
      });
      
      
      router.post("/login", passport.authenticate("local", {
        successRedirect: "/blogs",
        failureRedirect: "/login"
      }) ,function(req, res){
      });
      
      
      
      
      //This is my router for delete method 
      router.delete("/blogs/:id",function(req,res){
        Blog.findByIdAndRemove(req.params.id,function(err){
          if(err){
            res.redirect("/blogs")
          }
          else {
            res.redirect("/blogs")
      
          }
        })
      })
      
      //middleware to check whether a person is logged in or not
      function isLoggedIn(req, res, next){
        console.log(req.body);
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
      }
      
      
      function checkOwnership(req, res, next){
        console.log(req.body);        
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

      
      router.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
      });


module.exports=router;
      