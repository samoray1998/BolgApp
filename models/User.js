const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { error } = require('jquery');
var uniqueValidator=require('mongoose-unique-validator')

const UserSchema = new Schema({
username: {
    type:String,
    required:[true,'Please provide a user name'],
    unique:true,
},
password:{
    type:String,
    required:[true,'Please enter a password']
}
});
UserSchema.pre('save',function (next) {
    const user=this
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash
        next()
    })
})
UserSchema.plugin(uniqueValidator)
// export model
const User = mongoose.model('User',UserSchema);
module.exports = User