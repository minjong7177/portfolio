async function loadProjects() {
  const list = document.getElementById('list');
  list.innerHTML = '<p class="empty">불러오는 중...</p>';

  try {
    const res = await fetch('/api/projects');
    const data = await res.json();

    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<p class="empty">프로젝트가 없습니다. 첫 프로젝트를 추가해보세요!</p>';
      return;
    }

    data.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <span class="card-tag">Web App</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="card-foot">
          <button class="btn-delete" onclick="deleteProject(${p.id})">삭제</button>
        </div>
      `;
      list.appendChild(card);
    });

  } catch (e) {
    list.innerHTML = '<p class="empty">데이터를 불러올 수 없습니다.</p>';
  }
}

async function addProject() {
  const titleEl = document.getElementById('title');
  const descEl = document.getElementById('desc');
  const title = titleEl.value.trim();
  const desc = descEl.value.trim();

  if (!title || !desc) {
    alert('프로젝트 이름과 설명을 모두 입력해주세요.');
    return;
  }

  await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, desc })
  });

  titleEl.value = '';
  descEl.value = '';
  loadProjects();
}

async function deleteProject(id) {
  if (!confirm('이 프로젝트를 삭제할까요?')) return;

  await fetch(`/api/projects/${id}`, { method: 'DELETE' });
  loadProjects();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadProjects();
