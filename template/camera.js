const express = require('express');
const port = 5000;
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/camera', (req, res) => {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, ''); // Hapus header dari data gambar base64
    const fileName = `hasil/hasil_${Date.now()}.png`; // Nama file unik dengan timestamp

    fs.writeFile(fileName, base64Data, 'base64', (error) => {
        if (error) {
            console.error(error);
            res.sendStatus(404);
        } else {
            // res.redirect('https://google.com/')
            console.log(`${fileName} tersimpan.`);
            res.sendStatus(200);
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

