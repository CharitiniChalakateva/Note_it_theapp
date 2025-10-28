import './js/header.js';
import './js/footer.js';
import './js/faq.js';
import './js/folders.js';
import './js/upload.js';
import './js/notebooks.js';

// Κεντρικό shared state
window.APP = {
  lang: 'el',
  texts: {
    el: {
      tagline: "Η ψηφιακή πλατφόρμα σημειώσεων για φοιτητές",
      welcome: "Οργάνωσε, συγχρόνισε και βρες τις σημειώσεις σου εύκολα",
      hero_desc: "Δωρεάν και πολυπλατφορμική εφαρμογή για φοιτητές.",
      notebooks: "Τετράδια",
      add_hint: "Πάτησε για να δημιουργήσεις νέο τετράδιο",
      profile: "Προφίλ",
      profile_settings: "Ρυθμίσεις Προφίλ",
      back: "Επιστροφή",
      footer: "© 2025 Noted It!",
      faq_items: [
        { q: "Πώς φτιάχνω τετράδιο;", a: "Πάτησε το + και γράψε όνομα." },
        { q: "Πώς αλλάζω θέμα;", a: "Πάτησε το ☀️/🌙 στο πάνω δεξιά." },
        { q: "Πώς ανεβάζω αρχεία;", a: "Δεξί κλικ σε ένα τετράδιο → Upload. Υποστηρίζονται εικόνες & PDF." }
      ],
      ctx_folder: "Φάκελος",
      ctx_rename: "Μετονομασία",
      ctx_upload: "Upload",
      ctx_delete: "Διαγραφή",
      create_folder_prompt: "Όνομα φακέλου:",
      notebook_prompt: "Όνομα τετραδίου:"
    },
    en: {
      tagline: "The note-taking platform for students",
      welcome: "Organize, sync and find your notes easily",
      hero_desc: "Free and cross-platform app for students.",
      notebooks: "Notebooks",
      add_hint: "Click to create a new notebook",
      profile: "Profile",
      profile_settings: "Profile Settings",
      back: "Back",
      footer: "© 2025 Noted It!",
      faq_items: [
        { q: "How do I create a notebook?", a: "Click the + and type a name." },
        { q: "How do I change theme?", a: "Click the ☀️/🌙 button on top-right." },
        { q: "How to upload files?", a: "Right click a notebook → Upload. Images & PDFs supported." }
      ],
      ctx_folder: "Folder",
      ctx_rename: "Rename",
      ctx_upload: "Upload",
      ctx_delete: "Delete",
      create_folder_prompt: "Folder name:",
      notebook_prompt: "Notebook name:"
    }
  },
  notebooks: [] // each: {id,title,files:[],folders:[]}
};

// global translate function (scans data-i18n)
window.APP.translate = function(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = window.APP.texts[window.APP.lang][key];
    if(val) el.textContent = val;
  });

  // Footer
  const footerText = window.APP.texts[window.APP.lang].footer;
  const ftEl = document.getElementById('footerText');
  if(ftEl) ftEl.textContent = footerText;

  // Refresh any dynamic UI that modules might expose
  if(window.APP.renderNotebooks) window.APP.renderNotebooks();
  if(window.APP.renderFAQ) window.APP.renderFAQ();
};

// initialize translations on load
window.addEventListener('DOMContentLoaded', ()=>{
  window.APP.translate();
});
