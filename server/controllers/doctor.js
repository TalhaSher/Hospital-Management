import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";

export const doctorPersistent = (req, res, next) => {
  if (!req.session.USER) {
    const token = req.cookies?.jwt;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedUser) => {
          if (err) return res.status(401).json({ msg: "Unauthorized" });
          if (decodedUser.doctor.role == "doctor") {
            req.session.USER = decodedUser.doctor;
          }
          next();
        });
      } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    } else {
      return res.status(403).json({ msg: "Please Login First" });
    }
  } else {
    next();
  }
};

export const persistDoctor = async (req, res) => {
  if (req.session.USER) {
    let userId = req.session.USER._id;
    const user = await Doctor.findById(userId);
    res.status(200).json({ user });
  }
};

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

    const doctor = await Doctor.findById(doctorId).populate("appointments");

    res.status(200).json({ doctor });
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

export const appointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
