class CadastroManager {
    constructor() {
        this.currentStep = 1;
        this.selectedType = null;
        this.formData = {};
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.steps = document.querySelectorAll('.step');
        this.stepContents = document.querySelectorAll('.step-content');
        this.nextButton = document.getElementById('nextButton');
        this.prevButton = document.getElementById('prevButton');
        this.typeButtons = document.querySelectorAll('.type-button');
        this.serviceForm = document.getElementById('serviceForm');
        this.barberForm = document.getElementById('barberForm');
    }

    setupEventListeners() {
        this.nextButton.addEventListener('click', () => this.nextStep());
        this.prevButton.addEventListener('click', () => this.previousStep());
        
        this.typeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectedType = e.target.dataset.type;
                this.nextStep();
            });
        });
    }

    nextStep() {
        if (this.currentStep === 1 && !this.selectedType) {
            alert('Por favor, selecione um tipo de cadastro');
            return;
        }

        if (this.currentStep === 2 && !this.validateForm()) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        if (this.currentStep === 2) {
            this.collectFormData();
            this.showConfirmation();
        }

        if (this.currentStep < 3) {
            this.currentStep++;
            this.updateUI();
        } else {
            this.submitForm();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    updateUI() {
        // Update steps
        this.steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === this.currentStep) {
                step.classList.add('active');
            }
        });

        // Update content visibility
        this.stepContents.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`step${this.currentStep}`).classList.remove('hidden');

        // Show/hide forms in step 2
        if (this.currentStep === 2) {
            this.serviceForm.classList.add('hidden');
            this.barberForm.classList.add('hidden');
            if (this.selectedType === 'service') {
                this.serviceForm.classList.remove('hidden');
            } else {
                this.barberForm.classList.remove('hidden');
            }
        }

        // Update buttons
        this.prevButton.classList.toggle('hidden', this.currentStep === 1);
        this.nextButton.textContent = this.currentStep === 3 ? 'Confirmar' : 'Próximo';
    }

    validateForm() {
        const form = this.selectedType === 'service' ? this.serviceForm : this.barberForm;
        return form.checkValidity();
    }

    collectFormData() {
        if (this.selectedType === 'service') {
            this.formData = {
                name: document.getElementById('serviceName').value,
                description: document.getElementById('serviceDescription').value,
                duration: document.getElementById('serviceDuration').value,
                price: parseFloat(document.getElementById('servicePrice').value),
                image: document.getElementById('serviceImage').value
            };
        } else {
            const availableDays = Array.from(document.querySelectorAll('.checkbox-group input:checked'))
                .map(cb => parseInt(cb.value));
            
            this.formData = {
                name: document.getElementById('barberName').value,
                specialty: document.getElementById('barberSpecialty').value,
                image: document.getElementById('barberImage').value,
                availableDays: availableDays,
                rating: 5.0 // Valor inicial padrão
            };
        }
    }

    showConfirmation() {
        const details = document.getElementById('confirmationDetails');
        const content = Object.entries(this.formData)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
        details.innerHTML = content;
    }

    async submitForm() {
        try {
            const response = await this.saveToDataJs();
            alert('Cadastro realizado com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('Erro ao realizar cadastro: ' + error.message);
        }
    }

    async saveToDataJs() {
        if (this.selectedType === 'barber') {
            // Monta o payload conforme esperado pelo backend
            const payload = {
                nome: this.formData.name,
                email: this.formData.email || '', // ajuste conforme seu formulário
                senha: this.formData.senha || '', // ajuste conforme seu formulário
                tipo: 'barber',
                // Adicione outros campos se o backend aceitar
            };
            const response = await fetch('/login/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            return response.json();
        } else {
            // Serviço: mantenha o mock ou implemente integração se houver endpoint
            return new Promise((resolve) => setTimeout(() => resolve(true), 500));
        }
    }

    // Método adicional para limpar dados (útil para testes)
    static resetData() {
        localStorage.removeItem('services');
        localStorage.removeItem('barbers');
        window.location.reload();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CadastroManager();
});

// Função global para cadastro de usuário simples (criarConta.html)
async function cadastrarUsuario() {
    // Coleta os dados dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Limpa mensagens de erro
    document.getElementById('nome-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('telefone-error').textContent = '';
    document.getElementById('senha-error').textContent = '';
    document.getElementById('confirmar-senha-error').textContent = '';

    // Validação simples
    let hasError = false;
    if (!nome) {
        document.getElementById('nome-error').textContent = 'Nome obrigatório';
        hasError = true;
    }
    if (!email) {
        document.getElementById('email-error').textContent = 'E-mail obrigatório';
        hasError = true;
    }
    if (!telefone) {
        document.getElementById('telefone-error').textContent = 'Telefone obrigatório';
        hasError = true;
    }
    if (!senha) {
        document.getElementById('senha-error').textContent = 'Senha obrigatória';
        hasError = true;
    }
    if (senha !== confirmarSenha) {
        document.getElementById('confirmar-senha-error').textContent = 'As senhas não coincidem';
        hasError = true;
    }
    if (hasError) return;

    // Monta o payload conforme esperado pelo backend
    const payload = {
        nome,
        email,
        telefone,
        senha,
        tipo: 'cliente' // ou 'user', ajuste conforme o backend espera
    };

    try {
        const response = await fetch('/login/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text();
            alert('Erro ao criar conta: ' + errorText);
            return;
        }
        alert('Conta criada com sucesso!');
        window.location.href = './index.html';
    } catch (error) {
        alert('Erro ao criar conta: ' + error.message);
    }
} 