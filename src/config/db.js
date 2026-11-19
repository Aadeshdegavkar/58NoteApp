import mongoose from "mongoose";

const connectDB = async () => {
  await  mongoose.connect("mongodb+srv://aadid1538_db_user:noteapp@clusternoteapp.uqnl14x.mongodb.net/")

  console.log("MongoDB connected");
}

export default connectDB;