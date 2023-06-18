import Booking from "../model/BookingModel.js";
import Show from "../model/Showmodel.js";

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
   return res.json(shows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getShowbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const showById = await Show.findById(id);

  return  res.status(200).json(showById);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const postShows = async (req, res) => {
  try {
    const { showName, screen, seatLimit } = req.body;
    const post = new Show({
      showName,
      screen,
      seatLimit,
    });
    await post.save();

   return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const bookTickets = async (req, res) => {
  try {
    const { showId, userId } = req.params;
    const { seatNumber } = req.body;
 


    const show = await Show.findById(showId);
    if (!show) {
      return res.status(400).json({ error: "Show not found" });
    }



    if(show.bookedSeats.length === show?.seatLimit ){
      return  res.status(400).json({error:"Seat FIlled"});
    }

    if( seatNumber > show.seatLimit ) {

      return  res.status(400).json({error:`Seat Limit is ${show.seatLimit}`});

    }
 
    if (show.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ error: "Seat is already booked" });
    }


  
    const booking = new Booking({
      show: showId,
      seat: seatNumber,
      user: userId,
    });

   
    await booking.save();

    
    
   
    show.bookedSeats.push(seatNumber);
    await show.save();



    return res
      .status(200)
      .json({ message: "Ticket booked successfully", booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: err.message });
  }

  
 
};

export const bookingsPerUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId });

 return   res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteBookings = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;
    const { seatNumber } = req.body;
   

    const bookedTicket = await Booking.findOne({
      _id: bookingId,
      user: userId,
    });
    if (!bookedTicket) {
      return res.status(400).json({ error: "Booking not found" });
    }

    const show = await Show.findById(bookedTicket.show);
    if (!show) {
      return res.status(400).json({ error: "Show not found" });
    }

    const booked = show.bookedSeats;

    const index = booked.findIndex((seat) => seat === seatNumber);

    if (index === -1) {
      return res.status(400).json({ error: "Seat not booked" });
    }
   
    const deleted = booked.splice(index, 1);
    

    await show.save();

    const deletedBook = await Booking.findByIdAndDelete({ _id: bookingId });

   return res.json({message:"Booking Cancelled Successfully"});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
