function criarCardServico(servico) {
  return `
    <div class="service-card${servico.badge ? ' featured' : ''}">
      <div class="service-image">
        <img src="${servico.image || './src/barbearia.jpg'}" alt="${servico.name}">
        ${servico.badge ? `<div class="featured-tag">${servico.badge}</div>` : ''}
      </div>
      <div class="service-content">
        <h3>${servico.name}</h3>
        <p>${servico.description || ''}</p>
        <ul class="service-features">
          ${servico.duration ? `<li><i class="fas fa-clock"></i> ${servico.duration}</li>` : ''}
          ${servico.category ? `<li><i class="fas fa-check"></i> ${servico.category}</li>` : ''}
        </ul>
        <div class="service-price">
          ${servico.originalPrice && servico.originalPrice > servico.price ? `<span class="original-price">R$ ${servico.originalPrice.toFixed(2)}</span>` : ''}
          <span>R$ ${servico.price.toFixed(2)}</span>
          <a class="btn-login" href="/agendamento.html">Agendar</a>
        </div>
      </div>
    </div>
  `;
}

// Função para renderizar os serviços na página
function renderizarServicos(servicos) {
  const container = document.querySelector('.services-container');
  if (!container) return;
  container.innerHTML = servicos.map(criarCardServico).join('');
}

// Buscar os dados do backend via data.js
fetch('/servicos')
  .then(response => response.json())
  .then(data => {
    renderizarServicos(data);
  })
  .catch(error => {
    console.error('Erro ao buscar serviços:', error);
  }); 