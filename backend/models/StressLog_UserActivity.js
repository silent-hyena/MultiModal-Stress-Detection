import mongoose from "mongoose";

const stressLogUserActivityLogSchema = new mongoose.Schema(
  {
    logID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StressLog",
      required: true,
    },
    userActID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserActivityLog",
      required: true,
    },
  },
  { timestamps: true }
);

stressLogUserActivityLogSchema.index({ logID: 1, userActID: 1 }, { unique: true });

const StressLogUserActivityLog = mongoose.model("StressLogUserActivityLog", stressLogUserActivityLogSchema);

export default StressLogUserActivityLog;
