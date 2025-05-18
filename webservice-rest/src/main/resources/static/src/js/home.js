import { ApiService } from '../mocks/data.js';

class BarbersList {
    async init() {
        await this.loadBarbers();
    }

    async loadBarbers() {
        try {
           const barbers = await fetch('/barbeiros').then(r => r.json());
           console.log(barbers);
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

        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '⯨';
        }
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
}

document.addEventListener('DOMContentLoaded', () => {
    new BarbersList().init();
}); 