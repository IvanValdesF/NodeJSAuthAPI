


const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const {dirname,join} = require('path')
const {fileURLToPath} = require('url')
const userRoutes = require('./routes/userRoutes')



const app = express();
const port =5000;
const corsOptions = {credentials:true,origin:'http://localhost:8080'};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());



app.use('/',express.static(join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send("Hello world")
});

app.use('/api/users',userRoutes)

app.listen(port,()=>{
    console.log('App listening on port 5000')
})