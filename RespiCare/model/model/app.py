from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React app

# Load trained model and preprocessing tools
try:
    model = joblib.load("respiratory_model.pkl")
    scaler = joblib.load("scaler.pkl")
    label_encoder = joblib.load("label_encoder.pkl")
except Exception as e:
    print(f"Error loading model or preprocessing tools: {e}")
    model, scaler, label_encoder = None, None, None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None or label_encoder is None:
        return jsonify({"error": "Model or preprocessing tools not loaded properly"}), 500

    data = request.get_json()
    input_data = data.get("features")  # Expecting an array of features
    
    if not input_data:
        return jsonify({"error": "No input data provided"}), 400
    
    try:
        input_array = np.array(input_data).reshape(1, -1)
        input_scaled = scaler.transform(input_array)
        prediction = model.predict(input_scaled)
        disease_name = label_encoder.inverse_transform([prediction[0]])[0]
        return jsonify({"predicted_disease": disease_name})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)  # Allow external access
