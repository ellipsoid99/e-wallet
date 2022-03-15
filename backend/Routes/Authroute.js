const express = require('express')
const router = express.Router()
const createError=require('http-errors')
const User = require('../Models/user.model')
const AccountNumber = require('../Models/acc_number')
const {authSchema}=require('../helper/validation_schema')
const {signAccessToken,signRefreshToken,verifyRefreshToken}=require('../helper/jwt_helper')
const { sign } = require('jsonwebtoken')
const { create } = require('../Models/user.model')


router.post('/signup',async(req,res,next)=>{
    
    try{
    
        var result = await authSchema.validateAsync(req.body)
        // console.log(result)
        
        // const doesExist = await User.findOne({accountNumber:result.accountNumber})
        // if(doesExist)
        //     throw createError.Conflict(`${result.accountNumber} is already a registered user`)
        
        var accNum=await AccountNumber.findOne({index:"1"})
        console.log(accNum.accountNumber)
        console.log(typeof accNum.accountNumber)

        var val=accNum.accountNumber+1;
        console.log(val)
        AccountNumber.findOneAndUpdate(
                {index:"1"},
                {$set:{accountNumber:val}},
                {new:true},
                (err,doc)=>{
                    if(err)
                        console.log(err)
                    console.log(doc);
                }
            );
        
        result.accountnumber=val
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        // const refreshToken=await signRefreshToken(savedUser.id)
        // res.send({accessToken,refreshToken})
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
        const user = await User.findOne({accountnumber:result.accountnumber})
        
        if(!user)
        {
            throw createError.NotFound("User not registered")
        }
        const isMatch = await user.isValidPassword(result.password)

        if(!isMatch)
            throw createError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id)
        // const refreshToken = await signRefreshToken(user.id)
        // res.send({accessToken,refreshToken})
        console.log(user)
        res.send({accessToken})


    } catch (error) {
        
        if(error.isJoi === true)
            return next(createError.BadRequest("Invalid Username/Password"))
        next(error)
    }
    
    
    // res.send("login route")
})

// router.post('/refresh-token',async(req,res,next)=>{
    
//     try {
//         const {refreshToken}=req.body
//         if(!refreshToken)throw createError.BadRequest()

//        const userId = await verifyRefreshToken(refreshToken)

//        const newAccessToken = await signAccessToken(userId)
//        const newRefreshToken = await signRefreshToken(userId)

//        res.send({newAccessToken,newRefreshToken})


//     } catch (error) {
//         next(error)
//     }
//     res.send("refresh-token route")
// })

router.delete('/logout',async(req,res,next)=>{
    
    // try {
    //     const {refreshToken}=req.body
    //     if(!refreshToken)throw createError.BadRequest()

    //     const userId=await verifyRefreshToken(refreshToken)


    // } catch (error) {
    //     next(error)
    // }
    
    res.send('logout route')
})

module.exports = router