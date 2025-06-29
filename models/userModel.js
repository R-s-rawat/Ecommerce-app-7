import mongoose from "mongoose";
// passing object to mongoose's Schema method

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer:{
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// // 2 objects passed to users in MongoDB through this schema
// // role is by default 0,
// as we have users in MongoDB so we store userSchema there inside users
export default mongoose.model("users", userSchema);
