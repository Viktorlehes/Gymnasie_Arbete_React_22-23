const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes.js')
const cors = require('cors')

//something
dotenv.config()

//save login to database
mongoose.connect(process.env.DATABASE_ACCESS,() => console.log("Database Connected"))

//initialize
app.use(express.json())

//handle requests
app.use(cors())

//routes 
app.use('/app', routesUrls)

//listen for requests
app.listen(4000, () => console.log("server is up and running"));

