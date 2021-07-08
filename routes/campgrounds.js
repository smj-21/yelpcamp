var express = require('express');
var router = express.Router();
var campground = require("../models/campground");

// render the campground page
router.get("/",function(req,res){  
    // Getting campgrounds from db
    campground.find({},function(err,campground){
        if(err){
            console.log("Error in getting camps fro DB!");
        }
        else{
            res.render("campgrounds/index", {camp:campground, currentUser: req.user});
        }
    });
     
});

//posting new campground
router.post("/",isLoggedIn, function(req,res){
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, img: img, description: description, author: author};
    campground.create(newCamp, function(err,campground){
        if(err){
            console.log("Error posting camp!");
        }
        else{
            res.redirect("/campground");                
        }
    });
   

});

//getting data of new campground from a new form page
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// Showing campground page in detail

router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
            console.log("camp not found!");
        }
        else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
    
});

function isLoggedIn(req, res, next){ 
    if(req.isAuthenticated()){
        return next(); //short circuit  by return
    }
    res.redirect("/login");

}

module.exports = router;