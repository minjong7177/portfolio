async function loadProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <button onclick="deleteProject(${p.id})">삭제</button>
        `;

        list.appendChild(div);
    });
}

async function addProject() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, desc })
    });

    loadProjects();
}

async function deleteProject(id) {
    await fetch(`/api/projects/${id}`, {
        method: "DELETE"
    });

    loadProjects();
}

loadProjects();
