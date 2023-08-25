const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const createUser = asyncHandler(async(req,res) =>{
    const { user_name, nick_name, phone, email} = req.body
    if(!user_name || !req.body.password){
        res.status("400")
        throw new Error("Username or password missing")
    }
    const userExists = await User.findOne({user_name});
    if(userExists){
        res.status(400)
        throw new Error("Username already taken !!")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
        user_name,
        password: hashedPassword,
        nick_name,
        phone,
        email
    })
    if(user){
        res.status(200).json({userId: user._id, userName: user.user_name})
    }else{
        res.status(400)
        throw new Error("failed to create user")
    }
})

const loginUser = asyncHandler(async (req,res) =>{
    const {user_name} = req.body
    if(!user_name || !req.body.password){
        res.status(400);
        throw new Error("user name or password missing !!")
    }
    const user = await User.findOne({user_name})
    const passwordMatched = await bcrypt.compare(req.body.password, user.password)
    if(!user || !passwordMatched){
        res.status(401);
        throw new Error("user or password does not match")
    }
    const accessToken = jwt.sign(
        {
            user:{ 
                username: user.user_name,
                nick_name: user.nick_name,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
        );
    if(!accessToken){
        res.status(401);
        throw new Error("could not generate access token")
    }
    res.status(200).json({accessToken})
})

module.exports = {createUser, loginUser}