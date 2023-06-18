import mongoose from 'mongoose'
const  showSchema = new mongoose.Schema ({
showName : {
  type:String,
  required:true
},
screen :{
  type:String,
  required:true
},
seatLimit:{
  type:Number,
  required:true
},
bookedSeats :{
  type:Array,
  default:[]
}

})

 const Show = mongoose.model("Show",showSchema)
 export default Show 