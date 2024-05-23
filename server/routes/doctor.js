import express from "express";
import {
  doctorSignIn,
  getDashBoard,
  getSingleAppointment,
} from "../controllers/doctor.js";

const router = express.Router();

router.post("/LogIn", doctorSignIn);
router.get("/:doctorId/dashboard", getDashBoard);
router.get("/:doctorId/:appointmentId", getSingleAppointment);

export default router;
