import mongoose from "mongoose"



export const dbConnection = async(req,res)=>{
    try{
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log("Database Connected")
    }catch(err){
        console.log(err,"error :Data base not connected")
    }
}