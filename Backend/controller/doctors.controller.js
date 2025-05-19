import Doctors from '../model/doctor.js';
import mongoose from "mongoose";

export const getDoctors = async (req, res)=>{
    try {
        const doctors = await Doctors.find({});
        res.status(200).json({success:true, doctors});
    } catch (error) {
        log.error("Error in fetching products: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};

export const createDoctors = async (req, res)=>{
     console.log("Request body is:", req.body);
    const doctors = req.body;//* The user will send the data in the body of the request

    if(!doctors.name || !doctors.specialty || !doctors.phoneNo || !doctors.email){  
        return res.status(400).json({success:false, message: "Please fill all the fields"});
    }
    const newDoctors = new Doctors(doctors);

    try {
        await newDoctors.save();
        res.status(201).json({success:true, message:"New Doctor Added"})
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
};

export const deleteDoctors = async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }

    try {
        await Doctors.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Doctor Removed"})
    } catch (error) {
        console.log("Error in Removing Doctor: ", error.message);
        
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};


export const updateDoctors = async(req,res)=>{
    const {id} = req.params;
    const doctors = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Doctor ID"});
    }

    try {
       const updatedDoctors =  await Doctors.findByIdAndUpdate(id, doctors, {new:true});
       res.status(200).json({success:true, message:"Doctor Details Updated", doctors:updatedDoctors})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})

    }
};