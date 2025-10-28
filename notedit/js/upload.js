window.APP.uploadToNotebook = function(nbId){
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.accept = 'image/*,application/pdf';
  input.onchange = async (e) => {
    const files = Array.from(e.target.files || []);
    const nb = window.APP.notebooks.find(n=>n.id === nbId);
    if(!nb) return;
    nb.files = nb.files || [];
    for(const f of files){
      const lower = f.type || f.name.split('.').pop().toLowerCase();
      if(f.type && f.type.startsWith('image/')){
        // image preview
        const fr = new FileReader();
        await new Promise(res=>{
          fr.onload = ()=> {
            nb.files.push({type:'image', name:f.name, data:fr.result});
            res();
          };
          fr.readAsDataURL(f);
        });
      } else if(f.type === 'application/pdf' || /\.pdf$/i.test(f.name)){
        // pdf: create blob url (preview as icon + name)
        const blobUrl = URL.createObjectURL(f);
        nb.files.push({type:'pdf', name:f.name, url:blobUrl});
      } else {
        // other: treat as generic file
        const blobUrl = URL.createObjectURL(f);
        nb.files.push({type:'file', name:f.name, url:blobUrl});
      }
    }
    if(window.APP.renderNotebooks) window.APP.renderNotebooks();
  };
  input.click();
};
