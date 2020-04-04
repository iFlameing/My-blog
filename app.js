const express               =    require("express"),
      bodyParser            =    require("body-parser"),
      expressSanitizer      =    require("express-sanitizer"),
      methodOverride        =    require("method-override"),
      mongoose              =    require("mongoose"),
      User                  =    require("./models/user"),
      passport              =    require("passport"),
      LocalStrategy         =    require("passport-local"),
      Blog                  =    require("./models/blog"),
      blogroutes            =    require("./routes/blog"), 
      passportLocalMongoose =    require("passport-local-mongoose");



    
      mongoose.connect('mongodb+srv://enter your password and file@graphql-rvmhm.mongodb.net/test?retryWrites=true&w=majority', {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useNewUrlParser: true
      });
//Initialising passport and settings passport to use.

var app=express()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSanitizer());
app.use(methodOverride("_method"))
app.use(require("express-session")({
  secret: "We are the best",
  resave: false,
  saveUninitialized: false
}));

//setting up  passport to use  in the  application.

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This middleware provides current user in all the routes.
app.use(function(req, res, next){
  res.locals.currentUser=req.user;
  next();
})
app.use("/",blogroutes);


//This is my port number for connection.
app.listen(3000,function(){
  console.log("server is ready for connection");
})
