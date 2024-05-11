import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";
// SIGN IN

const doctorSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor)
      return res.status(400).json({ msg: "Doctor Account Not Found !" });
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, doctor });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getDashBoard = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = Doctor.findById(doctorId).populate("appointments");
    const appointments = doctor.appointments;

    res.status(200).json({ doctor, appointments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.params;
    const appointment = Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(400).json({ msg: "Appointment Not Found" });
    }
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
