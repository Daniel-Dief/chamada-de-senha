import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
let primaryPassword = 0;
let secondaryPassword = 0;

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
})

// Rota para incrementar o valor da senha preferencial
app.post('/addSecondaryPassword', (req, res) => {
  secondaryPassword++;

  secondaryPassword = secondaryPassword > 99 ? 0 : secondaryPassword;

  res.send({
    "status": "success"
  });
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