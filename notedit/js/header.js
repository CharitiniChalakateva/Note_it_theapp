const faqBtn = document.getElementById('faqBtn');
const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const profWrap = document.getElementById('profileWrap');

faqBtn.addEventListener('click', ()=> {
  const ev = new Event('openFAQ');
  window.dispatchEvent(ev);
});

langBtn.addEventListener('click', ()=> {
  window.APP.lang = window.APP.lang === 'el' ? 'en' : 'el';
  window.APP.translate();
  // update lang button label to reflect possibility
  langBtn.textContent = window.APP.lang === 'el' ? 'EN/ΕΛ' : 'EN/ΕΛ';
});

themeBtn.addEventListener('click', ()=> {
  document.body.classList.toggle('dark');
});

// Profile modal handlers (simple)
const profModal = document.getElementById('profileModal');
const profClose = document.getElementById('profileClose');
const cancelProfile = document.getElementById('cancelProfile');
const saveProfile = document.getElementById('saveProfile');

profWrap && profWrap.addEventListener('click', ()=> {
  profModal.classList.remove('hidden');
});

profClose && profClose.addEventListener('click', ()=> profModal.classList.add('hidden'));
cancelProfile && cancelProfile.addEventListener('click', ()=> profModal.classList.add('hidden'));

saveProfile && saveProfile.addEventListener('click', ()=>{
  const n = document.getElementById('pName').value;
  if(n) document.querySelector('.profile-label').textContent = n.split(' ')[0];
  profModal.classList.add('hidden');
});
