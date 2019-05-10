var Post = require('../models/post');
var Blog = require('../models/blog');

module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
  },
  checkUserPost: function(req, res, next){
    Post.findOne({title: req.params.title}, function(err, foundPost){
      if(err || !foundPost){
          console.log(err);
          req.flash('error', 'Sorry, that blog post does not exist!');
          res.redirect('/blog/' + req.params.catagory);
      } else if(foundPost.author.id.equals(req.user._id) || req.user.isAdmin){
          req.post = foundPost;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/blog/' + req.params.catagory);
      }
    });
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'You must be an admin to do that!');
      res.redirect('back');
    }
  }
}
