var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        img: "https://unsplash.com/photos/gcCcIy6Fc_M/download?force=true&w=1920",
        description: "Spend your time in between the beautiful clouds. Heavenly!! This adventure camp acts as a magnet for those who are seeking to get away from the monotony of life. Just imagine sitting in the surroundings of this beautiful place, waiting to the melodious chirps of birds, and the fresh aura finding its way to your heart as you step out to start your day. It offers several activities to its guests. Cycling, day treks, jeep safaris, nature walks, and rappelling are just a few of the thrilling experiences that one can embrace here"
    },
    {
        name: "Blue Creek",
        img: "https://unsplash.com/photos/Ekl9AXrY5-0/download?force=true&w=1920",
        description: "Spend your time in between the beautiful clouds. Heavenly!! This adventure camp acts as a magnet for those who are seeking to get away from the monotony of life. Just imagine sitting in the surroundings of this beautiful place, waiting to the melodious chirps of birds, and the fresh aura finding its way to your heart as you step out to start your day. It offers several activities to its guests. Cycling, day treks, jeep safaris, nature walks, and rappelling are just a few of the thrilling experiences that one can embrace here"
    },
    {
        name: "Drew Hills",
        img: "https://unsplash.com/photos/mzZVGFfMOkA/download?force=true&w=1920",
        description: "Spend your time in between the beautiful clouds. Heavenly!! This adventure camp acts as a magnet for those who are seeking to get away from the monotony of life. Just imagine sitting in the surroundings of this beautiful place, waiting to the melodious chirps of birds, and the fresh aura finding its way to your heart as you step out to start your day. It offers several activities to its guests. Cycling, day treks, jeep safaris, nature walks, and rappelling are just a few of the thrilling experiences that one can embrace here"
    }
]

function seedDB(){
    //Remove campgrounds
    campground.remove({},function(err){


        if(err){console.log("Error found!");}
        console.log("campgrounds removed!")
        //Add new campgrounds
        data.forEach(function(seed){
            campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                        console.log("added a new campground");
                        //Create same comment for each camp
                        Comment.create({
                            text: "This place is great but i wish there was internet",
                            author: "Jordan"
                        },function(err,comment){
                            if(err){console.log(err);}
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment!");
                            }
    
                         });//Create same comment for each camp
                        
                    }   
            });             //campground.create ends here
        });                //for each ends here
    });                    //campground.remove ends here
    
}                          //function ends here

module.exports = seedDB; 
