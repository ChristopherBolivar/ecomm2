const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (req,res) =>{
    console.log(req.body)
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        res.json({
            user
        })
    })
}

exports.signin = (req,res) =>{
    //find user based on email
    const {email,password} = req.body
    User.findOne({email}, (err,user)=>{
        //if no user  or error
        if(err || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign up'
            })
        }
        //check if password is valid
        // create authenticate method
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        //generate a signed token with user id and token

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('t',token,{expire: new Date() + 9999})
        //return response with user and token to frontend client
        const{_id,name,email,role} = user
        return res.json({token, user:{_id,email,name,role}})
    })

}

exports.signout = (req,res) =>{
    res.clearCookie('t')
    res.json({message: 'Signout complete'})
}