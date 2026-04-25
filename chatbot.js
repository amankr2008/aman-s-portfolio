const toggle = document.getElementById("chat-toggle");
const chat = document.getElementById("chat-container");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

/* open/close */
toggle.onclick = () => {
  if (chat.style.display === "none" || chat.style.display === "") {
    chat.style.display = "flex";
  } else {
    chat.style.display = "none";
  }
};

/* enter key */
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

/* auto reply */
function getReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello")) {
    return "Hello 👋 kaise help karu?";
  }

  if (msg.includes("website")) {
    return "Main website bana sakta hoon 💻 Price ₹3000 se start hota hai.";
  }

  if (msg.includes("price")) {
    return "₹2000 - ₹5000 tak hota hai 👍";
  }

  return "Samajh nahi aaya 😅";
}

/* send */
function sendMessage() {
  const msg = input.value;
  if (!msg.trim()) return;

  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  input.value = "";

  setTimeout(() => {
    chatBox.innerHTML += `<p><b>Bot:</b> ${getReply(msg)}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
}