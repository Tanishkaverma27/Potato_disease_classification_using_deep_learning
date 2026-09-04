from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image, ImageOps
import io

# =============================
# Initialize Flask app
# =============================
app = Flask(__name__)
CORS(app)  # allow frontend requests

# =============================
# Load the trained model
# =============================
MODEL_PATH = r"D:\ai  waste classifier\Deep Learning\Potato_Disease\models\1"
model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model loaded successfully")

# =============================
# Class names (same order as training)
# =============================
class_names = [
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy'
]

IMAGE_SIZE = 256  # must match your model

# =============================
# Image preprocessing
# =============================
def preprocess_image(image_bytes):
    # Open the image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Fix EXIF orientation (critical for real-world photos)
    image = ImageOps.exif_transpose(image)

    # Resize to match model input
    image = image.resize((IMAGE_SIZE, IMAGE_SIZE))

    # Convert to numpy array (keep uint8!)
    image_array = np.array(image, dtype=np.uint8)

    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    return image_array

# =============================
# Prediction endpoint
# =============================
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = preprocess_image(file.read())

    # Predict
    predictions = model.predict(img, verbose=0)

    predicted_index = int(np.argmax(predictions[0]))
    predicted_class = class_names[predicted_index]
    confidence = float(np.max(predictions[0]) * 100)

    # Return result
    return jsonify({
        "class": predicted_class,
        "confidence": round(confidence, 2),
        "raw": predictions[0].tolist()  # optional, useful for debugging
    })

# =============================
# Run the server
# =============================
if __name__ == "__main__":
    app.run(debug=True)
