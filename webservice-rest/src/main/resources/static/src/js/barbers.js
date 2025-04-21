const barbersData = [
    {
        id: 1,
        name: "João Silva",
        specialty: "Especialista em Degradê",
        photo: "https://media.licdn.com/dms/image/v2/D4D03AQGkIWAVGInxCQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725383719695?e=1747267200&v=beta&t=P108q2O-Eon6RXY4FlI2PUrV3ry_9Li79m8iUIDGkXc",
        schedule: [
            "Segunda a Sexta: 9h às 18h",
            "Sábado: 9h às 14h"
        ],
        services: [
            "Corte Degradê - R$ 45",
            "Barba - R$ 35",
            "Combo (Corte + Barba) - R$ 70"
        ]
    },

];

class BarbersCarousel {
    constructor() {
        this.track = document.querySelector('.barbers-track');
        this.cards = Array.from(document.querySelectorAll('.barber-card'));
        this.nextButton = document.querySelector('.barbers-button.next');
        this.prevButton = document.querySelector('.barbers-button.prev');
        this.modal = document.getElementById('barberModal');
        this.closeModal = document.querySelector('.close-modal');
        
        this.currentPosition = 0;
        this.cardWidth = this.cards[0].offsetWidth + 32; 
        
        this.initializeCarousel();
    }

    initializeCarousel() {
        this.addEventListeners();
        this.updateButtonsVisibility();
    }

    moveCarousel(direction) {
        const maxPosition = -(this.cardWidth * (this.cards.length - 3));
        
        if (direction === 'next' && this.currentPosition > maxPosition) {
            this.currentPosition -= this.cardWidth;
        } else if (direction === 'prev' && this.currentPosition < 0) {
            this.currentPosition += this.cardWidth;
        }
        
        this.track.style.transform = `translateX(${this.currentPosition}px)`;
        this.updateButtonsVisibility();
    }

    updateButtonsVisibility() {
        const maxPosition = -(this.cardWidth * (this.cards.length - 3));
        this.prevButton.style.opacity = this.currentPosition < 0 ? '1' : '0.5';
        this.nextButton.style.opacity = this.currentPosition > maxPosition ? '1' : '0.5';
    }

    showBarberDetails(barberId) {
        const barber = barbersData.find(b => b.id === parseInt(barberId));
        if (!barber) return;

        const modalImg = this.modal.querySelector('.barber-photo');
        const modalName = this.modal.querySelector('.barber-name');
        const modalSpecialty = this.modal.querySelector('.barber-specialty');
        const scheduleList = this.modal.querySelector('.schedule-list');
        const servicesList = this.modal.querySelector('.services-list');

        modalImg.src = barber.photo;
        modalImg.alt = barber.name;
        modalName.textContent = barber.name;
        modalSpecialty.textContent = barber.specialty;

        scheduleList.innerHTML = barber.schedule
            .map(schedule => `<li>${schedule}</li>`)
            .join('');

        servicesList.innerHTML = barber.services
            .map(service => `<li>${service}</li>`)
            .join('');

        this.modal.style.display = 'block';
    }

    addEventListeners() {
        this.nextButton.addEventListener('click', () => this.moveCarousel('next'));
        this.prevButton.addEventListener('click', () => this.moveCarousel('prev'));
        
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const barberId = card.dataset.barberId;
                this.showBarberDetails(barberId);
            });
        });

        this.closeModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bannerCarousel = new Carousel(document.querySelector('.banner-carousel'));
    const barbersCarousel = new BarbersCarousel();
}); 