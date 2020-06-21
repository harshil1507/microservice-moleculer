import {DbService} from 'moleculer-db';
import { MongooseAdapter } from 'moleculer-db-adapter-mongoose';
import {PostModel} from '../schema/posts.schema';
import * as dotenv from 'dotenv';
dotenv.config();

export default dataFetch = {
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