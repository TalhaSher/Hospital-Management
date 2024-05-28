import express from "express";
import {
  doctorSignIn,
  getDashBoard,
  getSingleAppointment,
  appointmentStatus,
} from "../controllers/doctor.js";

const router = express.Router();

router.post("/Login", doctorSignIn);
router.get("/:doctorId/dashboard", getDashBoard);
router.get("/:doctorId/:appointmentId", getSingleAppointment);
router.patch("/appointment/:id", appointmentStatus);

export default router;
