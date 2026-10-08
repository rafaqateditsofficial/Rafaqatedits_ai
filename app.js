const KEY="rafaqatedits_gemini_key";
const MODEL="gemini-3.8-flash";
const $=id=>document.getElementById(id);

const TOOL_INFO={
chat:["AI Chat","Ask anything and get answers from Gemini.","Ask Gemini anything..."],
image:["AI Image","Create image concepts, prompts and visual directions.","Describe the image you want..."],
video:["AI Video","Create video concepts, scripts, shot lists and prompts.","Describe the video you want..."],
writing:["AI Writer","Write scripts, posts, captions, emails and polished copy.","What should I write?"],
coding:["AI Coding","Generate, explain, debug and improve code.","Describe the coding task..."],
voice:["AI Voice","Create narration, voice scripts and audio ideas.","Describe the voice task..."],
search:["AI Search","Research, explain and compare information with Gemini.","What do you want to research?"],
agents:["AI Agents","Plan multi-step AI workflows and agent instructions.","Describe the workflow..."],
"content-generator":["Content Generator","Generate professional content with Gemini.","What content should I create?"],
"data-analysis":["Data Analysis","Analyze data that you paste into the workspace.","Paste your data or question..."],
"document-analyzer":["Document Analyzer","Analyze text that you paste here.","Paste document text..."],
"report-maker":["Report Maker","Create structured reports and summaries.","What report do you need?"],
summarizer:["Summarizer","Summarize text clearly and quickly.","Paste text to summarize..."],
translator:["Translator","Translate text between languages.","Enter text and target language..."],
research:["Research","Research a topic and organize the answer.","What topic should I research?"]
};

function escapeHTML(value){
return String(value||"").replace(/[&<>"']/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[c]));
}

function currentPage(){
const file=location.pathname.split("/").pop();
return(file||"chat.html").replace(/\.html$/,"")||"chat";
}

function openSettings(){
let modal=$("settings");

if(!modal){
modal=document.createElement("div");
modal.id="settings";
modal.className="ra-modal";

modal.innerHTML=`
<div class="ra-modal-box">
<button class="ra-close" id="closeSettings">×</button>
<h2>Gemini API</h2>
<p>Paste your Gemini API key. It is stored only in this browser.</p>

<input
id="apiKey"
type="password"
placeholder="Paste Gemini API key">

<label>
<input id="showKey" type="checkbox">
Show key
</label>

<div class="ra-actions">
<button class="ra-primary" id="saveKey">
Save & Connect
</button>

<button class="ra-secondary" id="clearKey">
Remove Key
</button>
</div>
</div>`;

document.body.appendChild(modal);

$("closeSettings").onclick=closeSettings;

$("showKey").onchange=e=>{
$("apiKey").type=e.target.checked?"text":"password";
};

$("saveKey").onclick=saveKey;
$("clearKey").onclick=clearKey;
}

$("apiKey").value=localStorage.getItem(KEY)||"";
modal.classList.add("show");
}

function closeSettings(){
const modal=$("settings");
if(modal)modal.classList.remove("show");
}

function saveKey(){
const key=$("apiKey").value.trim();

if(!key){
alert("Please paste your Gemini API key.");
return;
}

localStorage.setItem(KEY,key);
closeSettings();
setStatus(true);
}

function clearKey(){
localStorage.removeItem(KEY);

if($("apiKey"))
$("apiKey").value="";

closeSettings();
setStatus(false);
}

function setStatus(connected){
const status=$("status");

if(status)
status.textContent=connected
?"Connected"
:"Not connected";
}

function addMessage(type,text){
const box=$("messages");

if(!box)
return null;

const message=document.createElement("div");

message.className="ra-msg "+type;

message.innerHTML=
escapeHTML(text).replace(/\n/g,"<br>");

box.appendChild(message);

box.scrollTop=box.scrollHeight;

return message;
}async function askGemini(prompt){
const key=localStorage.getItem(KEY);

if(!key){
openSettings();
throw new Error("Connect your Gemini API key first.");
}

const response=await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/"+MODEL+":generateContent",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"x-goog-api-key":key
},
body:JSON.stringify({
contents:[
{
role:"user",
parts:[
{text:prompt}
]
}
]
})
}
);

const data=await response.json();

if(!response.ok){
throw new Error(
data?.error?.message ||
"Gemini API request failed."
);
}

return data?.candidates?.[0]?.content?.parts
?.map(part=>part.text||"")
.join("") ||
"No response received.";
}

async function sendMessage(){
const input=$("prompt");

if(!input)
return;

const text=input.value.trim();

if(!text)
return;

addMessage("user",text);

input.value="";

const waiting=addMessage(
"ai",
"Thinking…"
);

try{

const answer=await askGemini(text);

waiting.innerHTML=
escapeHTML(answer)
.replace(/\n/g,"<br>");

setStatus(true);

}catch(error){

waiting.innerHTML=
"<b>Connection error</b><br>"+
escapeHTML(error.message);

setStatus(false);
}
}

function renderToolPage(){

const app=$("app");

if(!app)
return;

const page=currentPage();

const info=
TOOL_INFO[page] ||
TOOL_INFO.chat;

document.title=
info[0]+" — Rafaqatedits AI";

app.innerHTML=`
<div class="ra-shell">

<header class="ra-top">

<a class="ra-brand" href="index.html">
Rafaqatedits <b>AI</b>
</a>

<a class="ra-home" href="index.html">
← Home
</a>

<button class="ra-api" id="apiBtn">
⚙ Gemini API
</button>

</header>

<main class="ra-tool">

<div class="ra-kicker">
RAFAQATEDITS AI ·
${escapeHTML(
page.replace(/-/g," ")
.toUpperCase()
)}
</div>

<h1>
${escapeHTML(info[0])}
</h1>

<p class="ra-desc">
${escapeHTML(info[1])}
</p>

<div class="ra-chat">

<div class="ra-chat-head">

<span>
✦ Gemini AI
</span>

<span id="status">
${localStorage.getItem(KEY)
?"Connected"
:"Not connected"}
</span>

</div>

<div id="messages">

<div class="ra-msg ai">
Hello! I’m ready.
Connect your Gemini API key
and send a message.
</div>

</div>

<div class="ra-compose">

<textarea
id="prompt"
placeholder="${escapeHTML(info[2])}">
</textarea>

<button id="send">
Send →
</button>

</div>

</div>

<p class="ra-note">
Your API key stays in this browser.
Your prompt is sent directly to Google Gemini.
</p>

</main>

</div>
`;

$("apiBtn").onclick=openSettings;

$("send").onclick=sendMessage;

$("prompt").addEventListener(
"keydown",
event=>{

if(
event.key==="Enter" &&
!event.shiftKey
){

event.preventDefault();

sendMessage();

}

}
);

}

window.addEventListener(
"load",
renderToolPage
);
