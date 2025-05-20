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

// Adiciona a biblioteca QRCode.js
document.head.innerHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>';

// Função para gerar o QR Code
function generatePixQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    if (!qrcodeContainer) {
        console.error('Container do QR Code não encontrado');
        return;
    }
    
    qrcodeContainer.innerHTML = ''; // Limpa o container

    // Gera um código PIX aleatório
    const pixCode = generateRandomPixCode();
    
    // Atualiza o input com o código PIX
    const pixCodeInput = document.getElementById('pixCode');
    if (pixCodeInput) {
        pixCodeInput.value = pixCode;
    }

    try {
        // Gera o QR Code
        new QRCode(qrcodeContainer, {
            text: pixCode,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log('QR Code gerado com sucesso');
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
    }
}

// Função para gerar um código PIX aleatório
function generateRandomPixCode() {
    // Estrutura básica do código PIX
    const pixHeader = "00020126580014BR.GOV.BCB.PIX0136";
    const pixFooter = "520400005303986540599.905802BR5915GOIABARBER6008BRASILIA62070503***6304E2CA";
    
    // Gera um ID aleatório de 36 caracteres
    const randomId = Array.from({length: 36}, () => 
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    return pixHeader + randomId + pixFooter;
}

// Função para copiar o código PIX
function copyPixCode() {
    const pixCode = document.getElementById('pixCode');
    pixCode.select();
    document.execCommand('copy');
    
    // Feedback visual
    const button = document.querySelector('.pix-code button');
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        button.innerHTML = originalIcon;
    }, 2000);
}

// Atualiza o QR Code quando a seção PIX é mostrada
document.getElementById('pix').addEventListener('change', function() {
    if (this.checked) {
        console.log('PIX selecionado, gerando QR Code...');
        generatePixQRCode();
    }
});

// Inicializa o QR Code se PIX estiver selecionado por padrão
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, verificando se PIX está selecionado...');
    if (document.getElementById('pix').checked) {
        console.log('PIX está selecionado por padrão, gerando QR Code...');
        generatePixQRCode();
    }
});