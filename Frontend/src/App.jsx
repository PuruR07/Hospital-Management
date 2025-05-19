import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import PatientPage from "./Pages/PatientPage"
import DoctorsPage from "./Pages/DoctorsPage"
import AppointmentPage from "./Pages/AppointmentPage"
import Navbar from "./Components/navbar"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/patient" element={<PatientPage/>}/>
    <Route path="/doctor" element={<DoctorsPage/>}/>
    <Route path="/appointment" element={<AppointmentPage/>}/>
    </Routes>
    </>
  )
}

export default App
