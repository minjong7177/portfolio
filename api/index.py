from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 임시 저장소 (서버 재시작하면 초기화됨)
projects = [
    {
        "id": 1,
        "title": "Stock Analyzer",
        "desc": "주식 분석 웹 서비스"
    }
]

# ✅ 전체 조회
@app.route("/api/projects", methods=["GET"])
def get_projects():
    return jsonify(projects)

# ✅ 추가
@app.route("/api/projects", methods=["POST"])
def add_project():
    data = request.json
    new_project = {
        "id": len(projects) + 1,
        "title": data.get("title"),
        "desc": data.get("desc")
    }
    projects.append(new_project)
    return jsonify({"message": "추가 완료", "data": new_project})

# ✅ 삭제
@app.route("/api/projects/<int:id>", methods=["DELETE"])
def delete_project(id):
    global projects
    projects = [p for p in projects if p["id"] != id]
    return jsonify({"message": "삭제 완료"})

# 상태 확인
@app.route("/")
def home():
    return jsonify({"status": "running"})

# Vercel handler
def handler(request, response):
    return app(request.environ, response.start_response)
