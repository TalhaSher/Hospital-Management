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
        jwt.verify(
          token,
          process.env.SESSION_SECRET,
          {},
          (err, decodedUser) => {
            if (err) return res.status(401).json({ msg: "Unauthorized" });
            req.session.USER = decodedUser.user;
            next();
          }
        );
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

export const persistUser = async (req, res) => {
  if (req.session.USER) {
    let userId = req.session.USER._id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User Does Not Exists." });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid Credentials." });

    req.session.USER = user;

    jwt.sign({ user }, process.env.SESSION_SECRET, {}, (err, token) => {
      res
        .cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json({ msg: "Login Successful", user });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isAccountInDatabase = await User.findOne({ email: email });
    if (isAccountInDatabase)
      return res.status(409).json({ msg: "Account Already Exists" });
    const salt = bcrypt.genSaltSync();
    const hashedPwd = bcrypt.hashSync(password, salt);

    const user = new User({
      email,
      password: hashedPwd,
    });

    const savedUser = await user.save();

    res.status(200).json({ savedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("appointments");
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const setAppointment = async (req, res) => {
  try {
    const loggedInUser = req.session.USER;
    if (!loggedInUser) {
      return res.status(401).json({ msg: "User not logged in" });
    }

    const user = await User.findById(loggedInUser._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    const { values } = req.body;
    const appointmentData = {
      ...values,
      appointmentDate: new Date(values.appointmentDate),
      doctor: doctor._id,
    };

    const appointment = new Appointment(appointmentData);
    doctor.appointments.push(appointment);
    user.appointments.push(appointment);

    await appointment.save();
    await user.save();
    await doctor.save();

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const loggedInUser = req.session.USER;

    if (!loggedInUser) {
      return res.status(401).json({ msg: "User not logged in" });
    }

    const user = await User.findById(loggedInUser._id)
      .populate({
        path: "appointments",
        populate: {
          path: "doctor",
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);

    await User.findOneAndUpdate(
      { appointments: id },
      { $pull: { appointments: id } },
      { new: true }
    );
    await Doctor.findOneAndUpdate(
      { appointments: id },
      { $pull: { appointments: id } },
      { new: true }
    );
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
