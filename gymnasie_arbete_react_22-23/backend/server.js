import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routesUrls from './routes/routes.js'
import cors from 'cors';

//something
// dotenv.config()

//save login to database

const uri = "mongodb+srv://Vik:Vik@cluster0.u8bfyfl.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    } catch (err){
        console.log(err);
    }
}

await connect();


app.listen(4000, () => console.log("server is up and running"));


// mongoose.connect(process.env.DATABASE_ACCESS , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// },(e) => {

//     if(!e) {
//         console.log("Database Connected")
//     } 
//     console.log(e)
// })

// //initialize
// app.use(express.json())

// //handle requests
// app.use(cors())

// //routes 
// app.use('/app', routesUrls)

//listen for requests
