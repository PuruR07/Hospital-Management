import express from "express";
// import { createProduct, deleteProduct, getProducts, updateProduct } from "../Controller/product.controller.js";

import { createDoctors, deleteDoctors, getDoctors, updateDoctors } from '../controller/doctors.controller.js';

const router = express.Router();


//* These endpoints will be prefixed with /api/doctors
router.get("/", getDoctors)
router.post("/", createDoctors)
router.delete("/:id", deleteDoctors)
router.put("/:id", updateDoctors)


export default router;