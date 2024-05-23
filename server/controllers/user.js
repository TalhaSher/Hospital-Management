import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

export const userPersistent = (req, res, next) => {
  if (!req.session.USER) {
    const token = req.cookies?.jwt;
    if (token) {
      try {
        jwt.verify(token, process.env.SESSION_SECRET, {}, (err, user) => {
          if (err) throw err;
          req.session.USER = user;
        });
        next();
      } catch (error) {
        res.status(401).json({ msg: err.message });
      }
      return;
    } else {
      res.status(403).json({ message: "Please Login First" });
    }
  }
};

export const persistUser = async (req, res) => {
  if (req.session.USER) {
    const user = User.findById(req.session.USER._id);
    res.status(200).json({ user });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User Does Not Exists." });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    req.session.USER = user;

    jwt.sign({ user }, process.env.SESSION_SECRET, {}, (err, token) => {
      res
        .cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json({ msg: "Login Successful", user });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPwd = bcrypt.hashSync(password, salt);

    const user = new User({
      email,
      password: hashedPwd,
    });

    const savedUser = await user.save();

    res.status(200).json({ savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setAppointment = async (req, res) => {
  try {
    const loggedInUser = req.session.USER;
    console.log(loggedInUser);
    const user = await User.findById(loggedInUser._id);
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    const appointment = await new Appointment(req.body.values);
    console.log(appointment);
    await doctor.appointments.push(appointment);
    await user.appointments.push(appointment);
    console.log(doctor);
    await user.save();
    await doctor.save();
    await appointment.save();
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
