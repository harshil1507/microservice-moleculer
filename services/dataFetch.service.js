const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongo");
const PostSchema = require('../schema/posts.schema');
const mongoose = require('mongoose')
const model = mongoose.model('post',PostSchema)

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
        create : false,
        list : false,
        createPost: {
            rest : {
                method : "POST",
                path : "/",
            },

            async handler(ctx){
                let res = await this.createPost(ctx.params.content, ctx.params.votes)
                return res;
            }
        },

        findPost : {
            rest : {
                method : "GET",
                path : "/",
            },

            async handler(ctx){
                let res = await this.findPosts();
                return res;
            }
        }
    },

    methods : {
        createPost(content, votes){
            return new Promise((resolve,reject)=>{
                const newPost = new model({content : content, votes : votes ||0});
                console.log(newPost);
                console.log(mongoose.connection.readyState);
                newPost.save( function (err,res){
                    if(err){
                        reject(err) 
                    }
                    resolve(res);
                });   
            })            
        },

        findPosts(){
           return new Promise((resolve,reject)=>{
            let posts = model.find({},(err,res)=>{
                if(err){
                    reject(err)
                }
                resolve(posts);
            })
           })
        }
    }
}