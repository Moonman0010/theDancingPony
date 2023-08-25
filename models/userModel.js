const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user_name:{
        type: String,
        require: [true, "Please add the user name"]
    },
    password:{
        type: String,
        requires: [true, "please add the password"]
    },
    nick_name:{
        type: String,
        required: [true, "please add the nick name"]
    },
    phone:{
        type: Number,
        required: false
    },
    email:{
        type: Number,
        required: false
    }
},
{
    timestamp: true
})

module.exports = mongoose.model("User", userSchema)