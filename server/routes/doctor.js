import express, { Router } from "express";
import {
  doctorSignIn,
  getDashBoard,
  getSingleAppointment,
} from "../controllers/doctor.js";

const router = express.Router();

Router.post("/SignIn", doctorSignIn);
Router.get("/:doctorId/dashboard", getDashBoard);
Router.get("/:doctorId/:appointmentId", getSingleAppointment);

export default router;
