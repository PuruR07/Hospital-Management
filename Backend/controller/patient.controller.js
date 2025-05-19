import Patient from '../model/patient.js';
import mongoose from "mongoose";

export const getPatients = async (req, res)=>{
    try {
        const patient = await Patient.find({});
        res.status(200).json({success:true, patient});
    } catch (error) {
        log.error("Error in fetching patient: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};

export const createPatients = async (req, res)=>{
     console.log("Request body is:", req.body);
    const patient = req.body;//* The user will send the data in the body of the request

    if(!patient.name || !patient.illness || !patient.phoneNo || !patient.email){  
        return res.status(400).json({success:false, message: "Please fill all the fields"});
    }
    const newPatient = new Patient(patient);

    try {
        await newPatient.save();
        res.status(201).json({success:true, message:"New Patient Added"})
    } catch (error) {
        console.log("Error in creating patient: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
};

export const deletePatients = async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Patient ID"});
    }

    try {
        await Patient.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Patient Removed"})
    } catch (error) {
        console.log("Error in Removing Patient: ", error.message);
        
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};


export const updatePatients = async(req,res)=>{
    const {id} = req.params;
    const patient = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Patient ID"});
    }

    try {
       const updatedPatient =  await Patient.findByIdAndUpdate(id, patient, {new:true});
       res.status(200).json({success:true, message:"Patient Details Updated", patient:updatedPatient})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})

    }
};