const mongoose = require("mongoose");

const PostModel = mongoose.model("Post", mongoose.Schema({
    title: { type: String },
    content: { type: String },
    votes: { type: Number, default: 0}
}))

module.exports = PostModel