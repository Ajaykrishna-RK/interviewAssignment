import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color:"black",
  pt: 2,
  px: 4,
  pb: 3,
};


function TicketModal({open,handleClose,bookingId,show,user,seat}) {
  const navigate = useNavigate()
const {token} = useSelector((state)=>state.show)

console.log(bookingId,show,user,seat,"ids")
const [showbyId,setShowById] = useState(null)

const getshowById = async () => {

try{
  const response = await fetch(`http://localhost:3001/shows/${show}`, {
    method: "GET",
    headers:  { Authorization: `Bearer ${token}` },
   
  });
  const data = await response.json();
setShowById(data)
}catch(err){
  console.log(err)
}



};
useEffect(()=>{
getshowById()

},[show])
console.log(showbyId,'dho')



const handleDeleteTicket = async()=>{

try{
  const response = await fetch(`http://localhost:3001/${user}/shows/${bookingId}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body:JSON.stringify({seatNumber: seat[0]})
  
  });
  const data = await response.json();
console.log(data)
if(response.ok){
alert(data.message)

navigate(`/`)
}else{
  alert('error')
}


}catch(err){

}

}

  return (
    <div>

<Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">{showbyId?.showName}</h2>
          <p id="child-modal-description" >
         Screen {showbyId?.screen}
          </p>
          <p id="child-modal-description" style={{fontSize:'20px'}}>
        SeatNumber :  {seat}
          </p>
          <Button onClick={handleClose}>back</Button>
          <Button onClick={()=>handleDeleteTicket()}>Delete</Button>
        </Box>
      </Modal>




    </div>
  )
}

export default TicketModal