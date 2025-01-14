# Chamada-de-Senha

Controle eficiente de fila de clientes para laboratórios por meio de senhas, automatizando o processo de chamada e simplificando o fluxo.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Licença](#licença)
- [Futuro do Projeto](#futuro-do-projeto)

---

## Sobre o Projeto

O **Chamada-de-Senha** é uma aplicação web integrada a uma API, projetada para gerenciar filas de clientes em laboratórios de forma automatizada. O sistema facilita o funcionamento da fila e permite a interação entre uma smart TV e um computador host, oferecendo uma interface gráfica para chamadas de senhas.

**Funcionalidades principais:**
- Automação do sistema de fila.
- Integração com ESP32 para avanço da fila.
- Interface gráfica para exibição e controle.

## Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-43853d?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
- ![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)

## Instalação

Para executar a aplicação, siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/chamada-de-senha.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd chamada-de-senha
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie a API:
   ```bash
   npm start
   ```

> **Nota:** O Node.js precisa ser instalado **apenas no computador host**. A smart TV se conecta ao front-end gerado pelo host.

## Como Usar

1. Após iniciar a API, a interface gráfica ficará disponível para a smart TV por meio do navegador.
2. O avanço das senhas na fila será realizado por uma placa **ESP32**, que irá fazer requisições à API.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Futuro do Projeto

Em uma atualização futura, será incluído o link para o repositório do código da placa **ESP32**, facilitando a integração e uso para o laboratório.
