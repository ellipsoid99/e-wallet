const express = require('express')
const router = express.Router()
const createError=require('http-errors')
const User = require('../Models/user.model')
const {authSchema}=require('../helper/validation_schema')
const {signAccessToken}=require('../helper/jwt_helper')


router.post('/signup',async(req,res,next)=>{
    
    try{
    
        const result = await authSchema.validateAsync(req.body)
        // console.log(result)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken})
        // res.send(savedUser)
        // res.send("signup route")
    }
    catch(error)
    {
        if(error.isJoi === true)
            error.status=422 
        next(error)
    }
})

router.post('/login',async(req,res,next)=>{
    
    try {
        
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({username:result.username})
        
        if(!user)
        {
            throw createError.NotFound("User not registered")
        }
        const isMatch = await user.isValidPassword(result.password)

        if(!isMatch)
            throw createError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id)

        res.send({accessToken})


    } catch (error) {
        
        if(error.isJoi === true)
            return next(createError.BadRequest("Invalid Username/Password"))
        next(error)
    }
    
    
    // res.send("login route")
})

router.post('/refresh-token',async(req,res,next)=>{
    res.send("refresh-token route")
})

router.delete('/logout',async(req,res,next)=>{
    res.send('logout route')
})

module.exports = router