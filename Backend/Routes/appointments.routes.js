import express from "express";
// import { createPatients, deletePatients, getPatients, updatePatients } from "../controller/patient.controller.js";
import { createAppointment, getAppointment, updateAppointment, deleteAppointment } from "../controller/appointments.controller.js";

const router = express.Router();


//* These endpoints will be prefixed with /api/doctors
router.get("/", getAppointment)
router.post("/", createAppointment)
router.delete("/:id", deleteAppointment)
router.put("/:id", updateAppointment)


export default router;