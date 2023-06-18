import express  from "express"
import { bookTickets, bookingsPerUser, deleteBookings, getAllShows, getShowbyId, postShows } from "../controllers/Show.js"
import { verifyToken } from "../middleware/Auth.js"
const router = express.Router()

router.get("/shows",verifyToken,getAllShows)
router.get("/shows/:id",verifyToken,getShowbyId)
router.post("/shows",postShows)

router.delete("/:userId/shows/:bookingId",verifyToken,deleteBookings)
router.post('/:userId/bookings/:showId',verifyToken,bookTickets)
router.get("/shows/:userId/bookings",verifyToken,bookingsPerUser)

export default router