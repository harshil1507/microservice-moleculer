const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongo");
const mongoose = require("mongoose");

module.exports = {
    name : "fetch-posts",
    mixins : [DbService],
    adapter : new MongooseAdapter('mongodb+srv://harshil:harshil@123@cluster0-stbbj.mongodb.net/microservices?retryWrites=true&w=majority'),
    collection : 'posts',
    model: mongoose.model("Post", mongoose.Schema({
        title: { type: String },
        content: { type: String },
        votes: { type: Number, default: 0}
    })),

    actions : {

        findPosts: {
            rest : {
                method : "GET",
                path : "/find",
            },

            async handler(ctx){
                return("fetch-posts.find")
            }
        }
    }
}