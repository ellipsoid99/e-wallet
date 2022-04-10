const mongoose=require('mongoose')
const Schema=mongoose.Schema
const TransactionSchema = new Schema ({
    accountNumber:{
        type:Number,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
        
    },
    transactions:
        [
            {to:{
                type:Number,
                required:true,
            },
            from:{
                type:Number,
                required:true
            },
            date:{
                type:Date,
                required:true,
            },
            flag:{
                type:Boolean,
                required:true,
            },
            amount:{
                type:Number,
                required:true,
            }
        }
     ]
    
    
});

const Transactions = mongoose.model('transaction',TransactionSchema )
module.exports=Transactions