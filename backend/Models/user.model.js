const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')

const UserSchema = new Schema ({
    accountNumber:{
        type:Number,
        required:false
    },
    firstname:{
        type: String,
        required:true
    },
    lastname:{
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
    },
    transactions:{
        type:Object,
        required:false
    }
})

UserSchema.pre('save',async function(next){
    try{
        const salt=await bcrypt.genSalt(10)
        const hasedPassword= await bcrypt.hash(this.password,salt)
        this.password=hasedPassword
        next()
        // console.log(this.username,this.password)
    }
    catch(error){
        next(error)
    }
})


UserSchema.methods.isValidPassword = async function(password){

    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user',UserSchema)
module.exports=User

