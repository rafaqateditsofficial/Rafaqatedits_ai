const KEY = "rafaqatedits_gemini_key";
const MODEL = "gemini-3.8-flash";

const $ = (id) => document.getElementById(id);

function openSettings() {
  $("settings").classList.add("show");
  $("apiKey").value = localStorage.getItem(KEY) || "";
}

function closeSettings() {
  $("settings").classList.remove("show");
}

function toggleMenu() {
  $("menu").classList.toggle("show");
}

function setStatus(connected) {
  const status = $("status");
  if (!status) return;

  status.textContent = connected ? "Connected" : "Not connected";
  status.style.color = connected ? "#62e5b2" : "#ffc95a";
  status.style.background = connected ? "#073126" : "#251c08";
}

function saveKey() {
  const key = $("apiKey").value.trim();

  if (!key) {
    alert("Please paste your Gemini API key.");
    return;
  }

  localStorage.setItem(KEY, key);
  closeSettings();
  setStatus(true);

  add("ai", "Gemini API connected successfully. Ask me anything!");
}

function clearKey() {
  localStorage.removeItem(KEY);
  $("apiKey").value = "";
  setStatus(false);
  closeSettings();
}

function add(type, text) {
  const message = document.createElement("div");

  message.className = "msg " + type;
  message.textContent = text;

  $("messages").appendChild(message);
  $("messages").scrollTop = $("messages").scrollHeight;

  return message;
}

async function sendMessage() {
  const input = $("prompt");
  const text = input.value.trim();

  if (!text) return;

  const key = localStorage.getItem(KEY);

  if (!key) {
    openSettings();
    alert("First connect your Gemini API key.");
    return;
  }

  add("user", text);
  input.value = "";

  const waiting = add("ai", "Thinking…");

  try {
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: text
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
        "Gemini API request failed."
      );
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") ||
      "No text response received.";

    waiting.textContent = answer;

  } catch (error) {
    waiting.textContent =
      "API Error: " +
      error.message +
      "\n\nPlease check your Gemini API key and make sure your API access is enabled.";
  }
}

window.addEventListener("load", () => {
  const key = localStorage.getItem(KEY);

  if (key) {
    setStatus(true);
  } else {
    setStatus(false);
  }
});
