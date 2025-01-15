import express from 'express';
import path from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'save.json');

let primaryPassword = 0;
let secondaryPassword = 0;

readSavePasswords().then(data => {
  primaryPassword = data.primaryPassword;
  secondaryPassword = data.secondaryPassword;
})

async function readSavePasswords() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    return {
      primaryPassword: jsonData.primary_password,
      secondaryPassword: jsonData.secondary_password
    }
    
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
    throw err;
  }
}

async function writeSavePassword() {
  try {
    const data = JSON.stringify({
      primary_password: primaryPassword,
      secondary_password: secondaryPassword
    }, null, 2);

    await fs.writeFile(filePath, data, 'utf8');
  } catch (err) {
    console.error('Erro ao escrever no arquivo:', err);
    throw err;
  }
}

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para fazer o parse do corpo da requisição
app.use(express.json());

// Middleware para adicionar os cabeçalhos CORS manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  next();
});

// Rota para informar o valor das senhas atuais
app.get('/getPasswords', (req, res) => {
  let passwords = {
    "senha_normal": primaryPassword,
    "senha_preferencial": secondaryPassword
  }

  res.json(passwords);
})

// Rota para incrementar o valor da senha normal
app.post('/addPrimaryPassword', (req, res) => {
  primaryPassword++;

  primaryPassword = primaryPassword > 99 ? 0 : primaryPassword;

  res.send({
    "status": "success"
  });

  writeSavePassword();
})

// Rota para incrementar o valor da senha preferencial
app.post('/addSecondaryPassword', (req, res) => {
  secondaryPassword++;

  secondaryPassword = secondaryPassword > 99 ? 0 : secondaryPassword;

  res.send({
    "status": "success"
  });
  
  writeSavePassword();
})

// Rota para alterar o valor das senhas manualmente
app.post('/setPasswords', (req, res) => {
  if(req.body && "primary_password" in req.body && "secondary_password" in req.body) {
    if(typeof(req.body.primary_password) === "number" && typeof(req.body.secondary_password) === "number") {
      primaryPassword = req.body.primary_password;
      secondaryPassword = req.body.secondary_password;

      primaryPassword = primaryPassword > 99 ? 0 : primaryPassword;
      secondaryPassword = secondaryPassword > 99 ? 0 : secondaryPassword;

      res.send({
        "status": "success"
      });
      
      writeSavePassword();
    } else {
      res.status(400).send({
        "status": "error",
        "message": "Parâmetros inválidos"
      });

      return;
    }
  } else {
    res.status(400).send({
      "status": "error",
      "message": "Parâmetros inválidos"
    });

    return;
  }
})

// Endpoint que responde com a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});