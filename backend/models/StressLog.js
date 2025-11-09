import mongoose from "mongoose";

const stressLogSchema = new mongoose.Schema(
  {
    logID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const StressLog = mongoose.model("StressLog", stressLogSchema);

export default StressLog;
