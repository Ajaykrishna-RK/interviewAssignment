import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function BookingPage() {
  const { showId } = useParams();
  const navigate = useNavigate()

  const [showbyId, setShowById] = useState();

  const [selectedSeatNumbers, setselectedSeatNumbers] = useState();

  const { token } = useSelector((state) => state.show);
  const {user} = useSelector((state)=>state.show)

  const getshowById = async () => {
    try{
      const response = await fetch(`http://localhost:3001/shows/${showId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setShowById(data);
    }catch(err){
      console.log(err)
    }
   
  };

  useEffect(() => {
    getshowById();
  }, []);

  const bookSeat = async () => {
    const seatNumber = parseInt(selectedSeatNumbers)
    try{
      const response = await fetch(`http://localhost:3001/${user._id}/bookings/${showId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify({seatNumber})
      });
      console.log(seatNumber,"selected")
      const data = await response.json();

if(response.ok){
 
  alert(data.message)
  
  navigate(`/booked/${user._id}`)
}else{
  alert(data.error)
}

    }catch(err){
      console.log(err)
    }
 
  };



  






  return (
    <div>
    
    <div style={{justifyContent:'center',alignItems:"center",display:"flex",marginTop:"5%"}}>
    <Card sx={{width:"50%",justifyContent:'center',alignItems:"center",display:"grid" }}>
        <CardContent>
          <Typography variant="h3" color="text.secondary" >
            {showbyId?.showName}
          </Typography>
          <Typography variant="h5" color="text.secondary" >
          Screen :  {showbyId?.screen}
          </Typography>
          <Typography  component="div" sx={{textAlign:"end"}}>
            Max Seats : {showbyId?.seatLimit}
          </Typography>
          
          <div sx={{ textAlign: "end", justifyContent: "end", display: "flex" }}>
            {showbyId?.bookedSeats.length > 0  ? 
            <>
            Booked Seat Numbers :{" "}

            {showbyId?.bookedSeats.reduce((acc, curr) => acc.concat(curr), []).length === showbyId?.seatLimit ? 
           "House full" :  
           <>  {showbyId?.bookedSeats.map((item) => (
             <span style={{ margin: "0 5px" }}>{item},</span>
           ))} 
           </>
         
           }  
          </> 
          
          
        :""  }
 


</div>
       
        
          <Typography component="div" sx={{textAlign:"end",}}>
          Remaining Seats : {showbyId?.seatLimit - showbyId?.bookedSeats.reduce((acc, curr) => acc.concat(curr), []).length}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter seat Number"
            onChange={(e) => setselectedSeatNumbers(e.target.value)}
            variant="outlined"
         sx={{marginTop:"10px"}}
                />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
            <Button size="small" onClick={() => navigate('/')}>
          back
          </Button>
          {showbyId?.bookedSeats.reduce((acc, curr) => acc.concat(curr), []).length === showbyId?.seatLimit ? 
        "No Seats Available"
        :   <Button size="small" onClick={() => bookSeat()}>
        Book
      </Button>  
        }
        
        
        </CardActions>
      </Card>
    </div>
     





    </div>
  );
}

export default BookingPage;
