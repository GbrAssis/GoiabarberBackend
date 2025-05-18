// Função para decodificar os dados da URL
function getPurchaseDetails() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data'); 
    console.log(data);
    if (data) {
        const decodedData = JSON.parse(atob(data));
        console.log(decodedData);
        displayPurchaseDetails(decodedData); 
    }
}

// Função para exibir os dados da compra
function displayPurchaseDetails(details) {
    const detailsDiv = document.getElementById('booking-summary');
    const totalRow = document.getElementById('total-row');
    const installments = document.getElementById('installments');

    detailsDiv.innerHTML = `
        <h2><i class="fas fa-calendar-check"></i> Resumo do Agendamento</h2>
                <div class="summary-card">
                    <div class="summary-item">
                        <i class="fas fa-cut"></i>
                        <div class="item-details">
                            <label>Serviço</label>
                            <span id="service-name">${details.service}</span>
                        </div>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-user-tie"></i>
                        <div class="item-details">
                            <label>Profissional</label>
                            <span id="barber-name">${details.barber}</span>
                        </div>
                    </div>
                    <div class="summary-item">
                        <i class="far fa-calendar-alt"></i>
                        <div class="item-details">
                            <label>Data</label>
                            <span id="booking-date">${details.date}</span>
                        </div>
                    </div>
                    <div class="summary-item">
                        <i class="far fa-clock"></i>
                        <div class="item-details">
                            <label>Horário</label>
                            <span id="booking-time">${details.time}</span>
                        </div>
                    </div>
                </div>
    `;
    totalRow.innerHTML = `
        <span>Total</span>
        <span>R$ ${details.price}</span>
    `;
    updateInstallmentOptions(details);
}

// Arredonda para 2 casas decimais
function formatPrice(value) {
    return (Math.round(value * 100) / 100).toFixed(2);
}

// Atualiza as opções de parcelamento
function updateInstallmentOptions(details) {
    const installmentSelect = document.getElementById('installments');
    installmentSelect.innerHTML = `
        <select>
            <option>1x de R$ ${formatPrice(details.price)}</option>
            <option>2x de R$ ${formatPrice(details.price / 2)}</option>
            <option>3x de R$ ${formatPrice(details.price / 3)}</option>
        </select>
    `;
}

const moneySection = document.getElementById('moneySection');
const pixSection = document.getElementById('pixSection');
const creditCardForm = document.getElementById('credit-card-form');

document.getElementById('credit-card').addEventListener('click', () => {
    moneySection.style.display = 'none';
    pixSection.style.display = 'none';
    creditCardForm.style.display = 'block';
});
document.getElementById('pix').addEventListener('click', () => {
    creditCardForm.style.display = 'none';
    moneySection.style.display = 'none';
    pixSection.style.display = 'block';
});
document.getElementById('money').addEventListener('click', () => {
    creditCardForm.style.display = 'none';
    pixSection.style.display = 'none';
    moneySection.style.display = 'block';
});

function validateCreditCardForm() {
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;

    if (!cardName.trim()) {
        showError('Por favor, insira o nome no cartão');
        return false;
    }
    if (!cardNumber.trim() || cardNumber.length < 16) {
        showError('Número do cartão inválido');
        return false;
    }
    if (!cardExpiry.trim() || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        showError('Data de validade inválida (MM/YY)');
        return false;
    }
    if (!cardCVV.trim() || cardCVV.length < 3) {
        showError('CVV inválido');
        return false;
    }
    return true;
}

function showError(message) {
    // Você pode implementar sua própria lógica de exibição de erro
    alert(message);
}

function generateOrderNumber() {
    return 'GB' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

document.querySelector('.confirm-button').addEventListener('click', () => {
    const creditCardOption = document.getElementById('credit');
    const pixOption = document.getElementById('pix');
    const moneyOption = document.getElementById('money');

    if (creditCardOption.checked && !validateCreditCardForm()) {
        return;
    }
    const orderNumber = generateOrderNumber();
    window.location.href = `thank-you.html?order=${orderNumber}`;
});

// Chama a função ao carregar a página
window.onload = getPurchaseDetails;