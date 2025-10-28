window.APP.createFolder = function(nbId){
  const promptText = window.APP.texts[window.APP.lang].create_folder_prompt || "Folder name:";
  const name = prompt(promptText) || null;
  if(!name) return;
  const nb = window.APP.notebooks.find(x=>x.id === nbId);
  if(!nb) return;
  nb.folders = nb.folders || [];
  nb.folders.push({ id: Date.now(), title: name, notes: []});
  if(window.APP.renderNotebooks) window.APP.renderNotebooks();
};

window.APP.renameNotebook = function(nbId){
  const nb = window.APP.notebooks.find(x=>x.id === nbId);
  if(!nb) return;
  const newName = prompt(window.APP.texts[window.APP.lang].notebook_prompt || "New name:", nb.title);
  if(newName) {
    nb.title = newName;
    if(window.APP.renderNotebooks) window.APP.renderNotebooks();
  }
};

window.APP.deleteNotebook = function(nbId){
  if(!confirm("Confirm deletion?")) return;
  window.APP.notebooks = window.APP.notebooks.filter(x=>x.id !== nbId);
  if(window.APP.renderNotebooks) window.APP.renderNotebooks();
};
