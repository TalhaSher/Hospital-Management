import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "session";

dotenv.config();
await mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => {
  console.log("Database Connected !");
});

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    maxAge: 2 * 60 * 1000,
  })
);

/* ROUTES */
import doctorRoutes from "./routes/doctor.js";
app.use("/doctor", doctorRoutes);

import managementRoutes from "./routes/management.js";
app.use("management", managementRoutes);

import patientRoutes from "./routes/patient.js";
app.use("/", patientRoutes);

app.listen("3000", () => console.log("listening to port 3000"));
