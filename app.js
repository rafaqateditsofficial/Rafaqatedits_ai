const KEY="rafaqatedits_gemini_key";
const MODEL="gemini-2.5-flash";
const $=id=>document.getElementById(id);
function openSettings(){ $("settings").classList.add("show"); $("apiKey").value=localStorage.getItem(KEY)||""; }
function closeSettings(){ $("settings").classList.remove("show"); }
function toggleMenu(){ $("menu").classList.toggle("show"); }
function saveKey(){const k=$("apiKey").value.trim();if(!k){alert("Please paste your Gemini API key.");return}localStorage.setItem(KEY,k);closeSettings();$("status").textContent="Connected";$("status").style.color="#62e5b2";$("status").style.background="#073126";add("ai","Gemini API connected successfully. Ask me anything!");}
function clearKey(){localStorage.removeItem(KEY);$("apiKey").value="";$("status").textContent="Not connected";$("status").style.color="#ffc95a";$("status").style.background="#251c08";closeSettings();}
function add(type,text){const d=document.createElement("div");d.className="msg "+type;d.textContent=text;$("messages").appendChild(d);$("messages").scrollTop=$("messages").scrollHeight;return d;}
async function sendMessage(){
 const input=$("prompt"),text=input.value.trim();if(!text)return;
 const key=localStorage.getItem(KEY);if(!key){openSettings();alert("First connect your Gemini API key.");return}
 add("user",text);input.value="";const wait=add("ai","Thinking…");
 try{
  const url=`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;
  const res=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text}]}]})});
  const data=await res.json();
  if(!res.ok) throw new Error(data?.error?.message||"Gemini API request failed.");
  const answer=data?.candidates?.[0]?.content?.parts?.map(x=>x.text||"").join("")||"No text response received.";
  wait.textContent=answer;
 }catch(e){wait.textContent="API Error: "+e.message+"\n\nCheck that your Gemini API key is valid and that the selected Gemini model is available for your key.";}
}
window.addEventListener("load",()=>{if(localStorage.getItem(KEY)){$("status").textContent="Connected";$("status").style.color="#62e5b2";$("status").style.background="#073126";}});
