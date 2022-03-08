const express = require('express')
const router = express.Router()
const createError=require('http-errors')
const User = require('../Models/user.model')


router.post('/signup',async(req,res,next)=>{
    res.send("signup route")
    try{
        const {username,password}=req.body

        if(!username || !password) throw createError.BadRequest()

        const user = new User({username,password})
        const savedUser = await user.save()
        console.log(username+" "+password)
        
       
    }
    catch(error)
    {
        next(error)
    }
})

router.post('/login',async(req,res,next)=>{
    res.send("login route")
})

router.post('/refresh-token',async(req,res,next)=>{
    res.send("refresh-token route")
})

router.delete('/logout',async(req,res,next)=>{
    res.send('logout route')
})

module.exports = router