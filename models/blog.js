var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
    catagory: { type: String, unique:true, require:true},
    description: String,
    createdDate: { type: Date, default: Date.now },
    author: {
       id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    },
    blogposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
      }]
});

module.exports = mongoose.model("Blog", BlogSchema);
