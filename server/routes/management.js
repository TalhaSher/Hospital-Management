import express from "express";
import {
  createManagement,
  loginManagement,
  createDoctor,
  getdoctors,
  getdoctor,
  getappointments,
  deleteDoctor,
  managementPersistent,
  persistManagement,
} from "../controllers/management.js";

const router = express.Router();

router.get("/", managementPersistent, persistManagement);

router.post("/create/management", createManagement);

router.post("/login", loginManagement);

router.post("/create/doctor", createDoctor);

router.get("/doctors", getdoctors);

router.get("/getappointments", getappointments);

router.get("/doctors/:id", getdoctor);

router.delete("/deleteDoctor/:id", deleteDoctor);

export default router;
