# PlantChamp
Ranked image app for plants – upload, compete, and climb the leaderboard!
Coming soon: 
- Web deployment and progressiveness for ease of mobile use.
- More categories

Demo Video:


What is PlantChamp?
PlantChamp is a fun, competitive web platform where users:
- Upload pictures of their plants (next to their hand for scale)
- Input the measured length (or let the AI do it)
- Get ranked in categories like **Biggest Chili** or **Tallest Tomato**
- Compete on a live leaderboard


Features:
- 🔒 Simple login system (with localStorage for now)
- 🌿 Plant image upload form
- 📏 Optional AI-powered plant length detection (based on hand)
- 🥇 Live leaderboard per category
- 🧠 Clean, themed UI (plant-based palette)


Current Tech Stack:
| Area        | Tech Used                            |
|-------------|--------------------------------------|
| Frontend    | HTML, CSS, JavaScript                |
| Backend     | Python (Flask)                       |
| AI Module   | OpenCV, MediaPipe, NumPy, Pillow     |
| Data        | In-memory leaderboard (demo phase)   |


🚀 How to Run Locally (for now):
1. Clone the repository:
   git clone https://github.com/yourusername/PlantChamp.git
   cd PlantChamp
2. Setup Python 3.10 virtual environment:
   py -3.10 -m venv venv
   venv\Scripts\activate  # or source venv/bin/activate
3. Install dependencies:
   pip install -r requirements.txt
4. Run the app:
   cd backend
   python app.py
5. Open the frontend:
   Open frontend/index.html in your browser.


Current folder structure:
PlantChamp/
│
├── backend/
│   ├── app.py
│   ├── ai_measure.py
│   ├── uploads/
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── leaderboard.html
│   ├── script.js
│   └── style.css
│
├── requirements.txt
└── README.md
