var express = require('express');
var router = express.Router({mergeParams: true}); //New code-merging params here
var campground = require("../models/campground");
var Comment = require("../models/comment");

// =============================
// COMMENTS ROUTES
// =============================

router.get("/new",isLoggedIn, function(req,res){//New-Middle ware used to check if user logged in in order to get comment form
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});
        }
    });
});

router.post("/",isLoggedIn, function(req,res){ //New-comment can be posted via postman hence middleware used
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){console.log(err);}
                else{
                    //New code
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment with user details
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/"+ campground._id);
                }
            });//comment.create ends here
        }//else ends here
    })
    
}); //app.post ends here

function isLoggedIn(req, res, next){ 
    if(req.isAuthenticated()){
        return next(); //short circuit  by return
    }
    res.redirect("/login");

}

module.exports = router;