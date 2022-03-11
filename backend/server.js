const express=require('express')
const bcrypt=require('bcrypt')
const morgan = require('morgan')
const createError=require('http-errors')
const mongoose = require('mongoose')
require('dotenv').config()
const {verifyAccessToken} = require('./helper/jwt_helper')
const authRoute = require('./Routes/Authroute')

const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const dbUrl = "mongodb+srv://admin123:admin123@cluster0.ozatv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectionParams={
    dbName:'e-wallet',
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:false,
    // useCreateIndex:true,
};

mongoose
    .connect(dbUrl,connectionParams)
    .then(()=>{
        console.log('connected to database')
    })
    .catch((e)=>{
        console.log('Error',e);
    });

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose connection is disconnected')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0)
})
app.get('/',verifyAccessToken,async(req,res,next)=>{
    console.log(req.headers['authorization'])
    res.send('HOME PAGE')
});

app.use('/auth',authRoute)

app.use(async (req,res,next)=>{
    next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status|| 500,
            message:err.message,
        },
    })
})

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})