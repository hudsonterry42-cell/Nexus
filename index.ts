const html = String.raw`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Nexus</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden;background:#03040a;font-family:'Share Tech Mono',monospace;color:#fff}
#bg-canvas{position:fixed;inset:0;z-index:0}
body::after{content:'';position:fixed;inset:0;z-index:1;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px);animation:scanlines 8s linear infinite}
body::before{content:'';position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 34%,rgba(0,0,0,.55) 100%)}
@keyframes scanlines{0%{background-position:0 0}100%{background-position:0 100%}}
.glass{background:rgba(10,14,30,.48);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(0,240,255,.14);border-radius:6px;box-shadow:0 0 24px rgba(0,240,255,.06),inset 0 1px 0 rgba(255,255,255,.04),0 28px 60px rgba(0,0,0,.55)}
#weather{position:fixed;top:24px;right:24px;z-index:10;padding:16px 18px;min-width:190px}
#weather .loc{font-size:11px;opacity:.55;letter-spacing:2px;text-transform:uppercase;color:#00f0ff;margin-bottom:4px}
#weather .main{display:flex;align-items:center;gap:12px}
#weather .temp{font-size:38px;font-family:'Orbitron',monospace;text-shadow:0 0 18px rgba(0,240,255,.35)}
#weather .cond{font-size:11px;opacity:.65;letter-spacing:1px;text-transform:uppercase;color:#00f0ff}
#weather .details{display:flex;gap:14px;margin-top:8px;font-size:11px;opacity:.45}
#center{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;text-align:center;width:min(90vw,720px)}
#clock-wrap{position:relative;display:inline-block}
#clock{font-family:'Orbitron',monospace;font-size:96px;font-weight:900;letter-spacing:8px;line-height:1;text-shadow:0 0 12px rgba(0,240,255,1),0 0 34px rgba(0,240,255,.85),0 0 80px rgba(0,240,255,.35);animation:flicker 7s infinite}
#clock-reflection{font-family:'Orbitron',monospace;font-size:96px;font-weight:900;letter-spacing:8px;line-height:1;color:rgba(0,240,255,.08);position:absolute;top:100%;left:0;width:100%;transform:scaleY(-.28);filter:blur(4px);mask-image:linear-gradient(to bottom,rgba(0,0,0,.35),transparent 80%);-webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,.35),transparent 80%)}
@keyframes flicker{0%,18%,20%,22%,50%,52%,100%{opacity:1;text-shadow:0 0 12px rgba(0,240,255,1),0 0 34px rgba(0,240,255,.85),0 0 80px rgba(0,240,255,.35)}19%,21%,51%{opacity:.92;text-shadow:none}}
#date{margin-top:10px;margin-bottom:34px;font-size:13px;letter-spacing:4px;text-transform:uppercase;opacity:.55;color:#00f0ff}
#date::before{content:'[ '}
#date::after{content:' ]'}
#browser-btn{padding:14px 42px;border:1px solid rgba(0,240,255,.35);border-radius:4px;background:rgba(0,240,255,.06);color:#00f0ff;font-family:'Share Tech Mono',monospace;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:10px}
#browser-btn:hover{transform:scale(1.02);background:rgba(0,240,255,.14);border-color:rgba(0,240,255,.75);box-shadow:0 0 24px rgba(0,240,255,.22);color:#fff}
#music{position:fixed;bottom:24px;left:24px;z-index:10;padding:12px 18px;cursor:pointer}
#timer{position:fixed;bottom:24px;right:24px;z-index:10;width:230px;padding:18px}
#timer .t-header{font-size:10px;opacity:.45;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;color:#00f0ff}
#timer .display{font-family:'Orbitron',monospace;font-size:34px;letter-spacing:2px;text-align:center;color:#00f0ff;text-shadow:0 0 14px rgba(0,240,255,.45);margin-bottom:10px}
#timer .inputs{display:flex;justify-content:center;gap:6px;margin-bottom:10px}
#timer input{width:48px;padding:7px 0;text-align:center;border:1px solid rgba(0,240,255,.14);background:rgba(0,240,255,.04);color:#fff;border-radius:4px;font-family:'Orbitron',monospace;outline:none}
#timer .t-btns{display:flex;gap:8px;justify-content:center}
#timer button{padding:7px 16px;border-radius:4px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#fff;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer}
#timer .start{background:rgba(0,240,255,.08);border-color:rgba(0,240,255,.28);color:#00f0ff}
#timer .progress{width:100%;height:1px;background:rgba(0,240,255,.08);margin-top:12px}
#timer .progress-bar{height:100%;width:0%;background:linear-gradient(90deg,#00f0ff,#7c3aed);transition:width .3s}
#pchat{position:fixed;top:24px;left:24px;z-index:10;width:280px;padding:12px 14px;cursor:pointer}
#pchat .pchat-header{display:flex;align-items:center;gap:8px}
#pchat .pchat-title{font-size:11px;opacity:.6;letter-spacing:3px;text-transform:uppercase;color:#00f0ff}
#pchat .pchat-badge{margin-left:auto;font-size:9px;padding:1px 6px;border-radius:2px;background:rgba(0,240,255,.1);color:#00f0ff;border:1px solid rgba(0,240,255,.2)}
#chat-overlay{position:fixed;inset:0;z-index:1001;background:rgba(2,4,10,.92);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);display:none;flex-direction:column}
#chat-overlay.open{display:flex}
.co-chrome{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(0,240,255,.1)}
.co-chrome h2{font-size:13px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#00f0ff}
.co-close{width:34px;height:34px;border:1px solid rgba(0,240,255,.15);background:rgba(0,240,255,.04);color:rgba(0,240,255,.6);cursor:pointer;border-radius:4px}
.co-body{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:6px}
.cm{padding:7px 12px;border-radius:4px;max-width:80%;font-size:12px;line-height:1.45;white-space:pre-wrap;word-break:break-word;animation:fadeIn .2s}
.cm.self{align-self:flex-end;background:rgba(0,240,255,.07);border:1px solid rgba(0,240,255,.12);color:#00f0ff}
.cm.other{align-self:flex-start;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)}
.cm.sys{align-self:center;opacity:.35;letter-spacing:2px;font-size:10px;text-transform:uppercase}
.cm em{display:block;font-style:normal;font-size:10px;opacity:.45;margin-bottom:2px}
.co-input{display:flex;gap:8px;padding:12px 20px 16px;border-top:1px solid rgba(0,240,255,.06)}
.co-input input{border:1px solid rgba(0,240,255,.15);background:rgba(0,240,255,.04);color:#fff;border-radius:4px;outline:none;font-family:'Share Tech Mono',monospace}
.co-name{width:110px;text-align:center;background:rgba(124,58,237,.05)!important}
#co-input{flex:1;padding:10px 14px}
.co-input button{padding:10px 20px;border-radius:4px;border:1px solid rgba(0,240,255,.3);background:rgba(0,240,255,.1);color:#00f0ff;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer}
#overlay{position:fixed;inset:0;z-index:1000;background:rgba(2,4,10,.92);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);display:none;flex-direction:column}
#overlay.open{display:flex}
.chrome{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-bottom:1px solid rgba(0,240,255,.1);gap:10px}
.tabs{display:flex;gap:2px}
.tabs button{padding:6px 16px;border:none;background:transparent;color:rgba(0,240,255,.35);cursor:pointer;font-size:11px;font-family:'Share Tech Mono',monospace;letter-spacing:2px;text-transform:uppercase}
.tabs button.active{color:#00f0ff;background:rgba(0,240,255,.08);border:1px solid rgba(0,240,255,.15)}
.close-overlay{width:34px;height:34px;border:1px solid rgba(0,240,255,.15);background:rgba(0,240,255,.04);color:rgba(0,240,255,.6);cursor:pointer;border-radius:4px}
.panel{display:none;flex:1;min-height:0}
.panel.active{display:flex;flex-direction:column}
#sandbox{flex:1;display:flex;flex-direction:column;min-height:0}
.sand-nav{display:flex;gap:6px;padding:8px 14px;border-bottom:1px solid rgba(0,240,255,.06);align-items:center}
.sand-nav input{flex:1;padding:7px 14px;border:1px solid rgba(0,240,255,.15);background:rgba(0,240,255,.04);color:#00f0ff;border-radius:4px;font-family:'Share Tech Mono',monospace;outline:none}
.sand-nav button{padding:7px 16px;border-radius:4px;border:1px solid rgba(0,240,255,.2);background:rgba(0,240,255,.08);color:#00f0ff;font-size:11px;font-family:'Share Tech Mono',monospace;letter-spacing:1px;cursor:pointer}
.sand-body{flex:1;position:relative}
.sand-body iframe{width:100%;height:100%;border:none;background:#fff}
.sand-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:rgba(0,240,255,.4);font-size:12px;letter-spacing:2px}
.spinner{width:28px;height:28px;border:1px solid rgba(0,240,255,.15);border-top-color:#00f0ff;border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@media(max-width:768px){
#clock,#clock-reflection{font-size:52px;letter-spacing:4px}
#weather{top:14px;right:14px;padding:12px 14px;min-width:auto}
#weather .temp{font-size:24px}
#music{bottom:14px;left:14px}
#pchat{top:14px;left:14px;width:calc(100vw - 28px)}
#timer{bottom:14px;right:14px;width:calc(50vw - 20px)}
#timer .display{font-size:24px}
}
</style>
</head>
<body>
<canvas id="bg-canvas"></canvas>
<div id="weather" class="glass"><div class="loc" id="w-loc">Detecting...</div><div class="main"><span class="temp" id="w-temp">--</span><div><div class="cond" id="w-cond">--</div></div></div><div class="details"><span id="w-humidity">--</span><span id="w-wind">--</span></div></div>
<div id="center"><div id="clock-wrap"><div id="clock">00:00</div><div id="clock-reflection">00:00</div></div><div id="date">Loading...</div><button id="browser-btn">Launch Browser</button></div>
<div id="music" class="glass"><div style="font-size:20px;line-height:1">🎵</div><div style="font-size:10px;opacity:.5;margin-top:3px;letter-spacing:1px">MUSIC</div></div>
<div id="timer" class="glass"><div class="t-header">⏱ Timer</div><div class="display" id="t-display">00:00:00</div><div class="inputs"><input type="number" id="t-h" min="0" max="99" value="0"><span>:</span><input type="number" id="t-m" min="0" max="59" value="5"><span>:</span><input type="number" id="t-s" min="0" max="59" value="0"></div><div class="t-btns"><button class="start" id="t-start">Start</button><button id="t-reset">Reset</button></div><div class="progress"><div class="progress-bar" id="t-bar"></div></div></div>
<div id="pchat" class="glass"><div class="pchat-header"><span>💬</span><span class="pchat-title">Chat</span><span class="pchat-badge" id="pchat-badge">0</span></div></div>
<div id="chat-overlay"><div class="co-chrome"><h2>💬 Group Chat</h2><button class="co-close" id="co-close">✕</button></div><div class="co-body" id="co-body"></div><div class="co-input"><input class="co-name" id="co-name" placeholder="Your name" maxlength="20" value="Anonymous"><input type="text" id="co-input" placeholder="Type a message..." disabled><button id="co-send" disabled>Send</button></div></div>
<div id="overlay"><div class="chrome"><div class="tabs"><button data-panel="browser">🌐 Browser</button><button class="active" data-panel="music">🎵 Music</button></div><button class="close-overlay" id="ov-close">✕</button></div><div class="panel" id="panel-browser"><div id="sandbox"><div class="sand-nav"><input id="sand-url" type="text" placeholder="Enter a URL..."><button id="sand-go">Go</button><button id="sand-home">🏠</button></div><div class="sand-body"><div class="sand-loading" id="sand-loading"><div class="spinner"></div><span>Loading...</span></div><iframe id="sand-iframe" src="about:blank"></iframe></div></div></div><div class="panel active" id="panel-music"><iframe id="music-iframe" src="https://freefy.app/" style="width:100%;height:100%;border:none;background:#000"></iframe></div></div>
<script>
const cvs=document.getElementById('bg-canvas'),cx=cvs.getContext('2d');let W,H,buildings=[],windows=[],rainDrops=[],cars=[],neonSigns=[],fog=[];const NEON_COLORS=['#00f0ff','#ff00e5','#7c3aed','#00ff9f','#ff6600','#ff0055'];const BUILDING_COLORS=['#090917','#060611','#08080f','#0c0c1e','#050510'];
function rnd(a,b){return a+Math.random()*(b-a)}
function rndInt(a,b){return Math.floor(rnd(a,b))}
function rndOf(arr){return arr[rndInt(0,arr.length)]}
function initCity(){buildings=[];windows=[];cars=[];neonSigns=[];rainDrops=[];fog=[];const groundY=H*0.72;for(let i=0;i<24;i++)buildings.push({x:rnd(-30,W+30),y:groundY-rnd(H*0.1,H*0.33),w:rnd(28,86),h:rnd(H*0.1,H*0.33),layer:0,color:'#04040c'});for(let i=0;i<18;i++){const w=rnd(60,150),bh=rnd(H*0.2,H*0.55),x=rnd(-30,W+30),col=rndOf(BUILDING_COLORS);buildings.push({x,y:groundY-bh,w,h:bh,layer:1,color:col});const cols=Math.max(1,Math.floor(w/18)),rows=Math.max(1,Math.floor(bh/22));for(let c=0;c<cols;c++)for(let r=0;r<rows;r++)if(Math.random()<0.56){windows.push({cx:x+8+c*(w-16)/Math.max(1,cols-1),cy:(groundY-bh)+10+r*(bh-20)/Math.max(1,rows-1),w:8,h:10,color:rndOf(NEON_COLORS),on:Math.random()>.24,flickerRate:rnd(0.002,0.02),alpha:rnd(0.35,0.9)})}if(Math.random()<0.42){const sw=rnd(28,Math.min(w-12,90));neonSigns.push({x:x+(w-sw)/2,y:groundY-bh+rnd(10,bh*0.45),w:sw,h:rnd(8,18),color:rndOf(NEON_COLORS),alpha:rnd(0.5,1),pulse:rnd(0,Math.PI*2),pulseSpeed:rnd(0.01,0.05)})}}for(let i=0;i<9;i++)buildings.push({x:rnd(-60,W+60),y:groundY-rnd(H*0.18,H*0.4),w:rnd(90,220),h:rnd(H*0.18,H*0.4),layer:2,color:'#020208'});for(let i=0;i<280;i++)rainDrops.push({x:rnd(0,W),y:rnd(0,H),len:rnd(12,30),speed:rnd(14,26),alpha:rnd(0.03,0.14),color:Math.random()>0.85?'rgba(0,240,255,':'rgba(150,200,255,'});const roadY=groundY+rnd(4,14);for(let i=0;i<12;i++){const dir=Math.random()>0.5?1:-1;cars.push({x:dir>0?rnd(-220,0):rnd(W,W+220),y:roadY+rnd(-4,4),speed:rnd(1.8,4.8)*dir,len:rnd(30,80),front:dir>0?'rgba(255,240,200,0.75)':'rgba(255,60,60,0.5)',back:dir>0?'rgba(255,60,60,0.45)':'rgba(255,240,200,0.6)',alpha:rnd(0.45,0.95)})}for(let i=0;i<7;i++)fog.push({y:groundY*rnd(0.45,0.95),alpha:rnd(0.03,0.08),speed:rnd(0.08,0.25)*(Math.random()>0.5?1:-1),x:rnd(0,W),w:rnd(W*0.5,W*1.2),h:rnd(50,140)})}
function drawCity(t){cx.clearRect(0,0,W,H);const groundY=H*0.72;const sky=cx.createLinearGradient(0,0,0,groundY);sky.addColorStop(0,'#000005');sky.addColorStop(0.4,'#020210');sky.addColorStop(0.7,'#04061a');sky.addColorStop(1,'#080420');cx.fillStyle=sky;cx.fillRect(0,0,W,groundY);const moonX=W*0.82,moonY=H*0.14;const moon=cx.createRadialGradient(moonX,moonY,0,moonX,moonY,135);moon.addColorStop(0,'rgba(220,240,255,0.74)');moon.addColorStop(0.2,'rgba(180,220,255,0.2)');moon.addColorStop(1,'transparent');cx.fillStyle=moon;cx.beginPath();cx.arc(moonX,moonY,50,0,Math.PI*2);cx.fill();for(let i=0;i<96;i++){const sx=(i*173.3)%W,sy=((i*67.7)%groundY)*0.55,tw=0.6+Math.sin(t*0.001+i)*0.3;cx.globalAlpha=0.35+tw*0.4;cx.fillStyle='#dff5ff';cx.beginPath();cx.arc(sx,sy,Math.random()>0.92?1.2:.55,0,Math.PI*2);cx.fill()}cx.globalAlpha=1;const haze=cx.createLinearGradient(0,groundY*0.34,0,groundY);haze.addColorStop(0,'rgba(124,58,237,0)');haze.addColorStop(0.38,'rgba(124,58,237,0.08)');haze.addColorStop(1,'rgba(0,240,255,0.03)');cx.fillStyle=haze;cx.fillRect(0,groundY*0.34,W,groundY*0.66);buildings.filter(b=>b.layer===0).forEach(b=>{cx.globalAlpha=0.92;cx.fillStyle=b.color;cx.fillRect(b.x,b.y,b.w,b.h)});buildings.filter(b=>b.layer===1).forEach(b=>{cx.globalAlpha=1;cx.fillStyle=b.color;cx.fillRect(b.x,b.y,b.w,b.h);cx.globalAlpha=0.05;cx.fillStyle='#00f0ff';cx.fillRect(b.x,b.y,b.w,2);cx.fillRect(b.x,b.y,2,b.h);cx.fillRect(b.x+b.w-2,b.y,2,b.h)});windows.forEach(w=>{if(!w.on)return;if(Math.random()<w.flickerRate)w.on=Math.random()>0.1;const g=cx.createRadialGradient(w.cx,w.cy,0,w.cx,w.cy,w.w*1.7);g.addColorStop(0,w.color+'cc');g.addColorStop(1,'transparent');cx.globalAlpha=w.alpha*(0.75+0.25*Math.sin(t*0.002+w.cx));cx.fillStyle=g;cx.fillRect(w.cx-w.w,w.cy-w.h,w.w*2,w.h*2);cx.globalAlpha=w.alpha;cx.fillStyle=w.color;cx.fillRect(w.cx-w.w/2,w.cy-w.h/2,w.w,w.h)});neonSigns.forEach(s=>{s.pulse+=s.pulseSpeed;const p=0.55+0.45*Math.sin(s.pulse);cx.globalAlpha=s.alpha*p;cx.shadowColor=s.color;cx.shadowBlur=26;cx.fillStyle=s.color;cx.fillRect(s.x,s.y,s.w,s.h);cx.shadowBlur=0});fog.forEach(f=>{f.x+=f.speed;if(f.x>W+f.w/2)f.x=-f.w/2;if(f.x<-f.w/2)f.x=W+f.w/2;const fg=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.w/2);fg.addColorStop(0,`rgba(30,10,60,${f.alpha})`);fg.addColorStop(1,'transparent');cx.fillStyle=fg;cx.fillRect(f.x-f.w/2,f.y-f.h,f.w,f.h*2)});const road=cx.createLinearGradient(0,groundY,0,H);road.addColorStop(0,'#030310');road.addColorStop(0.35,'#020208');road.addColorStop(1,'#010105');cx.fillStyle=road;cx.fillRect(0,groundY,W,H-groundY);const wet=cx.createLinearGradient(0,groundY,0,H);wet.addColorStop(0,'rgba(0,240,255,0.07)');wet.addColorStop(0.6,'rgba(124,58,237,0.05)');wet.addColorStop(1,'transparent');cx.fillStyle=wet;cx.fillRect(0,groundY,W,H-groundY);buildings.filter(b=>b.layer===1).forEach(b=>{const rh=b.h*0.18;const gr=cx.createLinearGradient(0,groundY,0,groundY+rh);gr.addColorStop(0,'rgba(0,240,255,0.05)');gr.addColorStop(1,'transparent');cx.globalAlpha=0.45;cx.fillStyle=gr;cx.fillRect(b.x,groundY,b.w,Math.min(rh,H-groundY))});const horizon=cx.createLinearGradient(0,0,W,0);horizon.addColorStop(0,'transparent');horizon.addColorStop(0.28,'rgba(0,240,255,0.2)');horizon.addColorStop(0.72,'rgba(124,58,237,0.2)');horizon.addColorStop(1,'transparent');cx.globalAlpha=0.62;cx.fillStyle=horizon;cx.fillRect(0,groundY,W,1);cx.globalAlpha=0.2;cx.fillRect(0,groundY+1,W,3);cx.globalAlpha=1;cars.forEach(c=>{c.x+=c.speed;if(c.speed>0&&c.x>W+100)c.x=-100;if(c.speed<0&&c.x<-100)c.x=W+100;const cg=cx.createLinearGradient(c.x,0,c.x+c.len*Math.sign(c.speed),0);cg.addColorStop(0,c.speed>0?c.front:c.back);cg.addColorStop(1,c.speed>0?c.back:c.front);cx.globalAlpha=c.alpha;cx.fillStyle=cg;cx.fillRect(Math.min(c.x,c.x+c.len*Math.sign(c.speed))-c.len/2,c.y,c.len,3);cx.globalAlpha=c.alpha*0.22;cx.fillRect(Math.min(c.x,c.x+c.len*Math.sign(c.speed))-c.len/2,c.y+3,c.len,2)});buildings.filter(b=>b.layer===2).forEach(b=>{cx.globalAlpha=1;cx.fillStyle=b.color;cx.fillRect(b.x,b.y,b.w,b.h+5)});rainDrops.forEach(r=>{r.y+=r.speed;r.x-=r.speed*0.14;if(r.y>H){r.y=-20;r.x=rnd(0,W)}cx.globalAlpha=r.alpha;cx.strokeStyle=r.color+'0.5)';cx.lineWidth=0.8;cx.beginPath();cx.moveTo(r.x,r.y);cx.lineTo(r.x-r.len*0.15,r.y+r.len);cx.stroke()});cx.globalAlpha=1}
function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight;initCity()}
window.addEventListener('resize',resize);
requestAnimationFrame(function anim(ts){drawCity(ts);requestAnimationFrame(anim)});
resize();
function uc(){const n=new Date();const t=\`\${String(n.getHours()).padStart(2,'0')}:\${String(n.getMinutes()).padStart(2,'0')}\`;document.getElementById('clock').textContent=t;document.getElementById('clock-reflection').textContent=t;document.getElementById('date').textContent=n.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
uc();setInterval(uc,1000);
const wL=document.getElementById('w-loc'),wT=document.getElementById('w-temp'),wC=document.getElementById('w-cond'),wH=document.getElementById('w-humidity'),wW=document.getElementById('w-wind');
function wc(c){const m={0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',61:'Slight rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',71:'Slight snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Slight showers',81:'Showers',82:'Heavy showers',85:'Slight snow showers',86:'Heavy snow showers',95:'Thunderstorm',96:'Thunderstorm with hail',99:'Thunderstorm with hail'};return m[c]||'Unknown'}
function gw(lat,lon){fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto\`).then(r=>r.json()).then(d=>{const c=d.current;wT.textContent=Math.round(c.temperature_2m)+'°';wC.textContent=wc(c.weather_code);wH.textContent='💧 '+c.relative_humidity_2m+'%';wW.textContent='💨 '+Math.round(c.wind_speed_10m)+' km/h'}).catch(()=>{wT.textContent='--°';wC.textContent='Unavailable'});fetch(\`https://geocoding-api.open-meteo.com/v1/reverse?latitude=\${lat}&longitude=\${lon}&locality_type=city\`).then(r=>r.json()).then(d=>{if(d.results&&d.results[0])wL.textContent=d.results[0].name+(d.results[0].country?', '+d.results[0].country:'')}).catch(()=>{wL.textContent='Unknown'})}
if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p=>gw(p.coords.latitude,p.coords.longitude),()=>{wL.textContent='Location denied';gw(40.7128,-74.0060)});else{wL.textContent='Geolocation unavailable';gw(40.7128,-74.0060)}
const ov=document.getElementById('overlay');
document.getElementById('browser-btn').addEventListener('click',()=>window.open('https://sandstone.pages.dev/','_blank'));
document.getElementById('music').addEventListener('click',()=>{document.querySelectorAll('#overlay .tabs button').forEach(b=>b.classList.remove('active'));document.querySelector('#overlay .tabs button[data-panel="music"]').classList.add('active');document.querySelectorAll('#overlay .panel').forEach(p=>p.classList.remove('active'));document.getElementById('panel-music').classList.add('active');ov.classList.add('open')});
let ts='idle',tt=0,tr=0,ti=null;
const tD=document.getElementById('t-display'),tB=document.getElementById('t-bar'),tSt=document.getElementById('t-start'),tRe=document.getElementById('t-reset'),tH=document.getElementById('t-h'),tM=document.getElementById('t-m'),tS=document.getElementById('t-s');
function utd(s){tD.textContent=\`\${String(Math.floor(s/3600)).padStart(2,'0')}:\${String(Math.floor((s%3600)/60)).padStart(2,'0')}:\${String(s%60).padStart(2,'0')}\`}
function gti(){return parseInt(tH.value||0)*3600+parseInt(tM.value||0)*60+parseInt(tS.value||0)}
function stt(){const t=gti();if(t<=0)return;if(ts==='idle'||ts==='paused'){if(ts==='idle'){tt=t;tr=t}ts='running';tSt.textContent='Pause';tSt.className='start';ti=setInterval(()=>{tr--;if(tr<=0){tr=0;utd(0);clearInterval(ti);ti=null;ts='idle';tSt.textContent='Start';tB.style.width='100%';try{const a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.value=.3;o.start();o.stop(a.currentTime+.5)}catch(e){}return}utd(tr);tB.style.width=((1-tr/tt)*100)+'%'},1000)}else if(ts==='running'){clearInterval(ti);ti=null;ts='paused';tSt.textContent='Resume'}}
function rtt(){clearInterval(ti);ti=null;ts='idle';tSt.textContent='Start';const t=gti()||0;tt=t;tr=t;utd(t);tB.style.width='0%'}
tSt.addEventListener('click',stt);tRe.addEventListener('click',rtt);rtt();
(function(){const badge=document.getElementById('pchat-badge');const pchat=document.getElementById('pchat');const coBody=document.getElementById('co-body');const coInput=document.getElementById('co-input');const coSend=document.getElementById('co-send');const coName=document.getElementById('co-name');const coOverlay=document.getElementById('chat-overlay');const coClose=document.getElementById('co-close');const seen=new Set();const me='guest-'+Math.random().toString(36).slice(2,8);let socket=null;function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}function scrollBottom(){requestAnimationFrame(()=>{coBody.scrollTop=coBody.scrollHeight})}function sys(t){const d=document.createElement('div');d.className='cm sys';d.textContent=t;coBody.appendChild(d);scrollBottom()}function addMessage(m,key){if(!m||seen.has(key))return;seen.add(key);const d=document.createElement('div');d.className='cm '+(m.uid===me?'self':'other');d.innerHTML='<em>'+esc(m.name||'Anonymous')+'</em>'+esc(m.text||'');coBody.appendChild(d);scrollBottom()}function connect(){if(socket&&socket.readyState===1)return;const proto=location.protocol==='https:'?'wss':'ws';socket=new WebSocket(\`\${proto}://\${location.host}/ws\`);socket.onopen=()=>{coInput.disabled=false;coSend.disabled=false;sys('Connected');socket.send(JSON.stringify({type:'hello',uid:me,name:coName.value.trim()||'Anonymous'}))};socket.onmessage=(ev)=>{let data;try{data=JSON.parse(ev.data)}catch{return}if(data.type==='history'&&Array.isArray(data.messages)){data.messages.forEach(m=>addMessage(m,m.id))}if(data.type==='message'&&data.message)addMessage(data.message,data.message.id)};socket.onclose=()=>{coInput.disabled=true;coSend.disabled=true;sys('Disconnected')};socket.onerror=()=>sys('Chat unavailable')}function send(){if(!socket||socket.readyState!==1)return;const text=coInput.value.trim();if(!text)return;socket.send(JSON.stringify({type:'msg',uid:me,name:coName.value.trim()||'Anonymous',text}));coInput.value=''}pchat.onclick=()=>{coOverlay.classList.add('open');connect();scrollBottom()};coClose.onclick=()=>coOverlay.classList.remove('open');coSend.onclick=send;coInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()})})();
(function(){const sandUrl=document.getElementById('sand-url'),sandGo=document.getElementById('sand-go'),sandHome=document.getElementById('sand-home'),sandIframe=document.getElementById('sand-iframe'),sandLoading=document.getElementById('sand-loading');const HOME='https://sandstone.pages.dev';function nav(url){if(!url)url=HOME;if(!url.startsWith('http://')&&!url.startsWith('https://'))url='https://'+url;sandUrl.value=url;sandLoading.style.display='flex';sandIframe.src=url}sandIframe.addEventListener('load',()=>sandLoading.style.display='none');sandGo.onclick=()=>nav(sandUrl.value);sandUrl.addEventListener('keydown',e=>{if(e.key==='Enter')nav(sandUrl.value)});sandHome.onclick=()=>nav(HOME);nav(HOME)})();
document.getElementById('ov-close').onclick=()=>ov.classList.remove('open');
document.querySelectorAll('#overlay .tabs button').forEach(btn=>btn.addEventListener('click',function(){document.querySelectorAll('#overlay .tabs button').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.querySelectorAll('#overlay .panel').forEach(p=>p.classList.remove('active'));document.getElementById('panel-'+this.dataset.panel).classList.add('active')}));
document.querySelectorAll('#timer,#weather').forEach(el=>{let min=false;el.addEventListener('click',function(e){if(e.target.closest('button,input'))return;min=!min;this.style.transform=min?'scale(.85)':'none';this.style.opacity=min?.35:1})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('chat-overlay').classList.remove('open');ov.classList.remove('open')}})
</script>
</body>
</html>`;

