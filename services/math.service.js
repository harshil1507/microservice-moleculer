module.exports = {
    name : 'math',

    actions : {

        add : {
            rest : '/add',
            async handler(ctx){
                return Number(ctx.params.a) + Number(ctx.params.b) 
            }
        },

        sub : {
            rest : '/sub',
            async handler(ctx){
                return Number(ctx.params.a) - Number(ctx.params.b) 
            }
        },

        mul : {
            rest : '/mul',
            async handler(ctx){
                return Number(ctx.params.a) * Number(ctx.params.b) 
            }
        },

        div : {
            rest : '/div',
            async handler(ctx){
                return Number(ctx.params.a) / Number(ctx.params.b) 
            }
        },
    },

    dependencies : ["fetch-posts"]
}