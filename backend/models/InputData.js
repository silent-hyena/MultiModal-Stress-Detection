import mongoose from "mongoose";

const inputDataSchema = new mongoose.Schema(
  {
    inputID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
  },
  { timestamps: true }
);

const InputData = mongoose.model("InputData", inputDataSchema);

export default InputData;
