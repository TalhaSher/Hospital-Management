import mongoose from "mongoose";
import Doctor from "./Doctor.js";
const Schema = mongoose.Schema;

const AppointmentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },

  appointmentDate: {
    type: Date,
    required: true,
    autoIndex: true, // Create an index for efficient queries
    expireAfterSeconds: 0,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
