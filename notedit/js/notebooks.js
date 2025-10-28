const addNotebookBtn = document.getElementById('addNotebook');
const notebooksWrap = document.getElementById('notebooksWrap');
const ctxEl = document.getElementById('ctx');

let lastContext = { id: null, time: 0 };

// Δημιουργία νέου τετραδίου
addNotebookBtn.addEventListener('click', ()=>{
  const promptKey = window.APP.texts[window.APP.lang].notebook_prompt || "Notebook name:";
  const name = prompt(promptKey) || ("Notebook " + Date.now());
  window.APP.notebooks.push({ id: Date.now(), title: name, files: [], folders: [] });
  renderNotebooks();
});

// render function (εμφάνιση thumbnails & pdf icons)
function renderNotebooks(){
  notebooksWrap.innerHTML = "";
  window.APP.notebooks.forEach(nb=>{
    const d = document.createElement('div');
    d.className = 'nb-card';
    d.dataset.id = nb.id;
    // title
    const title = document.createElement('div');
    title.className = 'nb-title';
    title.textContent = nb.title;
    d.appendChild(title);

    // folders list
    if(nb.folders && nb.folders.length){
      const fdiv = document.createElement('div');
      fdiv.innerHTML = `<b>Φάκελοι:</b>`;
      const list = document.createElement('div');
      list.style.fontSize='13px'; list.style.color='var(--muted)';
      list.textContent = nb.folders.map(f=>f.title).join(', ');
      fdiv.appendChild(list);
      d.appendChild(fdiv);
    }

    // files thumbnails
    const filesWrap = document.createElement('div');
    filesWrap.className = 'nb-thumbs';
    (nb.files || []).forEach(file=>{
      const cell = document.createElement('div');
      cell.className = 'nb-thumb';
      if(file.type === 'image' && file.data){
        const img = document.createElement('img');
        img.src = file.data;
        img.title = file.name;
        cell.appendChild(img);
        filesWrap.appendChild(cell);
      } else if(file.type === 'pdf'){
        const p = document.createElement('div');
        p.className = 'nb-pdf';
        p.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#374151" stroke-width="1.2" fill="#fff"/>
          <text x="12" y="18" font-size="8" text-anchor="middle" fill="#374151">PDF</text>
        </svg>`;
        p.title = file.name;
        // clicking pdf opens in new tab
        p.style.cursor='pointer';
        p.addEventListener('click', ()=> window.open(file.url, '_blank'));
        cell.appendChild(p);
        filesWrap.appendChild(cell);
      } else {
        const p = document.createElement('div');
        p.className = 'nb-pdf';
        p.textContent = file.name;
        cell.appendChild(p);
        filesWrap.appendChild(cell);
      }
    });
    d.appendChild(filesWrap);

    // attach contextmenu for options and detect double-right-click for folder creation
    d.addEventListener('contextmenu', (ev)=>{
      ev.preventDefault();
      const now = Date.now();
      if(lastContext.id === nb.id && (now - lastContext.time) < 450){
        // double right-click: create folder
        window.APP.createFolder && window.APP.createFolder(nb.id);
        lastContext = { id: null, time: 0 };
        return;
      }
      lastContext = { id: nb.id, time: now };

      // show custom context menu
      showContextMenu(nb.id, ev.clientX, ev.clientY);
    });

    notebooksWrap.appendChild(d);
  });
}
window.APP.renderNotebooks = renderNotebooks;

// context menu implementation
function showContextMenu(nbId, x, y){
  // remove old
  ctxEl.classList.remove('hidden');
  ctxEl.style.left = `${x}px`;
  ctxEl.style.top = `${y}px`;
  ctxEl.innerHTML = '';

  const t = window.APP.texts[window.APP.lang];
  const actions = [
    { key:'folder', label: t.ctx_folder || 'Folder' },
    { key:'rename', label: t.ctx_rename || 'Rename' },
    { key:'upload', label: t.ctx_upload || 'Upload' },
    { key:'delete', label: t.ctx_delete || 'Delete' }
  ];

  actions.forEach(a=>{
    const el = document.createElement('div');
    el.textContent = a.label;
    el.addEventListener('click', (e)=>{
      e.stopPropagation();
      ctxEl.classList.add('hidden');
      handleAction(nbId, a.key);
    });
    ctxEl.appendChild(el);
  });

  // close on global click
  setTimeout(()=>{ // small delay so immediate click doesn't close
    const onDocClick = (ev)=>{
      ctxEl.classList.add('hidden');
      document.removeEventListener('click', onDocClick);
    };
    document.addEventListener('click', onDocClick);
  }, 10);
}

function handleAction(nbId, actionKey){
  if(actionKey === 'folder') {
    window.APP.createFolder && window.APP.createFolder(nbId);
  } else if(actionKey === 'rename') {
    window.APP.renameNotebook && window.APP.renameNotebook(nbId);
  } else if(actionKey === 'delete') {
    window.APP.deleteNotebook && window.APP.deleteNotebook(nbId);
  } else if(actionKey === 'upload') {
    window.APP.uploadToNotebook && window.APP.uploadToNotebook(nbId);
  }
}

// initialize with an example notebook (for demo)
if(window.APP.notebooks.length === 0){
  window.APP.notebooks.push({ id: Date.now()+1, title: "Παράδειγμα", files: [], folders: [] });
  // optional: add a sample image if assets exist - skip for portability
}

// ensure initial render
document.addEventListener('DOMContentLoaded', renderNotebooks);
