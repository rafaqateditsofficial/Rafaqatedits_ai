const KEY="rafaqatedits_gemini_key";
const MODEL="gemini-3.8-flash";
const $=id=>document.getElementById(id);
function openSettings(){const m=$("settings");if(m){m.classList.add("show");$("apiKey").value=localStorage.getItem(KEY)||""}}
function closeSettings(){const m=$("settings");if(m)m.classList.remove("show")}
function setStatus(ok){const s=$("status");if(s){s.textContent=ok?"Connected":"Not connected";s.style.color=ok?"#67dca9":"#d49b50"}}
function saveKey(){const k=$("apiKey").value.trim();if(!k){alert("Please paste your Gemini API key.");return}localStorage.setItem(KEY,k);closeSettings();setStatus(true);add("ai","Gemini connected. Ask me anything!")}
function clearKey(){localStorage.removeItem(KEY);$("apiKey").value="";setStatus(false);closeSettings()}
function add(type,text){const box=$("messages");if(!box)return;const m=document.createElement("div");m.className="msg "+type;m.textContent=text;box.appendChild(m);box.scrollTop=box.scrollHeight;return m}
async function sendMessage(){const input=$("prompt");const text=input.value.trim();if(!text)return;const key=localStorage.getItem(KEY);if(!key){openSettings();return}add("user",text);input.value="";const wait=add("ai","Thinking…");try{const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:text}]}]})});const d=await r.json();if(!r.ok)throw new Error(d?.error?.message||"Gemini API request failed.");wait.textContent=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"No response received."}catch(e){wait.textContent="API Error: "+e.message}}
window.addEventListener("load",()=>setStatus(!!localStorage.getItem(KEY)));