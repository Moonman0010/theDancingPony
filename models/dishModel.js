const mongoose = require("mongoose")
const User = require("./userModel")

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: User
    },
    userRating:{
        type: Number,
        required: [true, "please provide a valid rating between 1-5"],
        enum: [1,2,3,4,5]
    }
})

const dishSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    name:{
        type: String,
        require: [true, "Please add the name of the dish"],
        unique: [true, "Dish already exists"]
    },
    description:{
        type: String,
        required: [true, "Please add the description of the dish"],
        unique: [true, "There is another dish with the same description. please add an unquiue description for the dish"]
    },
    image:{
        type: String,
        required: false
    },
    price:{
        value:{
            type: Number,
            required: false
        },
        unit:{
            type: String,
            required: false
        } 
    },
    rating:[{
        type: ratingSchema,
        required: false
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("Dish", dishSchema)