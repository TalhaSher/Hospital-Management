import mongoose from "mongoose";

const ManagementSchema = mongoose.Schema({
  role: {
    type: String,
    default: "management",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Management = mongoose.model("Management", ManagementSchema);

export default Management;
