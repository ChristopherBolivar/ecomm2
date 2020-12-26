const express = require('express')
// import mongoose
const mongoose = require('mongoose');
// load env variables
const app = express()
//import routes
const userRoutes = require('./routes/user')
require('dotenv').config()


//routes/middleware
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