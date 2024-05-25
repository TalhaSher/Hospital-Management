import express from "express";
import {
  getAllDoctors,
  getDoctor,
  setAppointment,
  userLogin,
  userRegister,
  persistUser,
  userPersistent,
  getUserAppointments,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", userPersistent, persistUser);
router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctor);
router.get("/appointments", getUserAppointments);
router.post("/doctors/:doctorId", setAppointment);
router.post("/login", userLogin);
router.post("/register", userRegister);

export default router;
