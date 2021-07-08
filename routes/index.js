var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

// ==========================================
// LANDING ROUTE-render the front landing page
// ==========================================
router.get("/",function(req,res){
    res.render("landing");
});



// =============================
// AUTHORIZATION ROUTES
// =============================

//Register form
router.get("/register",function(req,res){
    res.render("register");
});

//Posting data from form
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campground");
        });//passport.authenticate ends here

    });//user.register ends here

});//app.post ends here

// Get data from login page
router.get("/login",function(req,res){
    res.render("login");    
});

// Post data from login form and login logic
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    })
    , function(req,res){
     
});

// Logout route
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campground");
})

// Middleware to check if loggedIn
// This can be used on any page if we want user to be logged in to access it
// For this just put it in the route as a middleware

function isLoggedIn(req, res, next){ 
    if(req.isAuthenticated()){
        return next(); //short circuit  by return
    }
    res.redirect("/login");

}

module.exports = router;