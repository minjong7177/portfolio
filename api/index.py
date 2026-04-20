from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 메모리 저장소 (Vercel은 서버리스라 DB 연동 권장)
projects = [
    {"id": 1, "title": "Stock Analyzer", "desc": "주식 분석 웹 서비스"},
    {"id": 2, "title": "JAY Portfolio", "desc": "Flask + Vercel 포트폴리오 사이트"},
]

next_id = {"value": 3}  # mutable으로 관리


@app.route("/api/projects", methods=["GET"])
def get_projects():
    return jsonify(projects)


@app.route("/api/projects", methods=["POST"])
def add_project():
    data = request.json
    if not data or not data.get("title") or not data.get("desc"):
        return jsonify({"error": "title과 desc는 필수입니다."}), 400

    new_project = {
        "id": next_id["value"],
        "title": data["title"],
        "desc": data["desc"],
    }
    projects.append(new_project)
    next_id["value"] += 1
    return jsonify({"message": "추가 완료", "data": new_project}), 201


@app.route("/api/projects/<int:project_id>", methods=["DELETE"])
def delete_project(project_id):
    global projects
    before = len(projects)
    projects = [p for p in projects if p["id"] != project_id]
    if len(projects) == before:
        return jsonify({"error": "프로젝트를 찾을 수 없습니다."}), 404
    return jsonify({"message": "삭제 완료"})


@app.route("/")
def home():
    return app.send_static_file("index.html")


# Vercel serverless entry point
app = app
