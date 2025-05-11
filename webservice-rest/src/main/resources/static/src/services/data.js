fetch('/servicos')
  .then(response => response.json())
  .then(data => {
    console.log('Serviços:', data);
  })
  .catch(error => console.error('Erro ao buscar serviços:', error));
