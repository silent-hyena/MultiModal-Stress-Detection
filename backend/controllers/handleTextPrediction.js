export const textPrediction = async (req, res) => {
  
  try {
    
    const { text } = req.body;
    

    const response = await fetch(process.env.TEXT_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });


    const data = await response.json();
    const { stress_level, stress_probability, binary_class } = data;  

    return res.status(200).json({
      success: true,
      stress_level,
      stress_probability,
      binary_class
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
