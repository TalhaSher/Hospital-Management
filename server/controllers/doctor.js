import Doctor from "../models/Doctor";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
