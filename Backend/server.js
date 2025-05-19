import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import doctorsRoutes from './Routes/doctors.routes.js';
import patientRoutes from './Routes/patient.routes.js'
import appointmentRoutes from './Routes/appointments.routes.js'
const app = express()
dotenv.config()
app.use(express.json());
app.use("/api/doctors", doctorsRoutes);//* This will use the productRoutes for all the routes that start with /api/products
app.use("/api/patient", patientRoutes);//* This will use the productRoutes for all the routes that start with /api/products
app.use("/api/appointment", appointmentRoutes);//* This will use the productRoutes for all the routes that start with /api/products
const PORT = process.env.PORT || 80

app.listen(PORT, () =>{
    connectDB()
    console.log(`Server is running on port http://localhost:${PORT}`);
    
})

