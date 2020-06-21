const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongo");
const PostModel = require('../schema/posts.schema');
require('dotenv').config();

module.exports = {
    name : "fetch-posts",
    mixins : [DbService],
    adapter : new MongooseAdapter(process.env.MONGO_URL),
    collection : 'posts',
    model : PostModel,

    actions : {

        findPosts: {
            rest : {
                method : "GET",
                path : "/find",
            },

            async handler(ctx){
                return ctx.call("fetch-posts.find")
            }
        }
    }
}