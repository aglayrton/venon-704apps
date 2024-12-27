const venom = require('venom-bot');  // Importa o Venom para interagir com o WhatsApp

let client;  // Declara uma variável para armazenar a conexão do Venom com o WhatsApp

const initClient = async () => {
    try {
        client = await venom.create(
            'sessionName', // Nome da sessão
            (base64Qr, asciiQr, attempts, urlCode) => {
                console.log('Escaneie este QR Code no WhatsApp:');
                console.log(asciiQr); // Mostra o QR Code ASCII no terminal
            },
            undefined, // Não usei callbacks extras para status
            {
                headless: true, // Executa sem abrir o navegador visualmente
                useChrome: false, // Use Chromium integrado ao Venom
                disableSpins: true, // Remove animações de "carregando" no terminal
                logQR: true, // Mostra o QR Code no terminal
                folderNameToken: 'tokens', // Diretório onde os tokens serão armazenados
                mkdirFolderToken: './', // Caminho onde os tokens serão criados
            }
        );

        console.log('WhatsApp conectado!');
    } catch (error) {
        console.error('Erro ao conectar ao WhatsApp:', error);
    }
};


const sendMessage = async (to, message) => {
    try {
        const formattedNumber = to.includes('@') ? to : `${to}@c.us`;
      const result = await client.sendText(formattedNumber, message);
      return result;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      if (error.message.includes('invalid number')) {
        return { error: 'Número de telefone inválido' };
      } else if (error.message.includes('rate limit')) {
        return { error: 'Limite de mensagens excedido' };
      } else {
        return { error: 'Erro desconhecido' };
      }
    }
  };

// Função para verificar o status de uma mensagem enviada
const getMessageStatus = async (messageId) => {
    try {
        const status = await client.checkMessagesStatus([messageId]);  // Checa o status da mensagem com o ID fornecido
        return status;  // Retorna o status da mensagem
    } catch (error) {
        console.error('Erro ao verificar status da mensagem', error);  // Exibe erro se a verificação falhar
        throw error;  // Lança o erro para ser tratado pelo controlador
    }
};

// Função para ouvir novas mensagens no WhatsApp
const listenForMessages = () => {
    client.onMessage((message) => {  // Configura o Venom para escutar novas mensagens
        console.log('Nova mensagem recebida:', message);  // Exibe no console a mensagem recebida
        // Aqui você pode processar ou armazenar a mensagem conforme necessário
    });
};

initClient().then(() => {
    listenForMessages();  // Inicia a escuta de mensagens somente se o cliente foi inicializado
}).catch((error) => {
    console.error('Erro ao inicializar o cliente Venom:', error);
});


module.exports = { sendMessage, getMessageStatus, listenForMessages };  // Exporta as funções para serem usadas em outros módulos