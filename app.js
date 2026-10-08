const tools=[
["chat","💬","Chat Assistant","Ask anything, brainstorm, learn and get instant answers.","chat.html"],
["image","🖼️","Image Generator","Create beautiful images from your ideas.","image.html"],
["video","▶️","Video Editor","Plan and organize modern video editing workflows.","video.html"],
["writing","✍️","Content Generator","Write posts, scripts, captions, emails and more.","content-generator.html"],
["coding","</>","Coding Assistant","Build, debug and improve code faster.","coding.html"],
["data","📊","Data Analysis","Turn information into useful insights.","data-analysis.html"],
["web","🌐","Website Builder","Plan and generate modern websites.","website-builder.html"],
["auto","⚙️","Automation","Design useful automated workflows.","automation.html"],
["voice","🎙️","Voice Studio","Prepare voice and audio workflows.","voice.html"],
["music","🎵","Music Studio","Organize ideas for music creation.","music.html"],
["research","🔎","Research","Research topics and organize findings.","research.html"],
["translator","🌍","Translator","Translate and improve multilingual text.","translator.html"],
["docs","📄","Document Analyzer","Review and summarize documents.","document-analyzer.html"],
["report","📑","Report Maker","Turn information into structured reports.","report-maker.html"],
["app","▦","App Builder","Plan app screens and features.","app-builder.html"],
["integrations","🔗","Integrations","Manage connected workflows.","integrations.html"]
];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function active(name){return location.pathname.toLowerCase().includes(name)}
function layout(page,body){
const nav=tools.map(t=>`<a class="${active(t[0])?'active':''}" href="${t[4]}"><span class="ico">${t[1]}</span>${t[2].replace(' Assistant','')}</a>`).join("");
document.getElementById("app").innerHTML=`<div class="app">
<aside class="sidebar"><a class="brand" href="index.html"><img src="logo.svg"><div><strong>Rafaqatedits <span style="display:inline;color:#8f6cff;font-size:20px">AI</span></strong><span>AI Tools • Create • Automate • Grow</span></div></a>
<nav class="nav"><a class="${page==='home'?'active':''}" href="index.html"><span class="ico">⌂</span>Home</a>${nav}</nav>
<div class="upgrade"><b>👑 Upgrade to Premium</b><p>Get more limits, advanced features and priority support.</p><button onclick="toast('Premium upgrade is ready for your next plan')">Upgrade Now</button></div></aside>
<section class="main"><header class="topbar"><button class="circle mobile-menu" onclick="toggleMobile()">☰</button><div class="search">⌕ <input id="globalSearch" placeholder="Search AI tools, features, or anything..." oninput="searchTools(this.value)"></div><div class="top-actions"><button class="circle hide-mobile">♧</button><button class="circle" onclick="toggleProfile()">●</button><button class="circle three" onclick="toggleProfile()">⋮</button></div><div id="profileMenu" class="profile-menu"><a href="profile.html">👤 Profile</a><a href="settings.html">⚙️ Settings</a><a href="help.html">❔ Help & Support</a><button onclick="toast('You are safely signed out in demo mode')">↪ Logout</button></div></header><main class="content">${body}</main><div class="footer">© 2026 Rafaqatedits AI • AI Tools • Create • Automate • Grow</div></section></div>`;
}
function home(){
const cards=tools.slice(0,8).map(t=>`<a class="tool" href="${t[4]}"><div class="tool-icon">${t[1]}</div><h3>${t[2]}</h3><p>${t[3]}</p><div class="open">Open →</div></a>`).join("");
layout("home",`<section class="hero"><span class="eyebrow">⚡ AI POWERED SOLUTIONS</span><h1>Turn Your Ideas Into<br><span class="grad">Reality with AI</span></h1><p>Create, edit, automate and grow with powerful AI tools. Everything you need, in one place.</p><div class="buttons"><a class="btn primary" href="chat.html">Start Creating →</a><a class="btn" href="#tools">Explore Tools</a></div><div class="checks"><span>✓ Fast & Easy</span><span>✓ No Credit Card Required</span><span>✓ Free to Start</span></div></section>
<div class="section-title" id="tools"><div><h2>✨ Featured AI Tools</h2><span class="muted">Powerful tools to help you create, work and grow faster.</span></div><a class="muted" href="favorites.html">View All Tools →</a></div>
<div class="tools">${cards}</div>
<div class="bottom"><div><h3 style="margin:0 0 5px">🚀 Ready to Get Started?</h3><span class="muted">Choose a tool and start creating something amazing.</span></div><a class="btn primary" href="chat.html">Get Started Free →</a></div>`);
}
function chat(){
layout("chat",`<div class="page-head"><h1>💬 AI Chat Assistant</h1><p class="muted">Ask questions, brainstorm ideas, write content and more.</p></div><div class="workspace"><div class="panel"><div id="msgs" class="chatbox"></div><div class="composer"><textarea id="chatInput" placeholder="Type your message..."></textarea><button class="btn primary" onclick="sendChat()">Send ↑</button></div></div><div class="panel"><h3>Quick prompts</h3><div class="buttons" style="display:grid"><button class="btn" onclick="quick('Write a professional social media caption')">Social media caption</button><button class="btn" onclick="quick('Give me 5 video ideas')">Video ideas</button><button class="btn" onclick="quick('Explain this topic simply')">Explain a topic</button><button class="btn" onclick="quick('Create a professional bio')">Professional bio</button></div></div></div>`);
loadChat();
}
function toolPage(t){
layout(t[0],`<div class="page-head"><h1>${t[1]} ${t[2]}</h1><p class="muted">${t[3]}</p></div><div class="workspace"><div class="panel"><h3>Create with ${t[2]}</h3><div class="form-grid"><label>What do you want to create?</label><textarea id="toolPrompt" rows="7" placeholder="Describe your idea here..."></textarea><button class="btn primary" onclick="generateTool()">Generate Result ✨</button></div><div id="toolResult" class="result empty-state">Your result will appear here.</div></div><div class="panel"><h3>How it works</h3><p class="muted">1. Describe your goal clearly.</p><p class="muted">2. Press Generate.</p><p class="muted">3. Review the generated workspace result.</p><div class="stats"><div class="stat"><b>AI</b><small class="muted">Powered</small></div><div class="stat"><b>24/7</b><small class="muted">Available</small></div><div class="stat"><b>Fast</b><small class="muted">Workflow</small></div></div></div></div>`);
}
function sendChat(){const el=document.getElementById("chatInput"),v=el.value.trim();if(!v)return;addMsg(v,"user");el.value="";setTimeout(()=>addMsg("Thanks! I received your request. This interface is ready for your AI/API connection. Your message is saved in this browser for the demo.","ai"),300)}
function addMsg(v,type){const box=document.getElementById("msgs");if(!box)return;const d=document.createElement("div");d.className="msg "+type;d.textContent=v;box.appendChild(d);box.scrollTop=box.scrollHeight;localStorage.setItem("ra_chat",box.innerHTML)}
function loadChat(){const box=document.getElementById("msgs");if(!box)return;box.innerHTML=localStorage.getItem("ra_chat")||'<div class="msg ai">Hello! 👋 I am Rafaqatedits AI. What would you like to create today?</div>'}
function quick(v){document.getElementById("chatInput").value=v;document.getElementById("chatInput").focus()}
function generateTool(){const p=document.getElementById("toolPrompt").value.trim(),r=document.getElementById("toolResult");if(!p){toast("Please describe what you want first.");return}r.className="result";r.textContent="Generating a professional result for:\\n\\n"+p+"\\n\\nDemo result ready. Connect your preferred AI API/backend to turn this workspace into a live AI generator.";toast("Result created")}
function toggleProfile(){document.getElementById("profileMenu")?.classList.toggle("show")}
function toggleMobile(){const s=document.querySelector(".sidebar");if(s){s.style.display=s.style.display==="block"?"none":"block";s.style.zIndex=80}}
function toast(v){const x=document.createElement("div");x.className="toast";x.textContent=v;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
function searchTools(q){q=q.toLowerCase();const cards=document.querySelectorAll(".tool");cards.forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?"flex":"none")}
const path=location.pathname.split("/").pop()||"index.html";
if(path==="index.html")home();else if(path==="chat.html")chat();else{const t=tools.find(x=>x[4]===path)||["x","🛠️","AI Workspace","Professional AI workspace.","x.html"];toolPage(t)}
