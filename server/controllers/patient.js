import catchAsync from "../Middleware/catchAsync";
import Doctor from "../models/Doctor";
import Appointment from "../models/Appointment";

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
    const id = req.params;
    const doctor = Doctor.findById(id);
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setAppointment = async (req, res) => {
  try {
    const doctorId = req.params;
    const doctor = Doctor.findById(doctorId);
    const appointment = new Appointment(req.body);
    doctor.appointmets.push(appointment);
    await doctor.save();
    await appointment.save();
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
