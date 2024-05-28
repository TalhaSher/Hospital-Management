import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";
// SIGN IN

export const doctorSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor)
      return res.status(400).json({ msg: "Doctor Account Not Found !" });
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    req.session.USER = doctor;

    jwt.sign({ doctor }, process.env.JWT_SECRET, {}, (err, token) => {
      res
        .cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json({ msg: "Login Successful", doctor });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDashBoard = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = Doctor.findById(doctorId).populate("appointments");
    const appointments = doctor.appointments;

    res.status(200).json({ doctor, appointments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSingleAppointment = async (req, res) => {
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
