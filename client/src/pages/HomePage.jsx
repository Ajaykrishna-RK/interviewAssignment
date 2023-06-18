import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:768px)");
const mainStyle = {
  
}


  const { token } = useSelector((state) => state.show);
  const {user} = useSelector((state) => state.show);
  const [shows, setShows] = useState();

  const getShows = async () => {
    try {
      const response = await fetch(`http://localhost:3001/shows`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setShows(data);
    } catch (err) {}
  };

  useEffect(() => {
    getShows();
  }, []);

  console.log(shows);

  return (

    <>
    <div style={{justifyContent:'end',alignItems:"end",display:"flex",marginTop:"4%"}}>
      <Button onClick={()=>navigate(`/booked/${user._id}`)} variant="contained">My TIckets</Button>
    </div>
     <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: isNonMobileScreens ? "flex" :"grid" ,
        gap: "50px",
        marginTop:'5%'
      }}
    >
      
      {shows &&
        shows.map((show) => (
          <Card  key={show._id}>
            <CardContent>
              <Typography variant="h4" color="text.secondary" gutterBottom>
              <span style={{fontSize:"20px"}}>Movie Name :</span> {show.showName}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
              Screen :  {show.screen}
              </Typography>
              <Typography  component="div">
                Seat Capacity: {show.seatLimit}
              </Typography>
            
              <Typography variant="body2">
                Remaining Seats :{" "}
                {show.bookedSeats.reduce((acc, curr) => acc.concat(curr), [])
                .length === show.seatLimit ?  "No Seat available"
               : 
                show.seatLimit -
                  show.bookedSeats.reduce((acc, curr) => acc.concat(curr), [])
                    .length}
                <br />
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              
                <Button size="small" onClick={() => navigate(`/${show._id}`)}>
                  Book
                </Button>
            
            </CardActions>
          </Card>
        ))}
    </div>
    </>
    
  );
}

export default HomePage;
