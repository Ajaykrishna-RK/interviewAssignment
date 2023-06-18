import React from 'react'
import {AppBar, Button, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/showSlice';
function Navbar() {
const dispatch = useDispatch()
const {token} = useSelector((state)=>state.show)


  return (



    <div>


<AppBar sx={{height:"10%",justifyContent:"center",position:"relative"}}>

<Typography variant='h4' sx={{textAlign:"center"}}>
Movie Ticket Booking
</Typography>

<div style={{position:"absolute",right:0}}>

{token ? <Button onClick={()=>dispatch(setLogout())} sx={{color:"black",backgroundColor:"#fff"}} >Logout</Button> : ""} 
</div>

</AppBar>


    </div>
  )
}

export default Navbar