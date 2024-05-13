import express from "express";
import {
  getAllDoctors,
  getDoctor,
  setAppointment,
} from "../controllers/patient.js";

const router = express.Router();

router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctor);
router.post("/doctors/:doctorId", setAppointment);

export default router;
