// main.js — small floating particle effect from initials + small helpers
(function(){
  // create a simple particle sparkle behind initials to make it feel lively
  const canvas = document.getElementById('intro-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  function resize(){
    canvas.width = canvas.clientWidth * DPR;
    canvas.height = canvas.clientHeight * DPR;
    ctx.scale(DPR, DPR);
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  function spawn(){
    particles.push({
      x: Math.random()*canvas.clientWidth,
      y: Math.random()*canvas.clientHeight,
      vx: (Math.random()-0.5)*0.3,
      vy: -Math.random()*0.8 - 0.2,
      life: 80 + Math.random()*60,
      r: Math.random()*2+0.5,
      hue: 260 + Math.random()*80
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
    if(Math.random() < 0.25) spawn();
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${Math.max(0, p.life/140)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      if(p.life <= 0 || p.y < -10) particles.splice(i,1);
    }
    requestAnimationFrame(draw);
  }
  draw();

  // small nav active state
  document.querySelectorAll('.nav a').forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
  });
})();

// Reveal-on-scroll helper for timeline and other sections
(function(){
  if(!('IntersectionObserver' in window)){
    // fallback: show all
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();
