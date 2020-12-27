const express = require('express')
const morgan =require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
// import mongoose
const mongoose = require('mongoose');
// load env variables
const app = express()
//import routes
const userRoutes = require('./routes/user')
require('dotenv').config()


//routes/middleware
app.use(morgan('dev'))
app.use(expressValidator())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api", userRoutes)

const port= process.env.PORT

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})


//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });