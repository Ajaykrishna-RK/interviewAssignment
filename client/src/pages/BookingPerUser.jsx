import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TicketModal from './TicketModal'




const columns = ["Seat Number","BookedAt","Actions"]

function BookingPerUser() {
  const navigate = useNavigate()
const {userId} = useParams()
console.log(userId,'==')
const {token} = useSelector((state)=>state.show)
const [bookshowperUser,setBookShowperUser] = useState()
const [bookingId,setBookingId] = useState(null)
const [user,setUser] = useState(null)
const [show,setShow] = useState(null)
const [seat,setSeat] =  useState(null)
const [open,setOpen] = useState(false)
const handleOpen = (bookingId,show,user,seat) => {
  setOpen(true);
  setBookingId(bookingId)
  setShow(show)
  setUser(user)
  setSeat(seat)
};
const handleClose = () => {
  setOpen(false);
};
const getShowsperUser = async () => {
try{
  const response = await fetch(`http://localhost:3001/shows/${userId}/bookings`, {
      method: "GET",
      headers:  { Authorization: `Bearer ${token}` },
     
    });
    const data = await response.json();
setBookShowperUser(data)



}catch(err){
console.log(err)
}

  

  };

useEffect(()=>{
getShowsperUser()
},[])



  return (
    <div>
      <h1 style={{marginTop:"5%" ,textAlign:'center'}}>Booked Tickets</h1>

     
  




<TicketModal open={open} handleClose={handleClose} user={user} bookingId={bookingId} show={show} seat={seat}/>


<div style={{justifyContent:"center",alignItems:'center',display:'flex',gap:'50px'}}>
{ bookshowperUser && bookshowperUser.length > 0 ? bookshowperUser.map((item,key)=>(
<TableContainer sx={{ width:"50%",backgroundColor:"#fff"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                 
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
      
                  <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  
                        <TableCell >
                         {item.seat}
                        </TableCell>
                        <TableCell >
                        {item.bookedAt && item.bookedAt.toString().slice(0, 10)}
                        </TableCell>
                        <TableCell >
                        <Button  onClick={()=>handleOpen(item._id,item.show,item.user,item.seat)}> View Ticket</Button>
                        </TableCell>
                  
                  </TableRow>
                  
              
          </TableBody>
        </Table>
      
      </TableContainer>
      ))
      : <h2 style={{textAlign:"center"}}>No Tickets</h2> }
    
    
</div>

<div style={{marginLeft:"5%"}}>
        <Button onClick={()=>navigate('/')} variant='contained'>back</Button>
      </div>

    </div>
  )
}

export default BookingPerUser