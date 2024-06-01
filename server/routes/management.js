import express from "express";
import {
  createManagement,
  loginManagement,
  createDoctor,
  getdoctors,
  getdoctor,
  getappointments,
} from "../controllers/management.js";

const router = express.Router();

router.post("/create/management", createManagement);

router.post("/login", loginManagement);

router.post("/create/doctor", createDoctor);

router.get("/doctors", getdoctors);

router.get("/getappointments", getappointments);

router.get("/doctors/:id", getdoctor);

export default router;
