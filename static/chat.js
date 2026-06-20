/* ─── PERSONA DATA ─── */
const PERSONAS = [
  {
    id:'varahi', name:'Varahi', tag:'Friendly & Warm',
    color:'#f472b6', accent:'#ec4899', gender:'girl',
    system:'You are Varahi, a warm and caring AI. Be kind, encouraging, and emotionally supportive.'
  },
  {
    id:'vega', name:'Vega', tag:'Sharp & Direct',
    color:'#a78bfa', accent:'#7c3aed', gender:'girl',
    system:'You are Vega, a sharp and precise AI. Cut to the point, avoid fluff, and give confident, efficient answers.'
  },
  {
    id:'aruvi', name:'Aruvi', tag:'Calm & Flowing',
    color:'#60a5fa', accent:'#2563eb', gender:'girl',
    system:'You are Aruvi, a calm and thoughtful AI. Think step by step, consider multiple angles, and give well-reasoned, measured responses.'
  },
  {
    id:'agni', name:'Agni', tag:'Bold & Fierce',
    color:'#fb923c', accent:'#ea580c', gender:'boy',
    system:'You are Agni, a bold and high-energy AI! Be intense, motivating, and ignite the user with passion and energy!'
  }
];

/* ─── STATE ─── */
let activeId = 'varahi';
const conversations = { varahi:[], vega:[], aruvi:[], agni:[] };
let isLoading = false;

/* ─── SVG AVATARS ─── */
function girlSVG(color, size=50){
  return `<svg width="${size}" height="${size}" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="${color}" opacity=".18"/>
    <circle cx="25" cy="19" r="8" fill="${color}"/>
    <path d="M12 45c0-7.18 5.82-13 13-13s13 5.82 13 13" fill="${color}" opacity=".7"/>
    <path d="M17 16 Q16 10 25 9 Q34 10 33 16" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M14 17 Q12 13 16 15" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M36 17 Q38 13 34 15" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`;
}

function boySVG(color, size=50){
  return `<svg width="${size}" height="${size}" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="${color}" opacity=".18"/>
    <circle cx="25" cy="19" r="8" fill="${color}"/>
    <path d="M12 45c0-7.18 5.82-13 13-13s13 5.82 13 13" fill="${color}" opacity=".7"/>
    <rect x="18" y="10" width="14" height="5" rx="2.5" fill="${color}"/>
    <rect x="23" y="8" width="5" height="4" rx="1.5" fill="${color}"/>
  </svg>`;
}

function avatarHTML(persona, size=50){
  return persona.gender === 'girl' ? girlSVG(persona.color, size) : boySVG(persona.color, size);
}

/* ─── BUILD SIDEBAR ─── */
function buildSidebar(){
  const list = document.getElementById('persona-list');
  list.innerHTML = PERSONAS.map(p => `
    <div class="persona-item ${p.id===activeId?'active':''}" data-id="${p.id}" onclick="switchPersona('${p.id}')">
      <div class="persona-avatar">${avatarHTML(p,50)}</div>
      <div class="persona-info">
        <div class="persona-name">${p.name}</div>
        <div class="persona-tag">${p.tag}</div>
      </div>
      <div class="persona-dot"></div>
    </div>
  `).join('');
}

/* ─── UPDATE HEADER ─── */
function updateHeader(){
  const p = PERSONAS.find(x => x.id === activeId);
  document.getElementById('header-avatar').innerHTML = avatarHTML(p, 46);
  document.getElementById('header-name').textContent = p.name;
  document.getElementById('header-badge').textContent = p.tag;
  document.getElementById('msg-input').placeholder = `Message ${p.name}...`;
}

