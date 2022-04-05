const mongoose=require('mongoose')
const Schema=mongoose.Schema

const AccountNumberSchema = new Schema ({
    index:{
        type:String
    },
    accountNumber:{
        type:Number
    },
})

const AccountNumber = mongoose.model('accountNumber',AccountNumberSchema)
module.exports=AccountNumber

