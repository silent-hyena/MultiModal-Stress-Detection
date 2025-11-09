import mongoose from "mongoose";

const userActivityLogSchema = new mongoose.Schema(
  {
    userActID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelaxationActivity",
      required: true,
    },
  },
  { timestamps: true }
);

const UserActivityLog = mongoose.model("UserActivityLog", userActivityLogSchema);

export default UserActivityLog;
