import mongoose from "mongoose";

const relaxationActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  activityType: String,
  stressLevel: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 15 // 15 days in seconds
  }
}, { timestamps: true });


const RelaxationActivity = mongoose.model("RelaxationActivity", relaxationActivitySchema);

export default RelaxationActivity;
