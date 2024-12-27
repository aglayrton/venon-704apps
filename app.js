const express = require('express');
const venom = require('venom-bot');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
