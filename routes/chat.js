var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");
var { isLoggedIn,checkUserPost, isAdmin} = middleware;

router.get("/:username",function(req, res){
  User.findOne({username: req.params.username}).populate("chatmsgs").exec( function(err, userObject){
    if(err){
      console.log(err);
    } else{
      res.json({chatmsg:userObject.chatmsgs});
    }
  });
});

module.exports = router;
