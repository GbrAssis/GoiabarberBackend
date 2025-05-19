class BarbersCarousel {
    constructor() {
        this.container = document.querySelector('.barbers-carousel');
        this.track = document.querySelector('.barbers-track');
        this.nextButton = document.querySelector('.barbers-carousel .carousel-button.next');
        this.prevButton = document.querySelector('.barbers-carousel .carousel-button.prev');
        this.dotsContainer = document.querySelector('.barbers-section .carousel-dots');
        
        this.currentIndex = 0;
        this.barbers = [];
        this.itemsPerView = this.calculateItemsPerView();
        
        this.init();
    }

    async init() {
        await this.loadBarbers();
        this.setupEventListeners();
        this.updateCarousel();
        this.createDots();
        this.updateDots();
        this.checkButtonsState();
    }

    calculateItemsPerView() {
        const containerWidth = this.container.offsetWidth;
        return Math.floor((containerWidth - 80) / 304); // 280px card + 24px gap
    }

    async loadBarbers() {
        try {
            const response = await fetch('/barbeiros');
            if (!response.ok) {
                throw new Error(`Erro ao carregar barbeiros: ${response.status}`);
            }
            const data = await response.json();
            console.log('Dados carregados do backend:', data);
            this.barbers = data;
            this.renderBarbers();
        } catch (error) {
            console.error('Erro ao carregar barbeiros:', error);
            this.showError('Não foi possível carregar os barbeiros. Por favor, tente novamente mais tarde.');
        }
    }

    renderBarbers() {
        if (!this.track) {
            console.error('Track element not found');
            return;
        }

        if (!this.barbers || this.barbers.length === 0) {
            this.track.innerHTML = '<div class="error-message">Nenhum barbeiro encontrado</div>';
            return;
        }

        this.track.innerHTML = this.barbers.map(barber => `
            <div class="barber-card" data-barber-id="${barber.id}">
                <img src="${barber.image}" alt="${barber.name}" 
                     onerror="this.src='https://via.placeholder.com/200x200.png?text=Barbeiro'">
                <h3>${barber.name}</h3>
                <p>${barber.specialty}</p>
                <div class="barber-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(barber.rating))}</span>
                    <span class="rating-value">${barber.rating.toFixed(1)}</span>
                </div>
                ${barber.availableDays ? `
                <div class="barber-availability">
                    <span class="days-label">Disponível:</span>
                    <div class="days-list">
                        ${this.formatAvailableDays(barber.availableDays)}
                    </div>
                </div>
                ` : ''}
            </div>
        `).join('');

        // Adiciona evento de clique para cada card
        this.track.querySelectorAll('.barber-card').forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = `agendamento.html?barberId=${card.dataset.barberId}`;
            });
        });
    }

    formatAvailableDays(days) {
        if (!days) return '';
        const dayAbbreviations = {
            'Monday': 'Seg',
            'Tuesday': 'Ter',
            'Wednesday': 'Qua',
            'Thursday': 'Qui',
            'Friday': 'Sex',
            'Saturday': 'Sáb',
            'Sunday': 'Dom'
        };
        return days.map(day => `<span class="day-badge">${dayAbbreviations[day]}</span>`).join('');
    }

    createDots() {
        if (!this.dotsContainer || !this.barbers.length) return;

        const totalDots = Math.ceil(this.barbers.length / this.itemsPerView);
        this.dotsContainer.innerHTML = Array.from({ length: totalDots }, (_, i) => `
            <div class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>
        `).join('');

        this.dotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.carousel-dot');
            if (dot) {
                this.currentIndex = parseInt(dot.dataset.index) * this.itemsPerView;
                this.updateCarousel();
                this.updateDots();
                this.checkButtonsState();
            }
        });
    }

    updateDots() {
        if (!this.dotsContainer) return;
        
        const activeDotIndex = Math.floor(this.currentIndex / this.itemsPerView);
        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    setupEventListeners() {
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.moveCarousel('next'));
        }
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.moveCarousel('prev'));
        }

        window.addEventListener('resize', () => {
            this.itemsPerView = this.calculateItemsPerView();
            this.updateCarousel();
            this.createDots();
            this.checkButtonsState();
        });
    }

    moveCarousel(direction) {
        if (direction === 'next' && this.currentIndex < this.barbers.length - this.itemsPerView) {
            this.currentIndex += this.itemsPerView;
        } else if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex -= this.itemsPerView;
        }

        this.updateCarousel();
        this.updateDots();
        this.checkButtonsState();
    }

    updateCarousel() {
        if (!this.track) return;
        const translateX = this.currentIndex * -304; // 280px card + 24px gap
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    checkButtonsState() {
        if (this.prevButton) {
            this.prevButton.disabled = this.currentIndex === 0;
        }
        if (this.nextButton) {
            this.nextButton.disabled = this.currentIndex >= this.barbers.length - this.itemsPerView;
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.container.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BarbersCarousel();
}); 