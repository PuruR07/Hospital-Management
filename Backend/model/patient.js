import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    illness: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },


},
{timestamps: true

});
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;