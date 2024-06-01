import Management from "../models/Management.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

await mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => {
  console.log("Database Connected !");
});

const password = "talha";

const seedDB = async () => {
  Management.deleteMany({});
  const salt = bcrypt.genSaltSync();
  const hashedPwd = bcrypt.hashSync(password, salt);

  const management = new Management({
    role: "management",
    email: "excaliburx1337@gmail.com",
    password: hashedPwd,
  });

  await management.save();

  console.log("done 👍");
};

seedDB();
