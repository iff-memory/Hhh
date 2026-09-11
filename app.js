const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const screens=$$(".screen");let current=1;
function go(n){screens.forEach(s=>s.classList.remove("active"));setTimeout(()=>$("#s"+n).classList.add("active"),80);current=n}
$("#enter").onclick=()=>go(2);
let code=["🐸","👹","🦋","🐷"],input=[],tries=0;
$$(".creatures button").forEach(b=>b.onclick=()=>{if(input.length>=4)return;input.push(b.dataset.v);b.classList.add("selected");$("#seq").textContent=input.map(()=> "✦").join("　");if(input.length===4){if(input.every((v,i)=>v===code[i])){$("#status").textContent="ACCESS GRANTED ✦";burst();setTimeout(()=>go(3),1200)}else{tries++;$("#status").textContent=tries>=3?"Hint: start with 🐸. I believe in you. 😭":"Wrong sequence. The investigation continues.";input=[];setTimeout(()=>{$$(".creatures button").forEach(x=>x.classList.remove("selected"));$("#seq").textContent="—　—　—　—"},500)}}});
$$(".next").forEach(b=>{if(b.dataset.to)b.onclick=()=>go(+b.dataset.to)});
$$(".roasts button").forEach(b=>b.onclick=()=>b.classList.toggle("open"));
const lines=["Okay…","Jokes aside.","I'm genuinely glad I got to know you.","You've brought a lot of laughs, chaos, memories, and good moments into my life.","I hope this year gives you the kind of happiness that stays.","And plenty of reasons to smile.","Happy Birthday, beautiful. 💗","Stay exactly the way you are.","Well… maybe become 2% less annoying. 😂","But don't change the important parts."];
let typed=false;
function runLetter(){if(typed)return;typed=true;let box=$("#typed");lines.forEach((t,i)=>{let d=document.createElement("div");d.textContent=t;box.append(d);setTimeout(()=>{d.style.opacity=1;d.style.transform="none"},i*950)});setTimeout(()=>$("#letterNext").classList.remove("hidden"),lines.length*950+500)}
const observer=new MutationObserver(()=>{if($("#s7").classList.contains("active"))runLetter()});observer.observe(document.body,{attributes:true,subtree:true});
$("#letterNext").onclick=()=>go(8);
$("#open").onclick=()=>{ $("#envelope").classList.add("hidden");$("#final").classList.remove("hidden");let n=3,c=$("#counter");c.textContent=n;let t=setInterval(()=>{n--;if(n===0){clearInterval(t);c.classList.add("hidden");$("#reveal").classList.remove("hidden");burst(90)}else c.textContent=n},900)};
$("#replay").onclick=()=>{location.reload()};
function burst(count=35){for(let i=0;i<count;i++){let p=document.createElement("div");p.className="particle";p.textContent=["✦","✧","♡","✨","🌸"][Math.floor(Math.random()*5)];p.style.left=Math.random()*100+"vw";p.style.top=(30+Math.random()*60)+"vh";p.style.fontSize=(10+Math.random()*20)+"px";p.style.animationDelay=Math.random()*.7+"s";document.body.appendChild(p);setTimeout(()=>p.remove(),3500)}}
const canvas=$("#sky"),ctx=canvas.getContext("2d");let stars=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;stars=Array.from({length:Math.min(180,innerWidth/5)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,a:Math.random()}))}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);stars.forEach(s=>{s.a+=.01;ctx.globalAlpha=.2+.3*Math.sin(s.a);ctx.fillStyle="#f5dfbd";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill()});requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();
document.addEventListener("pointermove",e=>{let g=$("#cursorGlow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
let audioCtx;document.addEventListener("click",()=>{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();let o=audioCtx.createOscillator(),gain=audioCtx.createGain();o.frequency.value=196;gain.gain.value=.018;o.connect(gain).connect(audioCtx.destination);o.start();$("#musicHint").textContent="♪ ambience on";}}, {once:true});
