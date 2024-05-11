import mongoose, { Schema } from "mongoose";
import Appointment from "./Appointment.js";

const DoctorSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
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
    email: {
      type: String,
      required: true,
      unique: true,
      min: 8,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    doctorOf: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 20,
      max: 180,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    maxAppointments: {
      type: Number,
      required: true,
    },
    appointments: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true }
);

DoctorSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Appointment.deleteMany({
      _id: { $in: doc.appointments },
    });
  }
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
