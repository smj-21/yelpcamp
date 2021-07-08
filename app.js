
var express =     require('express'),
    app =         express(),
    bodyParser =  require('body-parser'),
    mongoose =    require('mongoose'),
    passport =    require('passport'),           //New code
    LocalStrategy = require('passport-local'), //New code
    campground =  require('./models/campground'),
    Comment =     require("./models/comment"),
    seedDB =      require('./seeds'),
    User =        require('./models/user.js')     
    campground =  require('./models/campground');

const comment = require('./models/comment');
var commentRoutes    = require('./routes/comments'),
    indexRoutes      = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelp_camp_v5");
// mongoose.connect("mongodb+srv://smj:deadlift@cluster0.clbpq.mongodb.net/yelpcamp?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://yelpcamp:deadlift@cluster0.lqxzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");



// seedDB();

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public")); 


// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Ben",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());;
passport.deserializeUser(User.deserializeUser());;

//Middleware to pass currentUser for navbar login/logout/register display 
//whatever function we call in middleware here gets called on every route
app.use(function(req,res,next){
    res.locals.currentUser = req.user; //(stores data of user inside currentUser)= req.user //(requests user);
    next(); //to execute further code
});

app.use(indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes); //Here params is not getting id hence we need to merge it with comments.js



app.listen(process.env.PORT || 3000 || process.env.IP, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });