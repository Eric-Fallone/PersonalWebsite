var mongoose = require("mongoose");

var OperatorSchema = new mongoose.Schema({
    name:{ type: String, unique:true, require:true},
    imagelink:String,
    hardcounters:String,
    softcounters:String,
    other:String,
    createdDate: { type: Date, default: Date.now },
    author: {
       id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    }
});

module.exports = mongoose.model("Operator", OperatorSchema);
