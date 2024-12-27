const { sendMessage, getMessageStatus } = require('../models/messageModel');  // Importa as funções do modelo

// Enviar uma mensagem
const sendMessageController = async (req, res) => {  
    const { to, message } = req.body;  // Desestrutura os parâmetros 'to' e 'message' da requisição

    if (!to || !message) {  // Se os parâmetros não forem passados, retorna erro
        return res.status(400).json({ error: 'Telefone e mensagem são obrigatórios.' });
    }

    try {
        const result = await sendMessage(to, message);  // Chama a função para enviar a mensagem
        return res.status(200).json({ success: true, result });  // Retorna a resposta com sucesso e o resultado
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao enviar mensagem.' });  // Caso ocorra erro, retorna erro
    }
};




// Verificar o status da mensagem
const getMessageStatusController = async (req, res) => {  
    const { messageId } = req.params;  // Extrai o messageId da URL da requisição

    if (!messageId) {  // Se não fornecer um messageId, retorna erro
        return res.status(400).json({ error: 'Message ID é obrigatório.' });
    }

    try {
        const status = await getMessageStatus(messageId);  // Chama a função para verificar o status da mensagem
        return res.status(200).json({ success: true, status });  // Retorna o status da mensagem
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter status da mensagem.' });  // Caso ocorra erro, retorna erro
    }
};

module.exports = { sendMessageController, getMessageStatusController };  // Exporta as funções para serem usadas nas rotas
