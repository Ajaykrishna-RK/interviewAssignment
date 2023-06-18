
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'

import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import BookingPerUser from './pages/BookingPerUser'

function App() {

  const {token} = useSelector((state)=>state.show)
 

  return (
    <>
 <Navbar/>
<Routes>
  <Route path='/' element={ token ? <HomePage/> : <Navigate to="/login"/>} />
  <Route path='/:showId' element={token ? <BookingPage/> : <Navigate to="/login" />}/>
  <Route path='/booked/:userId' element={token ? <BookingPerUser/> : <Navigate to="/login"/>}/>
  <Route path='/login' element={<AuthPage/>}/>
</Routes>


    </>
  )
}

export default App
