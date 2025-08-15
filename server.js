const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, "users.txt");

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

app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
