import Management from "../models/Management.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

export const managementPersistent = (req, res, next) => {
  if (!req.session.USER) {
    const token = req.cookies?.jwt;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedUser) => {
          if (err) return res.status(401).json({ msg: "Unauthorized" });
          if (decodedUser.management.role == "management") {
            req.session.USER = decodedUser.management;
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

export const persistManagement = async (req, res) => {
  if (req.session.USER) {
    let userId = req.session.USER._id;
    const user = await Management.findById(userId);
    res.status(200).json({ user });
  }
};

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
    res.status(200).json({ management: newManagement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginManagement = async (req, res) => {
  try {
    const { email, password } = req.body;

    const management = await Management.findOne({ email: email });
    if (!management || management == null)
      return res.status(400).json({ msg: "Management Account Not Found !" });

    const isMatch = bcrypt.compareSync(password, management.password);

    if (!isMatch) return res.status(400).json({ msg: "invalid Credentials" });

    req.session.USER = management;

    jwt.sign({ management }, process.env.JWT_SECRET, {}, (err, token) => {
      res
        .cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json({ msg: "Login Successful", management });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { doctor } = req.body;
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
    if (doctor) {
      const appointmentIds = doctor.appointments.map(
        (appointment) => appointment._id
      );

      for (let appointmentId of appointmentIds) {
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
