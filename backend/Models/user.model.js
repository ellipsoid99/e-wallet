const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema = new Schema ({
    username:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:false,
        default:0.0
    }
})

const User = mongoose.model('user',UserSchema)
module.exports=User

