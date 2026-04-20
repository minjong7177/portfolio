from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ 여기!
@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to JAY API 🚀",
        "status": "running"
    })

@app.route("/api/profile")
def profile():
    return jsonify({
        "name": "JAY",
        "job": "Software Developer",
        "skills": ["Python", "Flask", "JavaScript"]
    })

# Vercel serverless handler
def handler(request, response):
    return app(request.environ, response.start_response)
