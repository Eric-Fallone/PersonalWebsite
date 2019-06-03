var express = require("express");
var router  = express.Router();
var Blog = require("../models/blog");
var Post = require("../models/post");
var User = require("../models/user");
var middleware = require("../middleware");
var { isLoggedIn,checkUserPost, isAdmin} = middleware;

//new
router.get("/newblog", isLoggedIn, isAdmin, function(req,res){
  res.render("blog/newblog");
});

//create
router.post("/newblog", isLoggedIn, isAdmin, function(req, res){

  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newBlog = {catagory: req.body.title, description: req.body.description, author: author}

  Blog.create(newBlog, function(err, newlycreated) {
    if(err){
      console.log(err);
    }else{
      res.redirect("/blog/"+req.body.title)
    }
  });
});

router.get("/masterchat", isLoggedIn, isAdmin, function(req, res){
  User.find().populate("chatmsgs").exec( function(err, allUsers){
    if(err){
      console.log(err);
    } else{
      res.render("admin/masterchat",{allUsers:allUsers});
    }
  });
});

module.exports = router;
