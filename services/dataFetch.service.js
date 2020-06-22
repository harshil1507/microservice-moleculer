const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongo");
const PostSchema = require('../schema/posts.schema');
const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify : false,  
    socketTimeoutMS: 45000,
    keepAlive: true});

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
        createPost(content, votes){
            const model = mongoose.model('post',PostSchema)
            const newPost = new model({content : content, votes : 999});
            console.log(newPost);
            console.log(mongoose.connection.readyState);
            newPost.save( function (err,res){
                if(err){
                    throw err 
                }
                return res;
            });               
        }
    }
}