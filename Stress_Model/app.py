# app.py

from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import torch.nn.functional as F

app = Flask(__name__)

# ---------------------------
# Load Model From HuggingFace
# ---------------------------
# ayushpanwar/text-stress-model
MODEL_NAME = "ayushpanwar/text-stress-model"  

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    print("Model & tokenizer loaded from HuggingFace successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    tokenizer = None
    model = None

# Device config
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
if model:
    model.to(device)


# Prediction Function

def predict_stress(text):
    if not tokenizer or not model:
        return {"error": "Model not loaded"}

    model.eval()

    inputs = tokenizer(
        text, 
        return_tensors="pt",
        truncation=True,
        padding=True
    ).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    probabilities = F.softmax(logits, dim=1)
    stress_prob = probabilities[0][1].item()

    # Bucket mapping
    if stress_prob < 0.33:
        stress_level = "low"
    elif stress_prob < 0.66:
        stress_level = "medium"
    else:
        stress_level = "high"

    return {
        "binary_class": int(stress_prob >= 0.5),
        "stress_level": stress_level,
        "stress_probability": round(stress_prob, 4)
    }



@app.route("/predict", methods=["POST"])
def handle_prediction():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    if "text" not in data:
        return jsonify({"error": "Missing 'text' key"}), 400

    text = data["text"]
    prediction = predict_stress(text)

    return jsonify(prediction)


@app.route("/", methods=["GET"])
def home():
    return {"message": "Stress Detection API running"}


if __name__ == "__main__":
    app.run(debug=True, port=4000, host="0.0.0.0")
