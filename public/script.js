async function loadProfile() {
    try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        document.getElementById("job").innerText = data.job;

        const skillsDiv = document.getElementById("skills");
        data.skills.forEach(skill => {
            const span = document.createElement("span");
            span.innerText = skill;
            skillsDiv.appendChild(span);
        });

        document.getElementById("status").innerText = "✅ API Connected";
    } catch (err) {
        document.getElementById("status").innerText = "❌ API Error";
    }
}

loadProfile();
