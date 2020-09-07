var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Operator = require("../models/operator");
var middleware = require("../middleware");
var { isLoggedIn,checkUserPost, isAdmin} = middleware;

router.get("/", function(req,res){

  Operator.find({},function(err, allOperatorsfound){
  if(err){
    console.log(err);
  } else{
    res.render("rainbow/index",{allOperators: allOperatorsfound});
  }
  });
});

router.get("/new", isLoggedIn, function(req,res){
  res.render("rainbow/new");
});

router.post("/", isLoggedIn, function(req, res){
  if(req.body.Operator == ""){
    req.flash('error', "You left the operator blank you big dumb dumb!");
    res.redirect("back");
    return;
  }
  if(req.body.imgsource == ""){
    req.flash('error', "You left the image blank you big dumb dumb!");
    res.redirect("back");
    return;
  }

  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newOperator = {
    name: req.body.Operator,
    imagelink:req.body.imgsource,
    hardcounters:req.body.hardcounters,
    softcounters:req.body.softcounters,
    other:req.body.other,
    author: author
  };

  Operator.create(newOperator, function(err, newlycreated) {
    if(err){
      console.log(err);
    }else{
      res.redirect("/rainbow")
    }
  });
});

router.get("/:Operator/edit",isLoggedIn,  function(req, res){
  Operator.findOne({name:req.params.Operator},function(err, OperatorFound){
    if(err){
      console.log(err);
    } else{
      res.render("rainbow/edit",{operator:OperatorFound});
    }
  });
});

router.put("/:Operator/edit",isLoggedIn, function(req, res){

  var newOperator = {
    name: req.body.Operator,
    imagelink:req.body.imgsource,
    hardcounters:req.body.hardcounters,
    softcounters:req.body.softcounters,
    other:req.body.other
  };

  Operator.findOneAndUpdate({name:req.params.Operator}, {$set: newOperator}, function(err, houseObject){
      if(err){
          console.log(err.message);
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          req.flash("success","Successfully Updated!");
          res.redirect("/rainbow/");
      }
  });
});

router.delete("/:Operator", isLoggedIn, function(req, res){

  Operator.deleteOne({name:req.params.Operator},function(err) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/rainbow/');
        } else {
            req.flash('success', 'Operator deleted');
            res.redirect('/rainbow/');
        }
      })
});




module.exports = router;
