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

const password = "yourpassword";

const seedDB = async () => {
  await Doctor.deleteMany({});
  const salt = await bcrypt.genSalt();
  const hashpassword = bcrypt.hash(password, salt);
  for (let i = 0; i < 50; i++) {
    const doctor = new Doctor({
      role: "doctor",
      firstName: "Talha",
      lastName: "Khan",
      email: `talhasher123${i}@gmail.com`,
      password: await hashpassword,
      doctorOf: "ENT",
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
