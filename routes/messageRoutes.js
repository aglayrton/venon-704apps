const express = require('express');  // Importa o Express
const { sendMessageController, getMessageStatusController } = require('../controllers/messageController');  // Importa as funções de controle

const router = express.Router();  // Cria um roteador para gerenciar as rotas

// Endpoint para enviar mensagem
router.post('/send', sendMessageController);  

// Endpoint para verificar o status da mensagem
router.get('/status/:messageId', getMessageStatusController);

module.exports = router;  // Exporta o roteador para ser usado no app.js
