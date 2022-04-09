const { boolean } = require('@hapi/joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserSchema = new Schema ({
    amount:{
        type:Number,
        required:true,
        default:0
    },
    flag:{
        type:boolean,
        required:true,
    },
})