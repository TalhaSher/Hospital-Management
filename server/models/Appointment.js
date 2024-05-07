import mongoose from "mongoose";

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
  date: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
