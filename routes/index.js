var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var emailer = require("../public/scripts/notifications/email.js")

router.get("/", function(req,res){
  res.render("landing");
});

router.get("/register", function(req,res){
  res.render("register");
});

router.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
    if(req.body.adminCode === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect("/");
        });
    });
});

router.get("/login", function(req,res){
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true,
    successFlash:"Login successful"
  }), function(req,res){
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success","by have a wonderful time");
  res.redirect("/");
});

router.get("/contact", function(req,res){
  res.render("contact");
});

router.post("/contact",   function(req, res){
  email = {
    first:req.body.first,
    last:req.body.last,
    email:req.body.email,
    message:req.body.emailmsg,
    telephone:req.body.tele,
    company:req.body.company
  };
  emailer.sendEmail(email);
  req.flash("success","Email sent");
  res.redirect("/");
});

router.get("/c/:company", function(req,res){
  res.render("company");
});

module.exports = router;
