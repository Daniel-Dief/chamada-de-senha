// Função para carregar uma nova página 
function LP(file) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar a página');
        }
        return response.text();
      })
      .then(html => {
        document.documentElement.innerHTML = html;
  
        const newScript = document.createElement('script');
        newScript.innerHTML = `
          function LP(file) {
            fetch(file)
              .then(response => response.text())
              .then(html => document.documentElement.innerHTML = html)
              .catch(err => console.error(err));
          }
        `;
        document.body.appendChild(newScript);
      })
      .catch(error => {
        alert(`Erro ao carregar a página: ${error.message}`);
      });
  }