type Msg = { id: string; uid: string; name: string; text: string; created: number };
const messages: Msg[] = [];
const clients = new Set<any>();

const server = Bun.serve({
  port: import.meta.env.PORT ?? 3000,
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/") return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
    if (url.pathname === "/api/health") return Response.json({ status: "ok" });
    if (url.pathname === "/ws") {
      const upgraded = server.upgrade(req);
      if (upgraded) return undefined;
      return new Response("WebSocket upgrade failed", { status: 400 });
    }
    return new Response("Not found", { status: 404 });
  },
  websocket: {
    open(ws) {
      clients.add(ws);
      ws.send(JSON.stringify({ type: "history", messages }));
    },
    message(ws, message) {
      let data: any;
      try { data = JSON.parse(String(message)); } catch { return; }
      if (data.type !== "msg") return;
      const msg: Msg = {
        id: crypto.randomUUID(),
        uid: data.uid || "guest",
        name: String(data.name || "Anonymous").slice(0, 20),
        text: String(data.text || "").slice(0, 1000),
        created: Date.now()
      };
      messages.push(msg);
      if (messages.length > 300) messages.splice(0, messages.length - 300);
      const payload = JSON.stringify({ type: "message", message: msg });
      for (const client of clients) client.send(payload);
    },
    close(ws) {
      clients.delete(ws);
    }
  }
});

console.log(`Running on ${server.port}`);
