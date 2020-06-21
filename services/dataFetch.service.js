const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongo");
const PostSchema = require('../schema/posts.schema');
const mongoose = require('mongoose')
require('dotenv').config();

module.exports = {
    name : "fetch-posts",
    mixins : [DbService],
    adapter : new MongooseAdapter(process.env.MONGO_URL),
    collection : 'posts',
    model : PostSchema,

    actions : {

        createPost: {
            rest : {
                method : "POST",
                path : "/create",
            },

            async handler(ctx){
                return await this.createPost(ctx.params.content, ctx.params.votes)
            }
        }
    },

    methods : {
        createPost(content, votes = 0 ){
            const PostModel = mongoose.model("Post", PostSchema);
            const newPost = new PostModel({content : content, votes : votes ||0});
            console.log(newPost);
            console.log(mongoose.connection.readyState);
            newPost.markModified('votes');
            newPost.save( function (err,res){
                if(err){
                    console.log(err,1);
                    return 
                }
                console.log(2)
                return res;
            });               
        }
    }
}