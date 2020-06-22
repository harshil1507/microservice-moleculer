const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:  String,
    content: String ,
    votes: { type: Number, default: 0}
});

module.exports = PostSchema;