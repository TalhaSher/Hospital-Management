import express from "express";
import {
  createManagement,
  loginManagement,
  createDoctor,
  getdoctors,
  getdoctor,
} from "../controllers/management";

const router = express.Router();

router.post("/create/management", createManagement);

router.post("/login", loginManagement);

router.post("/create/doctor", createDoctor);

router.get("/doctors", getdoctors);

router.get("/doctors/:id", getdoctor);
