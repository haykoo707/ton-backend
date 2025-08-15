const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Persistent disk path (Render mount path)
const USERS_FILE = path.join("/data", "users.txt");

// Ensure /data folder and file exist
if (!fs.existsSync("/data")) {
    fs.mkdirSync("/data");
}
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "");
}

// Save wallet endpoint
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

// Get last 20 wallets
app.get("/wallets", (req, res) => {
    try {
        const lines = fs.readFileSync(USERS_FILE, "utf8").trim().split("\n");
        const last20 = lines.slice(-20);
        res.json({ wallets: last20 });
    } catch (err) {
        res.status(500).json({ error: "Failed to read wallets" });
    }
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("✅ TON Wallet Backend is running. Use POST /save-wallet or GET /wallets");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
