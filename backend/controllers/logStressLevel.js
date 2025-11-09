import RelaxationActivity from "../models/RelaxationActivity.js";

export const logStress = async (req, res) => {
  try {
    const { activityType, stressLevel } = req.body;

    const newActivity = await RelaxationActivity.create({
      user: req.userId,
      activityType,
      stressLevel
    });

    return res.status(201).json({
      success: true,
      data: newActivity
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
