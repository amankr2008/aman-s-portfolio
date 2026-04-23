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

  if (msg.includes("hello")) reply = "Hello 👋";
  else if (msg.includes("hi")) reply = "Hi 😊";
  else if (msg.includes("portfolio")) reply = "Ye Aman ka portfolio hai 😎";
  else if (msg.includes("contact")) reply = "Contact form fill karo 👍";

  res.json({ reply });
});

/* ================= START SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});