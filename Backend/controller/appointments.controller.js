import Appointment from '../model/appointments.js';
import mongoose from "mongoose";

export const getAppointment = async (req, res)=>{
    try {
        const appointment = await Appointment.find({});
        res.status(200).json({success:true, appointment});
    } catch (error) {
        log.error("Error in fetching Appointment: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};

export const createAppointment = async (req, res)=>{
     console.log("Request body is:", req.body);
    const appointment = req.body;//* The user will send the data in the body of the request

    if(!appointment.patient || !appointment.illness || !appointment.doctorAssigned || !appointment.date || !appointment.time){  
        return res.status(400).json({success:false, message: "Please fill all the fields"});
    }
    const newAppointment = new Appointment(appointment);

    try {
        await newAppointment.save();
        res.status(201).json({success:true, message:"New Appointment Added"})
    } catch (error) {
        console.log("Error in creating Appointment: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
};

export const deleteAppointment = async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Appointment ID"});
    }

    try {
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Appointment Removed"})
    } catch (error) {
        console.log("Error in Removing Appointment: ", error.message);
        
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};


export const updateAppointment = async(req,res)=>{
    const {id} = req.params;
    const appointment = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Appointment ID"});
    }

    try {
       const updatedAppointment =  await Appointment.findByIdAndUpdate(id, appointment, {new:true});
       res.status(200).json({success:true, message:"Appointment Details Updated", appointment:updatedAppointment})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})

    }
};