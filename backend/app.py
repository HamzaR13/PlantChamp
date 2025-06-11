from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_image():
    image = request.files.get('image')
    category = request.form.get('category')

    if not image or not category:
        return jsonify({"error": "Image and category are required."}), 400

    filename = image.filename
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    print(f"Saving to: {save_path}")  # For debugging
    image.save(save_path)

    # Stubbed rank logic
    fake_rank = 7

    return jsonify({
        "message": f"{filename} uploaded successfully.",
        "category": category,
        "rank": fake_rank
    })

@app.route('/')
def index():
    return "PlantChamp backend is running."

if __name__ == '__main__':
    app.run(debug=True)
