from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# ✅ Import AI logic
from ai_measure import estimate_plant_length

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# In-memory leaderboard
leaderboard = []

@app.route('/upload', methods=['POST'])
def upload_image():
    image = request.files.get('image')
    category = request.form.get('category')
    length = request.form.get('length')
    username = request.form.get('username')

    if not image or not category or not length or not username:
        return jsonify({"error": "Missing fields"}), 400

    try:
        length = float(length)
    except ValueError:
        return jsonify({"error": "Invalid length"}), 400

    filename = image.filename
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    print(f"Saving to: {save_path}")  # For debugging
    image.save(save_path)

    # Save submission
    leaderboard.append({
        "username": username,
        "category": category,
        "length": length,
        "image": filename
    })

    # Sort leaderboard by length for this category
    sorted_board = sorted(
        [entry for entry in leaderboard if entry["category"] == category],
        key=lambda x: x["length"],
        reverse=True
    )

    # Find current rank
    rank = next(
        (i + 1 for i, entry in enumerate(sorted_board)
         if entry["username"] == username and entry["image"] == filename),
        -1
    )

    return jsonify({
        "message": f"{filename} uploaded successfully.",
        "category": category,
        "length": length,
        "rank": rank
    })

@app.route('/ai-upload', methods=['POST'])
def ai_upload():
    image = request.files.get('image')
    category = request.form.get('category')
    username = request.form.get('username')

    if not image or not category or not username:
        return jsonify({"error": "Missing fields"}), 400

    # Estimate length using AI
    result = estimate_plant_length(image.read())

    if "error" in result:
        return jsonify(result), 400

    length = result["plant_length_cm"]

    # Save image again (rewind the stream)
    filename = image.filename
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    image.stream.seek(0)
    image.save(save_path)

    # Add to leaderboard
    leaderboard.append({
        "username": username,
        "category": category,
        "length": length,
        "image": filename
    })

    sorted_board = sorted(
        [entry for entry in leaderboard if entry["category"] == category],
        key=lambda x: x["length"],
        reverse=True
    )

    rank = next(
        (i + 1 for i, entry in enumerate(sorted_board)
         if entry["username"] == username and entry["image"] == filename),
        -1
    )

    return jsonify({
        "message": f"{filename} uploaded via AI.",
        "category": category,
        "length": length,
        "rank": rank,
        "scale_info": result["scale_cm_per_px"]
    })

@app.route('/')
def index():
    return "PlantChamp backend is running."

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(leaderboard)

if __name__ == '__main__':
    app.run(debug=True)
