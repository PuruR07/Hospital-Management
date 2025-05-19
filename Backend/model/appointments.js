import mongoose from "mongoose";

const appointmentsSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true,

    },
    illness: {
        type: String,
        required: true,
    },
    doctorAssigned: {
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true
    }

},
{timestamps: true

});
const Appointments = mongoose.model("Appointments", appointmentsSchema);
export default Appointments;