/* ─── RENDER MESSAGES ─── */
function renderMessages(){
  const p = PERSONAS.find(x => x.id === activeId);
  const msgs = conversations[activeId];
  const box = document.getElementById('messages');

  if(msgs.length === 0){
    box.innerHTML = `
      <div class="empty-state">
        <div>${avatarHTML(p, 72)}</div>
        <div>
          <div class="es-title">Say something to ${p.name}</div>
          <div class="es-sub">${p.tag}</div>
        </div>
      </div>`;
    return;
  }

  box.innerHTML = msgs.map(m => {
    const time = new Date(m.ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    if(m.role === 'user'){
      return `
        <div class="msg-row user">
          <div class="msg-col">
            <div class="bubble user" style="background:${p.accent}">${escHtml(m.content)}</div>
            <div class="msg-time">${time}</div>
          </div>
        </div>`;
    } else {
      return `
        <div class="msg-row">
          <div class="msg-avatar-sm">${avatarHTML(p, 34)}</div>
          <div class="msg-col">
            <div class="bubble ai">${escHtml(m.content)}</div>
            <div class="msg-time">${time}</div>
          </div>
        </div>`;
    }
  }).join('');

  scrollToBottom();
}

function showTyping(){
  const p = PERSONAS.find(x => x.id === activeId);
  const row = document.createElement('div');
  row.className = 'typing-row';
  row.id = 'typing-indicator';
  row.innerHTML = `
    <div class="msg-avatar-sm">${avatarHTML(p,34)}</div>
    <div class="typing-bubble">
      <div class="dot-bounce" style="background:${p.color}"></div>
      <div class="dot-bounce" style="background:${p.color}"></div>
      <div class="dot-bounce" style="background:${p.color}"></div>
    </div>`;
  document.getElementById('messages').appendChild(row);
  scrollToBottom();
}

function hideTyping(){
  const el = document.getElementById('typing-indicator');
  if(el) el.remove();
}

function scrollToBottom(){
  const box = document.getElementById('messages');
  box.scrollTop = box.scrollHeight;
}

function escHtml(str){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/\n/g,'<br>');
}

/* ─── SWITCH PERSONA ─── */
function switchPersona(id){
  activeId = id;
  document.querySelectorAll('.persona-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });
  updateHeader();
  renderMessages();
  updateSendBtn();
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('msg-input').focus();
}

/* ─── SEND BUTTON STATE ─── */
function updateSendBtn(){
  const p = PERSONAS.find(x => x.id === activeId);
  const btn = document.getElementById('send-btn');
  const hasText = document.getElementById('msg-input').value.trim().length > 0;
  const active = hasText && !isLoading;
  btn.disabled = !active;
  btn.style.background = active ? p.accent : '#e2e8f0';
}

/* ─── SEND MESSAGE ─── */
async function sendMessage(){
  const input = document.getElementById('msg-input');
  const text = input.value.trim();
  if(!text || isLoading) return;

  conversations[activeId].push({ role:'user', content:text, ts:Date.now() });
  input.value = '';
  input.style.height = 'auto';
  isLoading = true;
  updateSendBtn();
  renderMessages();
  showTyping();

  try {
    const history = conversations[activeId].map(m => ({role:m.role, content:m.content}));

    const res = await fetch('/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ persona: activeId, messages: history })
    });
    const data = await res.json();
    const reply = data.reply || 'Something went wrong. Please try again!';

    conversations[activeId].push({ role:'assistant', content:reply, ts:Date.now() });

  } catch(e) {
    conversations[activeId].push({
      role:'assistant',
      content:'Something went wrong. Please try again!',
      ts:Date.now()
    });
  }

  isLoading = false;
  hideTyping();
  renderMessages();
  updateSendBtn();
  input.focus();
}

/* ─── INPUT EVENTS ─── */
const input = document.getElementById('msg-input');

input.addEventListener('input', function(){
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  updateSendBtn();
});

input.addEventListener('keydown', function(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById('send-btn').addEventListener('click', sendMessage);

/* ─── INIT ─── */
buildSidebar();
updateHeader();
renderMessages();
updateSendBtn();
input.focus();

/* ─── SPLASH SCREEN DISMISS ─── */
async function dismissLoader() {
  try {
    await fetch('/');
  } catch(e) {}
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.4s ease';
    setTimeout(() => loader.style.display = 'none', 400);
  }
}

// Dismiss after server responds OR after 30s max timeout
Promise.race([
  dismissLoader(),
  new Promise(resolve => setTimeout(resolve, 30000))
]).then(() => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.4s ease';
    setTimeout(() => loader.style.display = 'none', 400);
  }
});