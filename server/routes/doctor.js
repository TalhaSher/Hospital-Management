import express from "express";
import {
  doctorSignIn,
  getDashBoard,
  getSingleAppointment,
  appointmentStatus,
  doctorPersistent,
  persistDoctor,
} from "../controllers/doctor.js";

const router = express.Router();

router.get("/", doctorPersistent, persistDoctor);
router.get("/:doctorId/dashboard", getDashBoard);
router.get("/:doctorId/:appointmentId", getSingleAppointment);
router.post("/Login", doctorSignIn);
router.patch("/appointment/:id", appointmentStatus);

export default router;
