# app.py

from flask import Flask, request, jsonify
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
import torch
import torch.nn.functional as F

# Initialize the Flask application
app = Flask(__name__)

# --- Load the Saved Model and Tokenizer ---
# Make sure the path points to the directory where your model is saved
model_path = "./text_stress_model"
try:
    model = DistilBertForSequenceClassification.from_pretrained(model_path)
    tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)
    print("Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    # You might want to exit or handle this error appropriately
    model = None
    tokenizer = None

# Move model to GPU if available, otherwise CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
if model:
    model.to(device)

# --- Prediction Function ---
def predict_stress(text):

    if not model or not tokenizer:
        return {"error": "Model not loaded"}

    model.eval()

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    probabilities = F.softmax(logits, dim=1)  # [no_stress, stress]
    
    stress_prob = probabilities[0][1].item()

    # B Tier bucket mapping
    if stress_prob < 0.33:
        stress_level = "low"
    elif stress_prob < 0.66:
        stress_level = "medium"
    else:
        stress_level = "high"

    return {
        "binary_class": int(stress_prob >= 0.5),   # original model binary class still returned if needed
        "stress_level": stress_level,
        "stress_probability": stress_prob
    }


# --- API Endpoint ---
@app.route('/predict', methods=['POST'])
def handle_prediction():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    
    # Check if the JSON contains the 'text' key
    if 'text' not in data:
        return jsonify({"error": "Missing 'text' key in request body"}), 400

    text_to_predict = data['text']
    
    # Get the prediction from the model
    prediction = predict_stress(text_to_predict)
    
    return jsonify(prediction)

# This allows you to run the app by executing "python app.py"
if __name__ == '__main__':
    app.run(debug=True, port=4000)