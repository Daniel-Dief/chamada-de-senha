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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  next();
});

app.get('/getPasswords', (req, res) => {
  let passwords = {
    "senha_normal": primaryPassword,
    "senha_preferencial": secondaryPassword
  }

  res.json(passwords);
})

app.post('/addPrimaryPassword', (req, res) => {
  primaryPassword++;

  primaryPassword = primaryPassword > 99 ? 0 : primaryPassword;

  res.send({
    "status": "success",
    "primaryNumber": primaryPassword
  });

  writeSavePassword();
})

app.post('/addSecondaryPassword', (req, res) => {
  secondaryPassword++;

  secondaryPassword = secondaryPassword > 99 ? 0 : secondaryPassword;

  res.send({
    "status": "success",
    "secondayNumber": secondaryPassword
  });
  
  writeSavePassword();
})

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});