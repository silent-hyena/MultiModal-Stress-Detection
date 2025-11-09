import React, { useState } from "react";
import "./TextStress.css";

const TextStress = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/stress/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="textstress-page">
      <div className="textstress-card">
        
        <h2>Describe how you feel today</h2>

        <textarea
          className="textstress-input"
          placeholder="Write your thoughts, day experience, mood here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="textstress-btn" onClick={handleAnalyze} disabled={loading || !text.trim()}>
          {loading ? "Analyzing..." : "Analyze Stress"}
        </button>

        {result && (
          <div className="textstress-result">
            <h3>Result</h3>
            <p><b>Stress Level:</b> {result.stress_level}</p>
            <p><b>Probability:</b> {Number(result.stress_probability).toFixed(3)}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default TextStress;
