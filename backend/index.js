const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

app.use(cors());
// 
// import routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')


dotenv.config({ path: path.resolve(__dirname, './.env') });
__dirname = path.resolve()


//connect to db//connect to db


mongoose.connect(
  process.env.DB_CONNECT
  , () =>{
  console.log('connected to db');
})

// middlewares
app.use(express.json())

// Route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/user', userRoute)

// deployement
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get("*", (req,res) => {
//     res.sendFile(path.resolve(__dirname, "client","build", "index.html" ))
//   })
// }else{
//   app.get("/", (req,res) => {
//     res.json('API is running')
//   })
// }

app.get("/", (req,res) => {
  res.json('server up')
})

app.listen(process.env.PORT || 5000, () => console.log("server running"))

