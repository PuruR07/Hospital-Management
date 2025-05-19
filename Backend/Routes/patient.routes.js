import express from "express";
import { createPatients, deletePatients, getPatients, updatePatients } from "../controller/patient.controller.js";
// import { createDoctors, deleteDoctors, getDoctors, updateDoctors } from '../controller/doctors.controller.js';

const router = express.Router();


//* These endpoints will be prefixed with /api/doctors
router.get("/", getPatients)
router.post("/", createPatients)
router.delete("/:id", deletePatients)
router.put("/:id", updatePatients)


export default router;