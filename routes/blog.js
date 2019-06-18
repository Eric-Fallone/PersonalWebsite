var express = require("express");
var router  = express.Router();
var Blog = require("../models/blog");
var Post = require("../models/post");
var middleware = require("../middleware");
var { isLoggedIn,checkUserPost, isAdmin} = middleware;


//index
router.get("/:catagory", function(req, res){
  Blog.findOne({catagory: req.params.catagory}).populate("blogposts").exec( function(err,blogObject){
    if(err){
      console.log(err);
    } else{
      res.render("blog/index",{catagory: req.params.catagory ,allPosts:blogObject});
    }
  });
});
//new
router.get("/:catagory/new",isLoggedIn, function(req,res){
  res.render("blog/new",{catagory: req.params.catagory});
});
//create
router.post("/:catagory", isLoggedIn, function(req, res){

  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newPost = {catagory: req.params.catagory, title: req.body.title, imgsource: req.body.imgsource, quote: req.body.quote, text: req.body.blogText, author: author};
  Blog.findOne({catagory: req.params.catagory}, function(err,blog){
    if(err){
      console.log(err);
    } else{
      Post.create(newPost, function(err, newlycreated) {
        if(err){
          console.log(err);
        }else{
          blog.blogposts.push(newlycreated._id);
          blog.save();
          newlycreated.save();
          res.redirect("/blog/"+req.params.catagory)
        }
      });
    }
  });

});

//show
router.get("/:catagory/:title", function(req, res){
  Post.findOne({title:req.params.title} , function(err,foundPost){
    if(err || !foundPost){
      //console.log(err);
    } else{
      res.render("blog/show",{catagory: req.params.catagory ,post:foundPost});
    }
  });
});

//edit
router.get("/:catagory/:title/edit",isLoggedIn,checkUserPost, function(req, res){
  res.render("blog/edit",{catagory: req.params.catagory ,post:req.post});
});
//update
router.put("/:catagory/:title/edit",isLoggedIn,checkUserPost, function(req, res){
  var newData = {imgsource: req.body.imgsource, quote: req.body.quote, text: req.body.blogText};
  
  Post.findOneAndUpdate({title:req.params.title}, {$set: newData}, function(err, post){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          req.flash("success","Successfully Updated!");
          res.redirect("/blog/"+ post.catagory+"/" + post.title);
      }
  });
});
//delete
router.delete("/:title", isLoggedIn,checkUserPost, function(req, res){
  var cata =  req.post.catagory;
  var post_id = req.post._id;
  console.log(post_id);
  console.log("----------------------------------------------");
  Blog.findOneAndUpdate(cata, {$pull: {blogposts:post_id}},function(err,b){
    console.log(b);
  });

  Post.deleteOne({_id:post_id},function(err) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
          console.log("meow");
            req.flash('success', 'Blog deleted!');
            res.redirect('/blog/'+cata);
        }
      })
});
//

module.exports = router;
