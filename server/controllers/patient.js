import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("appointments");
    console.log(doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    const appointment = await new Appointment(req.body.values);
    console.log(appointment);
    await doctor.appointments.push(appointment);
    console.log(doctor);
    await doctor.save();
    await appointment.save();
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
