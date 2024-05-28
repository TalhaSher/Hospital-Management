import mongoose from "mongoose";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

await mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => {
  console.log("Database Connected !");
});

const doctorTypes = [
  "Allergist",
  "Anesthesiologist",
  "Cardiac Electrophysiologist",
  "Cardiothoracic Surgeon",
  "Colorectal Surgeon",
  "Critical Care Medicine Specialist",
  "Dermatologist",
  "Emergency Medicine Physician",
  "Endocrinologist",
  "Family Physician",
  "Gastroenterologist",
  "General Practitioner",
  "Geriatrician",
  "Gynecologist",
  "Hematologist",
  "Infectious Disease Specialist",
  "Internist",
  "Neurologist",
  "Nephrologist",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Otolaryngologist (Ear, Nose, and Throat)",
  "Pathologist",
  "Pediatrician",
  "Physiatrist",
  "Plastic Surgeon",
  "Podiatrist",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Rheumatologist",
  "Sports Medicine Physician",
  "Surgeon",
  "Thoracic Surgeon",
  "Urogynecologist",
  "Urologist",
  "Vascular Surgeon",
];

const password = "talha";

const seedDB = async () => {
  await Doctor.deleteMany({});
  const salt = await bcrypt.genSalt();
  const hashpassword = bcrypt.hash(password, salt);
  for (let i = 0; i < 50; i++) {
    const random38 = Math.floor(Math.random() * 38 + 1);
    console.log(doctorTypes[random38]);
    const doctor = new Doctor({
      role: "doctor",
      firstName: "Talha",
      lastName: "Khan",
      email: `talhasher123${i}@gmail.com`,
      password: await hashpassword,
      doctorOf: doctorTypes[random38],
      education: "PHD",
      description:
        "I am the best doctor there is, Ofcourse i will over charge you but it will be worth it. I will definitly charge more than 5000rs a session cuz im the best, im can not be replaced",
      phoneNo: "03166394336",
      maxAppointments: 30,
    });
    await doctor.save();
  }
  console.log("Done");
};

seedDB();
