const express = require('express');
const cors = require('cors'); // Kailangan ito para sa Vercel integration
const path = require('path');
const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
app.use(express.json());

// Enable CORS: Pinapayagan nito ang Vercel HTTPS scanner na mag-send ng data sa local IP mo
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST']
}));

// Serve static files (kung gusto mo pa rin i-access ang index.html locally)
app.use(express.static(__dirname));

let scanBuffer = "";

// --- ROUTES ---

// Route para sa local preview
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint: Tinatanggap ang scan data mula sa phone (Vercel o Local)
app.post('/api/scan', (req, res) => {
    scanBuffer = req.body.qrData;
    console.log(`[SCAN RECEIVED]: ${scanBuffer}`);
    res.json({ status: "success", message: "Data received by local server" });
});

// Endpoint: Dito kumukuha ang Excel VBA (Polling)
app.get('/api/poll', (req, res) => {
    res.send(scanBuffer);
    scanBuffer = ""; // Nililinis ang buffer pagkatapos makuha ng VBA
});

// --- SERVER START ---
// Mahalaga ang '0.0.0.0' para makita ng phone ang PC mo sa network
app.listen(PORT, '0.0.0.0', () => {
    console.log('-------------------------------------------');
    console.log('S.U.L.A.T. LOCAL BACKEND IS RUNNING');
    console.log(`Port: ${PORT}`);
    console.log('-------------------------------------------');
    console.log('Paalala para sa MSTIP Defense:');
    console.log('1. Siguraduhin na naka-USB Tethering ang phone.');
    console.log('2. I-check ang IPv4 sa ipconfig.');
    console.log('3. Dapat tugma ang IP sa index.html na nasa Vercel.');
    console.log('-------------------------------------------');
});