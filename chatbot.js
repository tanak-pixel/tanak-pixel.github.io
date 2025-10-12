// chatbot.js — simple floating chat widget with FAQ responses
(function(){
  const root = document.getElementById('chat-root');
  if(!root) return;

  root.innerHTML = `
    <div id="chat-widget">
      <button class="chat-toggle" id="chat-toggle">💬</button>
      <div class="chat-window" id="chat-window" style="display:none">
        <div class="chat-header">
          <div><strong>Tanak's Bot</strong><div class="text-muted" style="font-size:12px">Ask about my projects, experience, or links</div></div>
          <button id="chat-close" style="background:none;border:none;color:var(--muted);cursor:pointer">✕</button>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input">
          <input id="chat-input" placeholder="Ask: e.g. What projects do you have?" />
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
    if(from === 'user'){
      el.innerHTML = `<div style="text-align:right;color:#cbd5e1">${text}</div>`;
    } else {
      el.innerHTML = `<div style="color:#e6edf3">${text}</div>`;
    }
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  toggle.addEventListener('click', ()=>{ win.style.display = 'block'; toggle.style.display = 'none'; addMsg("Hi! Ask me about my projects, experience, GitHub or resume.") });
  closeBtn.addEventListener('click', ()=>{ win.style.display='none'; toggle.style.display='flex'; });

  function answerFAQ(q){
    q = q.toLowerCase();
    if(q.includes('github') || q.includes('repo')) {
      return `My GitHub is at https://github.com/tanak-pixel — you can browse all projects there.`;
    }
    if(q.includes('resume') || q.includes('cv')) {
      return `You can view/download my resume here: /Tanak%20Solanki-resume.pdf`;
    }
    if(q.includes('sfa') || q.includes('help desk')) {
      return `I work as a Help Desk Assistant at SFA: I support Office365, mySFA, password resets, network & device troubleshooting and classroom tech.`;
    }
    if(q.includes('languages')|| q.includes('tech') || q.includes('stack')) {
      return `I use: Python, Java, C#, SQL, HTML, CSS, JavaScript, Visual Studio, VS Code, Git.`;
    }
    if(q.includes('contact') || q.includes('email')) {
      return `Email me at tanak.solanki05@gmail.com or visit the Contact page.`;
    }
    // fallback suggestion
    return `I don't have a direct answer to that yet — try: "GitHub", "Resume", "Help desk", or "Tech stack".`;
  }

  send.addEventListener('click', ()=>{ submit() });
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') submit(); });

  function submit(){
    const v = input.value.trim();
    if(!v) return;
    addMsg(v, 'user');
    input.value = '';
    // simple FAQ reply
    setTimeout(()=>{ addMsg(answerFAQ(v)) }, 400);
  }

  // EXPAND: if you want real AI responses, replace the answerFAQ call with a fetch to your serverless endpoint:
  // e.g. fetch('/.netlify/functions/openai-proxy', {method:'POST', body: JSON.stringify({prompt:v})})
  // The endpoint should call OpenAI with your API key (server-side only), then return the response.
})();
