from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask API is running!"

@app.route("/api/profile")
def profile():
    return jsonify({
        "name": "JAY",
        "job": "Software Developer",
        "skills": ["Python", "Flask", "JavaScript"]
    })

# Vercel용 handler
def handler(request, response):
    return app(request.environ, response.start_response)
