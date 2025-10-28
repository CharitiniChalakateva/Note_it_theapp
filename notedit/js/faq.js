const faqModal = document.getElementById('faqModal');
const faqClose = document.getElementById('faqClose');
const faqBack = document.getElementById('faqBack');
const faqList = document.getElementById('faqList');

function buildFAQ() {
  const items = window.APP.texts[window.APP.lang].faq_items || [];
  faqList.innerHTML = items.map(it=>`
    <div class="faq-item">
      <b>${it.q}</b>
      <p>${it.a}</p>
    </div>
  `).join('');
}

// expo για app.js
window.APP.renderFAQ = buildFAQ;

faqClose.addEventListener('click', ()=> faqModal.classList.add('hidden'));
faqBack.addEventListener('click', ()=> faqModal.classList.add('hidden'));

window.addEventListener('openFAQ', ()=>{
  buildFAQ();
  faqModal.classList.remove('hidden');
});
