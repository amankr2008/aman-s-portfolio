const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
app.use(express.static(path.join(__dirname)));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* ================= HOME PAGE ================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ================= CONTACT API ================= */
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amanjuly2009@gmail.com",
        pass: "YOUR_APP_PASSWORD" // ⚠️ yaha Gmail App Password use karo
      }
    });

    await transporter.sendMail({
      from: email,
      to: "amanjuly2009@gmail.com", // apna email daalo
      subject: "New Contact Message",
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`
    });

    res.json({ reply: "Message sent successfully ✅" });

  } catch (error) {
    console.log(error);
    res.json({ reply: "Error sending message ❌" });
  }
});

/* ================= AI CHATBOT ================= */
app.post("/chat", (req, res) => {
  let msg = req.body.message.toLowerCase();

  let reply = "Samajh nahi aaya 😅";

  // greetings
  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello 👋 Kaise help karu aapki?";
  }

  // website related
  else if (msg.includes("website")) {
    reply = "Haan 👍 main aapke liye website bana sakta hoon.\nAapko kis type ki website chahiye? (portfolio, business, e-commerce)";
  }

  // need website
  else if (msg.includes("need a website") || msg.includes("i need website")) {
    reply = "Great 🔥 Main aapke liye professional website bana dunga.\nPlease batao kis type ki website chahiye?";
  }

  // portfolio
  else if (msg.includes("portfolio")) {
    reply = "Portfolio website aapko personal branding ke liye best hai 😎";
  }

  // contact
  else if (msg.includes("contact")) {
    reply = "Aap contact form fill kar sakte ho ya direct email kar sakte ho 👍";
  }

  // price
  else if (msg.includes("price") || msg.includes("cost")) {
    reply = "Website ka cost depend karta hai features pe 💰\nBasic website ₹2000-₹5000 me ban jati hai.";
  }

  res.json({ reply });
});
/* ================= START SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});