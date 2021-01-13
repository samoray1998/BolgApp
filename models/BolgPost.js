const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator=require('mongoose-unique-validator')
const BlogPostSchema = new Schema({
    title: {
        type:String,
        required:[true,'please enter title for this blog']
    },
    body: {
        type:String,
        required:[true,'you can not submit this blog without writhing at least 20 words'],
        length:200
    },
    //username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    image:String
})
BlogPostSchema.plugin(uniqueValidator)
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost