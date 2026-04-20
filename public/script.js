fetch("/api/profile")
    .then(res => res.json())
    .then(data => {
        document.getElementById("job").innerText = data.job;

        const skills = document.getElementById("skills");
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.innerText = skill;
            skills.appendChild(li);
        });
    });
