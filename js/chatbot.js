// chatbot.js — AI version with fallback FAQ
(function(){
  const root = document.getElementById('chat-root');
  if(!root) return;

  root.innerHTML = `
    <div id="chat-widget">
      <button class="chat-toggle" id="chat-toggle">💬</button>
      <div class="chat-window" id="chat-window" style="display:none">
        <div class="chat-header">
          <div><strong>Tanak's AI Bot</strong><div class="text-muted" style="font-size:12px">Ask about my skills, experience or projects</div></div>
          <button id="chat-close" style="background:none;border:none;color:var(--muted);cursor:pointer">✕</button>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input">
          <input id="chat-input" placeholder="Ask me anything..." />
          <button id="chat-send">Send</button>
        </div>
      </div>
    </div>
  `;

  const toggle = document.getElementById('chat-toggle');
  const win = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  function addMsg(text, from='bot'){
    const el = document.createElement('div');
    el.style.margin = '8px 0';
    el.style.fontSize = '14px';
    el.innerHTML = from === 'user'
      ? `<div style=\"text-align:right;color:#cbd5e1\">${text}</div>`
      : `<div style=\"color:#e6edf3\">${text}</div>`;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  toggle.onclick = ()=>{win.style.display='block';toggle.style.display='none';addMsg('Hi! I\'m Tanak\'s AI assistant 🤖');};
  closeBtn.onclick = ()=>{win.style.display='none';toggle.style.display='flex';};
  send.onclick = submit;
  input.onkeydown = e => e.key === 'Enter' && submit();

  async function submit(){
    const text = input.value.trim();
    if(!text) return;
    addMsg(text,'user');
    input.value='';
    addMsg('Thinking...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      messages.lastChild.remove(); // remove 'Thinking...'
      addMsg(data.reply || 'No response.');
    } catch (err) {
      messages.lastChild.remove();
      addMsg('Error connecting to AI. Try again later.');
    }
  }
})();
