import express from "express"
import showRoutes from './routes/showRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from "./config/dbConnection.js";

const app = express()
dotenv.config()
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(express.json())


app.use("/",showRoutes)
app.use("/auth",AuthRoutes)

app.listen(process.env.PORT,()=>{
console.log('connected')
})

dbConnection()

