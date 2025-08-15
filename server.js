const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ստեղծում ենք users.txt ֆայլի path
const USERS_FILE = path.join(__dirname, "users.txt");

// Root route (Render browser-ում բացելու համար)
app.get("/", (req, res) => {
  res.send("✅ Server is running. Use POST /save-wallet to save wallets.");
});

// POST route wallet պահելու համար
app.post("/save-wallet", (req, res) => {
    const { username, wallet } = req.body;
    if (!wallet) {
        return res.status(400).json({ error: "Wallet address required" });
    }

    const newLine = `${username || "Unknown"} | ${wallet}\n`;
    fs.appendFile(USERS_FILE, newLine, (err) => {
        if (err) {
            console.error("❌ Error writing file:", err);
            return res.status(500).json({ error: "Server error" });
        }
        console.log(`✅ Saved: ${username} | ${wallet}`);
        res.json({ success: true });
    });
});

// Render-ում port ստանում ենք environment variable-ից
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

