import mongoose from "mongoose";

const stressLogInputDataSchema = new mongoose.Schema(
  {
    logID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StressLog",
      required: true,
    },
    inputID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InputData",
      required: true,
    },
  },
  { timestamps: true }
);

stressLogInputDataSchema.index({ logID: 1, inputID: 1 }, { unique: true });

const StressLogInputData = mongoose.model("StressLogInputData", stressLogInputDataSchema);

export default StressLogInputData;
