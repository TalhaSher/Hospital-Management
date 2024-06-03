import Management from "../models/Management.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

export const createManagement = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const management = new Management({
      role: "management",
      email,
      password: passwordHash,
    });
    const newManagement = await management.save();
    res.status(200).json(newManagement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginManagement = async (req, res) => {
  try {
    const { email, password } = req.body;
    const management = Management.findOne({ email: email });
    if (!management)
      return res.status(400).json({ msg: "Management Account Not Found !" });

    const isMatch = bcrypt.compare(password, management.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid Credentials" });

    const token = jwt.sign(management, process.env.JWT_SECRET);
    res.status(200).json({ token, management });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { doctor } = req.body;
    console.log(doctor);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(doctor.password, salt);

    const newdoctor = new Doctor({
      ...doctor,
      password: passwordHash,
      role: "doctor",
    });
    const newDoctor = await newdoctor.save();
    res.status(200).json({ newDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getdoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getdoctor = async (req, res) => {
  try {
    const id = req.params;
    const doctor = Doctor.findById(id).populate("appointments");
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getappointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id).populate("appointments");
    console.log(doctor);
    if (doctor) {
      const appointmentIds = doctor.appointments.map(
        (appointment) => appointment._id
      );

      for (const appointmentId of appointmentIds) {
        await User.findOneAndUpdate(
          { appointments: appointmentId },
          { $pull: { appointments: appointmentId } },
          { new: true }
        );
      }

      res.status(200).json({ msg: "Deleted Successfully" });
    } else {
      res.status(404).json({ msg: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
