import { ApiService } from '../mocks/data.js';

class BarbersCarousel {
    constructor() {
        this.currentPosition = 0;
        this.isAnimating = false;
        this.cardWidth = 0;
        this.visibleCards = 0;
        this.totalCards = 0;
        this.init();
    }

    async init() {
        await this.loadBarbers();
        this.setupControls();
        this.calculateDimensions();
        window.addEventListener('resize', () => this.calculateDimensions());
        this.updateButtonsVisibility();
    }

    calculateDimensions() {
        const track = document.querySelector('.barbers-track');
        const cards = track.querySelectorAll('.barber-card');
        const containerWidth = track.parentElement.offsetWidth;
        
        this.cardWidth = cards[0].offsetWidth + 20; 
        this.visibleCards = Math.floor(containerWidth / this.cardWidth);
        this.totalCards = cards.length;
        
        // Ajusta a posição atual se necessário
        const maxPosition = -(this.totalCards - this.visibleCards);
        if (this.currentPosition < maxPosition) {
            this.currentPosition = maxPosition;
            this.updateTrackPosition();
        }
    }

    async loadBarbers() {
        try {
            const barbers = await ApiService.getBarbers();
            this.renderBarbers(barbers);
        } catch (error) {
            console.error('Erro ao carregar barbeiros:', error);
        }
    }

    renderBarbers(barbers) {
        const track = document.querySelector('.barbers-track');
        if (!track) return;

        track.innerHTML = '';
        barbers.forEach(barber => {
            const card = this.createBarberCard(barber);
            track.appendChild(card);
        });
    }

    createBarberCard(barber) {
        const card = document.createElement('div');
        card.className = 'barber-card';
        card.setAttribute('data-barber-id', barber.id);

        card.innerHTML = `
            <img src="${barber.image}" alt="${barber.name}" onerror="this.src='src/assets/images/default-barber.jpg'">
            <h3>${barber.name}</h3>
            <p>${barber.specialty}</p>
            <div class="barber-rating">
                <span class="stars">${this.getStarRating(barber.rating)}</span>
                <span class="rating-value">${barber.rating.toFixed(1)}</span>
            </div>
            <div class="barber-availability">
                <p>Disponível:</p>
                <div class="days">
                    ${this.renderAvailableDays(barber.availableDays)}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `agendamento.html?barberId=${barber.id}`;
        });

        return card;
    }

    getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        // Estrelas cheias
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }

        // Meia estrela
        if (hasHalfStar) {
            stars += '⯨';
        }

        // Estrelas vazias
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }

        return stars;
    }

    renderAvailableDays(days) {
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return days.map(dayNumber => `
            <span class="day-badge">${dayNames[dayNumber]}</span>
        `).join('');
    }

    setupControls() {
        const prevButton = document.querySelector('.barbers-button.prev');
        const nextButton = document.querySelector('.barbers-button.next');
        const track = document.querySelector('.barbers-track');

        if (!prevButton || !nextButton || !track) return;

        prevButton.addEventListener('click', () => this.slide('prev'));
        nextButton.addEventListener('click', () => this.slide('next'));

        // Touch controls
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        let startPosition = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            startPosition = this.currentPosition;
            isDragging = true;
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diff = (currentX - touchStartX) / this.cardWidth;
            const newPosition = startPosition + diff;
            
            // Limita o arrasto dentro dos limites
            if (newPosition <= 0 && newPosition >= -(this.totalCards - this.visibleCards)) {
                this.currentPosition = newPosition;
                this.updateTrackPosition();
            }
        });

        track.addEventListener('touchend', () => {
            isDragging = false;
            // Ajusta para a posição mais próxima
            this.currentPosition = Math.round(this.currentPosition);
            this.updateTrackPosition();
            this.updateButtonsVisibility();
        });
    }

    slide(direction) {
        if (this.isAnimating) return;
        
        const maxPosition = -(this.totalCards - this.visibleCards);

        if (direction === 'next' && this.currentPosition > maxPosition) {
            this.currentPosition--;
        } else if (direction === 'prev' && this.currentPosition < 0) {
            this.currentPosition++;
        }

        this.updateTrackPosition();
        this.updateButtonsVisibility();
    }

    updateTrackPosition() {
        const track = document.querySelector('.barbers-track');
        this.isAnimating = true;
        
        track.style.transition = 'transform 0.5s ease-out';
        track.style.transform = `translateX(100px)`;

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateButtonsVisibility() {
        const prevButton = document.querySelector('.barbers-button.prev');
        const nextButton = document.querySelector('.barbers-button.next');
        const maxPosition = -(this.totalCards - this.visibleCards);

        prevButton.style.opacity = this.currentPosition < 0 ? '1' : '0.5';
        prevButton.style.pointerEvents = this.currentPosition < 0 ? 'auto' : 'none';

        nextButton.style.opacity = this.currentPosition > maxPosition ? '1' : '0.5';
        nextButton.style.pointerEvents = this.currentPosition > maxPosition ? 'auto' : 'none';
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new BarbersCarousel();
}); 