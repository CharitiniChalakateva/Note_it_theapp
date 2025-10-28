(()=>{

// Texts 
const texts={
 el:{tagline:"Η ψηφιακή πλατφόρμα σημειώσεων για φοιτητές",welcome:"Οργάνωσε, συγχρόνισε και βρες τις σημειώσεις σου εύκολα",hero_desc:"Δωρεάν και πολυπλατφορμική εφαρμογή για φοιτητές.",notebooks:"Τετράδια",add_hint:"Πάτησε για να δημιουργήσεις νέο τετράδιο",profile:"Προφίλ",profile_settings:"Ρυθμίσεις Προφίλ"},
 en:{tagline:"The note-taking platform for students",welcome:"Organize, sync and find your notes easily",hero_desc:"Free and cross-platform app for students.",notebooks:"Notebooks",add_hint:"Click to create a new notebook",profile:"Profile",profile_settings:"Profile Settings"}
};
let lang="el";

// Lang toggle 
function translate(){
 document.querySelectorAll("[data-i18n]").forEach(el=>{
   const key=el.getAttribute("data-i18n");
   el.textContent=texts[lang][key]||el.textContent;
 });
}
document.getElementById("langBtn").onclick=()=>{lang=lang==="el"?"en":"el";translate();};
translate();

// Theme toggle 
const themeBtn=document.getElementById("themeBtn");
themeBtn.onclick=()=>document.body.classList.toggle("dark");

// FAQ modal 
const faqModal=document.getElementById("faqModal");
document.getElementById("faqBtn").onclick=()=>{faqModal.classList.remove("hidden");buildFAQ();};
document.getElementById("faqClose").onclick=()=>faqModal.classList.add("hidden");
function buildFAQ(){
 const faqs=[{q:"Πώς φτιάχνω τετράδιο;",a:"Πάτησε το + και γράψε όνομα."},{q:"Πώς αλλάζω θέμα;",a:"Πάτησε το ☀️/🌙 στο πάνω δεξιά."}];
 const box=document.getElementById("faqList");
 box.innerHTML=faqs.map(f=>`<p><b>${f.q}</b><br>${f.a}</p>`).join("");
}

// Profile modal 
const prof=document.getElementById("profileWrap"),profM=document.getElementById("profileModal");
prof.onclick=()=>{profM.classList.remove("hidden");};
document.getElementById("profileClose").onclick=()=>profM.classList.add("hidden");
document.getElementById("cancelProfile").onclick=()=>profM.classList.add("hidden");
document.getElementById("saveProfile").onclick=()=>{
 const n=document.getElementById("pName").value;
 if(n)document.querySelector(".profile-label").textContent=n.split(" ")[0];
 profM.classList.add("hidden");
};
document.getElementById("pImage").onchange=e=>{
 const f=e.target.files[0];if(!f)return;
 const r=new FileReader();r.onload=()=>document.getElementById("profileImg").src=r.result;r.readAsDataURL(f);
};

// Notebooks logic 
let notebooks=[];
const wrap=document.getElementById("notebooksWrap");
document.getElementById("addNotebook").onclick=()=>{
 const name=prompt("Όνομα τετραδίου:")||"Τετράδιο";
 notebooks.push({id:Date.now(),title:name,files:[]});
 render();
};
function render(){
 wrap.innerHTML="";
 notebooks.forEach(nb=>{
   const d=document.createElement("div");
   d.className="nb-card";d.dataset.id=nb.id;
   d.innerHTML=`<div class="nb-title">${nb.title}</div><div class="nb-files">${nb.files.join("<br>")}</div>`;
   d.addEventListener("contextmenu",e=>{e.preventDefault();context(nb.id,e.clientX,e.clientY);});
   wrap.appendChild(d);
 });
}
function context(id,x,y){
 const old=document.getElementById("ctx");if(old)old.remove();
 const m=document.createElement("div");
 m.id="ctx";m.style=`position:fixed;left:${x}px;top:${y}px;background:#fff;border:1px solid #ccc;border-radius:6px;z-index:200;padding:4px`;
 ["Φάκελος","Μετονομασία","Upload","Διαγραφή"].forEach(act=>{
   const b=document.createElement("div");b.textContent=act;b.style.padding="6px 10px";b.style.cursor="pointer";
   b.onclick=()=>{m.remove();action(id,act);};
   m.appendChild(b);
 });
 document.body.appendChild(m);
 document.addEventListener("click",()=>m.remove(),{once:true});
}
function action(id,act){
 const nb=notebooks.find(n=>n.id==id);if(!nb)return;
 if(act.startsWith("Μετο")){const n=prompt("Νέο όνομα:",nb.title);if(n){nb.title=n;render();}}
 if(act.startsWith("Δια")){notebooks=notebooks.filter(n=>n.id!=id);render();}
 if(act.startsWith("Upload")){
   const input=document.createElement("input");input.type="file";input.multiple=true;input.onchange=e=>{
     const names=[...e.target.files].map(f=>f.name);nb.files.push(...names);render();};
   input.click();
 }
 if(act.startsWith("Φάκ"))alert("Προσομοίωση δημιουργίας φακέλου για "+nb.title);
}
})();