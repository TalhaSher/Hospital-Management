import express from "express";
import {
  getAllDoctors,
  getDoctor,
  setAppointment,
} from "../controllers/patient";

const router = express.Router();

router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctor);
router.post("/doctors/:id", setAppointment);
