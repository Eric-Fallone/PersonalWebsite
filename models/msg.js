var mongoose = require("mongoose");

var MsgSchema = new mongoose.Schema({
    msg: String,
    isEric:Boolean
});

module.exports = mongoose.model("Msg", MsgSchema);
