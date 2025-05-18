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
        this.steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === this.currentStep) {
                step.classList.add('active');
            }
        });

        this.stepContents.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`step${this.currentStep}`).classList.remove('hidden');

        if (this.currentStep === 2) {
            this.serviceForm.classList.add('hidden');
            this.barberForm.classList.add('hidden');
            if (this.selectedType === 'service') {
                this.serviceForm.classList.remove('hidden');
            } else {
                this.barberForm.classList.remove('hidden');
            }
        }
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
                rating: 5.0
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
            const payload = {
                name: this.formData.name,
                specialty: this.formData.specialty,
                image: this.formData.image,
                availableDays: this.formData.availableDays,
                rating: this.formData.rating
            };
            const response = await fetch('/barbeiros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            return response.json();
        } else if (this.selectedType === 'service') {
            const payload = {
                name: this.formData.name,
                description: this.formData.description,
                duration: this.formData.duration,
                price: this.formData.price,
                image: this.formData.image
            };
            const response = await fetch('/servicos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            return response.json();
        }
    }

    static resetData() {
        localStorage.removeItem('services');
        localStorage.removeItem('barbers');
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CadastroManager();
});
