import multer from 'multer';
import path from 'path';
import { google } from 'googleapis';
import fs from 'fs';

// Configuração do Multer para armazenar arquivos temporariamente
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/'); // Pasta temporária
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo não é uma imagem!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Função para autenticar no Google Drive
const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDT6qkL5RGR2hlh\nVZVYkAX5stgM+dsVhnyyIrswOOJvB6jrPuLczwzDbv6VXA7troYJ7CLIiouoN6qM\nheajwfbYim2rQEtaHecjD3piMXEQthRj/hm/NECOAIMrD/7lXCaoWKP7FNkWlm6S\nys37Sz6AdXWC+H+I6/q279WQF01ULcKugZUB6mHkP5QwDiMVuy28/veMvQhUBzA1\nl/3iZpwQjw0HQ1HM90NAZUtsqb4AZft4uTjCMGw6Guxtj00OZmnDzug0TtcLUF7+\nmEi8jrHNhkiw1mFwI+PgZ3jaSQEmvIjvx5rh/D26AH6Z0BwuvyMpoQMAmZVSK/Xa\nP93Tq8rhAgMBAAECggEAAQ3AsX0TaEAgIyu5a+w61RC8PfB/d5aSelMZoWmXnsb4\nNlCeayyfvjH8zKXv8SHj2mkqlMcEhA6nSpKTJEmcltXufHs4+mKB3l2k/3hRbtAF\n2jutJidFEOHTwkwj5ypbrQz2fpMWx8MWyLg9cv7FeCO6iLqFvRxINcSI+2aNumiw\nevNffedZ7o2TM41858A57A+DHk5sqKh9itX67t9uN9sijbXXwqlnVXoAWiSAFiMu\nZhmwSigfjGGmOyXesWWkGTJN71UU8r5aL+Jx8PigWEqw97VTaSYy6SyXwFPRVAZk\ncgsoI2F5RtYjmB0HqlipoNXN5iDYnzcq8NL2rrPpvQKBgQDshyxwAWus5PMFQavY\npMHBJ/DJIDBhaI6mMKtPTYB8JDdHVZcm/oqIXL8zxB6JL7h9xCd+C+n5OkibjOd5\nPRRRYNHBnN3dyye4Wa39JrHogzwr/2WrHVac4b8lVsAGYm7QyuELp11DgzKGY7mj\neuzcrC/xelOVMX+CkW9fWlqE1QKBgQDlXM1WCCxDOU3/3QJWqnsAUldSmCaNsKYQ\nNzOgiySB1cN5AL6Riin1dhs3yOdOabjDCfNEdqQ3vsFTDH2MX3nZcM78clcCBT5z\n+uGAqj0luMQ9v8PP4P+EKRkZPzR1ml4nClU/3ly71KfB4uAfEYc8s9bwzRfi85N9\ndJggrOYj3QKBgQCPtMkQ/Cv5jdkBVpccN23o92VaLY53gFk7K9LJieMIidB0LNJ7\nRKfSldctknijDTVgZC9Ca+aqH/lBWOjCRpPzpYmLws0iFm55mTMW3c214RZL/Q4+\nWsLm6lmCTCS7PE7r2HfG5tbJUAsAj9KYOvVyVcODSblCqiI4qDgsjO72SQKBgDkw\nc46RCSBV6In0vIGJjpPc9CMHBw3rTuzaJshQCXFKMKw6MEovzhiDM3QsZuhZWhVf\npMWcY4P2z1N62M8oe0RpaWLuy50YW6Mlmhav3AFM2bmf2B48NtnoOXbfGKB+Nh27\n6Ne9BRhchNvGSyXUBAlxuhVevib7nvn4GXqEQfoNAoGBAM95Wuz3qD3h7YtWnL9m\nJzGj3SAPCXJba7pBAEPlCkFBAkiB2YSm79/jFmFp9okc/K5edlBF9s0WhWccIWBf\nlTfcImaDVQ3SjVT5lFHce4TYqxcObPbhEQC4Osx/u9WaWAusHgGS/DrwZxVaV76S\nKzocFM2N06PPzfothIQ3kmR0\n-----END PRIVATE KEY-----\n",
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  return auth;
};

// Função para fazer upload para o Google Drive
const uploadToGoogleDrive = async (filePath, fileName) => {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    parents: ['1RwA-DULhK0-gb3DfbF91HT06Jhee3wV2'] // ID da pasta no Google Drive
  };

  const media = {
    mimeType: 'image/jpeg', // Ajuste conforme necessário
    body: fs.createReadStream(filePath)
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id' // Solicita apenas o ID como resposta
    });

    // Verifica se a resposta e o ID existem
    if (response && response.data && response.data.id) {
      console.log('Arquivo enviado para o Google Drive. ID:', response.data.id);
      // Exclui o arquivo temporário APÓS o upload bem-sucedido
      fs.unlinkSync(filePath);
      // Retorna o ID do arquivo do Google Drive
      return response.data.id;
    } else {
      // Se não houver ID, lança um erro
      console.error('Falha ao obter ID do arquivo do Google Drive. Resposta:', response);
      // Considerar não deletar o arquivo temporário aqui se o upload falhou
      throw new Error('Falha ao fazer upload para o Google Drive ou obter ID.');
    }
  } catch (error) {
    console.error('Erro durante o upload para o Google Drive:', error);
    // Tenta excluir o arquivo temporário mesmo em caso de erro no upload
    try {
      fs.unlinkSync(filePath);
    } catch (unlinkError) {
      console.error('Erro ao excluir arquivo temporário após falha no upload:', unlinkError);
    }
    // Re-lança o erro para ser tratado na rota
    throw error;
  }
};

// Middleware para processar o upload e enviar ao Google Drive
const processUpload = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;

  try {
    await uploadToGoogleDrive(filePath, fileName);
    res.status(200).send('Arquivo enviado com sucesso para o Google Drive.');
  } catch (error) {
    console.error('Erro ao enviar para o Google Drive:', error);
    res.status(500).send('Erro ao enviar arquivo.');
  }
};

export { upload, processUpload, uploadToGoogleDrive };
export default upload;