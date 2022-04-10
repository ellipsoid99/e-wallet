const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcryptjs')
const Transactions=require('./transcations')

const UserSchema = new Schema ({
    accountnumber:{
        type:Number,
        required:false,
        default:0
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
    phoneNumber:{
        type:Number,
        required:false,
        default:0
    },
    transactions:[
        {type:Schema.Types.ObjectId,ref:'Transactions'}
    ]
    
})

// UserSchema.pre('save',async function(next){
//     try{
//         const salt=await bcrypt.genSalt(10)
//         const hasedPassword= await bcrypt.hash(this.password,salt)
//         this.password=hasedPassword
//         next()
//         // console.log(this.username,this.password)
//     }
//     catch(error){
//         next(error)
//     }
// })


// UserSchema.methods.isValidPassword = async function(password){

//     try {
//         return await bcrypt.compare(password,this.password)
//     } catch (error) {
//         throw error
//     }
// }

const User = mongoose.model('user',UserSchema)
module.exports=User

