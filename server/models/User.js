import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 8,
  },
  password: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const User = new mongoose.model("User", userSchema);

export default User;
