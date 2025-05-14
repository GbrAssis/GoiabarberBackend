import { Calendar } from './calendar.js';

class BookingManager {
    constructor() {
        this.currentStep = 1;
        this.selectedService = null;
        this.selectedBarber = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.loading = false;
        this.barbers = [];

        this.initializeElements();
        this.addEventListeners();
        this.loadInitialData();

        this.calendar = new Calendar('booking-calendar', {
            onDateSelect: (date) => {
                this.handleDateSelect(date);
            }
        });
    }

    initializeElements() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.steps = document.querySelectorAll('.step');
        this.sections = document.querySelectorAll('.booking-section');
        this.prevBtn = document.querySelector('.btn-prev');
        this.nextBtn = document.querySelector('.btn-next');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.barberCards = document.querySelectorAll('.barber-card');
    }

    addEventListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });

        this.prevBtn.addEventListener('click', () => {
            this.navigateStep('prev');
        });

        this.nextBtn.addEventListener('click', () => {
            if (this.currentStep === 4) {
                this.createBooking();
            } else {
                this.navigateStep('next');
            }
        });

        this.serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectService(card);
            });
        });

        this.barberCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectBarber(card);
            });
        });
    }

    switchTab(tab) {
        const tabId = tab.dataset.tab;
        
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        this.tabContents.forEach(content => {
            content.classList.remove('active');
            content.classList.add('none');
        });

        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
            selectedContent.classList.add('active');
            selectedContent.classList.remove('none');
        }
    }

    navigateStep(direction) {
        const oldStep = this.currentStep;
        
        if (direction === 'next' && this.currentStep < 4) {
            if (this.validateCurrentStep()) {
                this.currentStep++;
            } else {
                this.showWarning('Por favor, selecione antes de continuar.');
                return;
            }
        } else if (direction === 'prev' && this.currentStep > 1) {
            this.currentStep--;
        }

        this.updateStepsDisplay();
    }

    validateCurrentStep() {
        switch(this.currentStep) {
            case 1:
                return this.selectedService !== null;
            case 2:
                return this.selectedBarber !== null;
            case 3:
                return this.selectedDate !== null && this.selectedTime !== null;
            default:
                return true;
        }
    }

    updateStepsDisplay() {
        this.steps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'complete');
            
            if (stepNum === this.currentStep) {
                step.classList.add('active');
            } else if (stepNum < this.currentStep) {
                step.classList.add('complete');
            }
        });

        this.sections.forEach((section, index) => {
            section.classList.remove('active');
            section.classList.add('none');
            if (index + 1 === this.currentStep) {
                section.classList.add('active');
                section.classList.remove('none');
            }
        });

        this.prevBtn.disabled = this.currentStep === 1;
        this.nextBtn.textContent = this.currentStep === 4 ? 'Confirmar' : 'Próximo';
    }

    selectService(card) {
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selectedService = null;
        } else {
            const currentlySelected = document.querySelector('.service-card.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }
            card.classList.add('selected');
            
            this.selectedService = {
                id: card.dataset.serviceId,
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.dataset.price)
            };
        }
        this.updateSummary();
    }

    selectBarber(card) {
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selectedBarber = null;
        } else {
            const currentlySelected = document.querySelector('.barber-card.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }
            card.classList.add('selected');
            
            this.selectedBarber = {
                id: card.dataset.barberId,
                name: card.querySelector('h3').textContent
            };
        }
        this.updateSummary();
    }

    selectTimeSlot(slot) {
 
        document.querySelectorAll('.time-slot').forEach(s => 
            s.classList.remove('selected'));
        
        slot.classList.add('selected');
        
        this.selectedTime = slot.dataset.time;
        
        this.updateSummary();
    }

    updateSummary() {
     
        const summary = {
            servico: this.selectedService?.name,
            barbeiro: this.selectedBarber?.name,
            data: this.selectedDate?.toLocaleDateString(),
            horario: this.selectedTime,
            preco: this.selectedService?.price
        };

        if (this.selectedService) {
            document.getElementById('summary-service').textContent = this.selectedService.name;
            document.getElementById('summary-price').textContent = 
                `R$ ${this.selectedService.price.toFixed(2)}`;
        }
        
        if (this.selectedBarber) {
            document.getElementById('summary-barber').textContent = this.selectedBarber.name;
        }
        
        if (this.selectedDate) {
            document.getElementById('summary-date').textContent = 
                this.selectedDate.toLocaleDateString();
        }
        
        if (this.selectedTime) {
            document.getElementById('summary-time').textContent = this.selectedTime;
        }
    }

    async loadInitialData() {
        try {
            this.setLoading(true);
            
            const services = await fetch('/servicos').then(r => r.json());
            this.renderServices(services);
            const barbers = await fetch('/barbeiros').then(r => r.json());
            this.barbers = barbers;
            this.renderBarbers(barbers);
            const userBookings = await fetch('/agendamentos').then(r => r.json());
            this.setLoading(true);
            await this.renderUserBookings(userBookings);
            this.setLoading(false);

        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
            this.showError('Erro ao carregar dados iniciais');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.loading = isLoading;
        document.querySelectorAll('.loading-container').forEach(container => {
            container.classList.toggle('loading', isLoading);
        });
    }

    renderServices(services) {
        const container = document.querySelector('.services-grid');
        container.innerHTML = services.map(service => `
            <div class="service-card" data-service-id="${service.id}" data-price="${service.price}">
                <img src="${service.image}" alt="${service.name}">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-details">
                    <span class="duration"><i class="fas fa-clock"></i> ${service.duration}min</span>
                    <span class="price">R$ ${service.price.toFixed(2)}</span>
                </div>
            </div>
        `).join('');

        const serviceCards = container.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                if (typeof this.selectService === 'function') {
                    this.selectService(card);
                } else {
                    console.error('selectService não é uma função');
                }
            });
        });
    }

    renderBarbers(barbers) {
        const container = document.querySelector('.barbers-grid');
        container.innerHTML = barbers.map(barber => `
            <div class="barber-card" data-barber-id="${barber.id}">
                <img src="${barber.image}" alt="${barber.name}">
                <h3>${barber.name}</h3>
                <p>${barber.specialty}</p>
                <div class="barber-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(barber.rating))}</span>
                    <span class="rating-value">${barber.rating}</span>
                </div>
            </div>
        `).join('');

        const barberCards = container.querySelectorAll('.barber-card');
        barberCards.forEach(card => {
            card.addEventListener('click', () => {
                if (typeof this.selectBarber === 'function') {
                    this.selectBarber(card);
                } else {
                    console.error('selectBarber não é uma função');
                }
            });
        });
    }

    async loadTimeSlots() {
        if (!this.selectedBarber || !this.selectedDate) return;
        try {
            this.setLoading(true);
            const availableSlots = this.getBarberAvailability(this.selectedBarber.id, this.selectedDate);
            this.renderTimeSlots(availableSlots);
        } catch (error) {
            console.error('Erro ao carregar horários disponíveis:', error);
            this.showError('Erro ao carregar horários disponíveis');
        } finally {
            this.setLoading(false);
        }
    }

    renderTimeSlots(slots) {
        const container = document.querySelector('.slots-grid');
        container.innerHTML = slots.map(time => `
            <div class="time-slot" data-time="${time}">
                ${time}
            </div>
        `).join('');

        container.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                this.selectTimeSlot(slot);
            });
        });
    }

    renderUserBookings(bookings) {
        const container = document.querySelector('.bookings-list');
        container.innerHTML = bookings.map(booking => `
            <div class="booking-item ${booking.status}">
                <div class="booking-info">
                    <h3>${booking.serviceName}</h3>
                    <p>com ${booking.barberName}</p>
                    <p>${new Date(booking.date).toLocaleDateString()} às ${booking.time}</p>
                </div>
                <div class="booking-status">
                    <span class="status-badge">${this.getStatusLabel(booking.status)}</span>
                </div>
            </div>
        `).join('');
    }

    getStatusLabel(status) {
        const labels = {
            confirmed: 'Confirmado',
            pending: 'Pendente',
            cancelled: 'Cancelado'
        };
        return labels[status] || status;
    }

    createBookingData(bookingData) {
        const newBooking = {
            id: Math.floor(Math.random() * 1000),
            ...bookingData,
            status: "pending"
        };
        return newBooking;
    }

    async createBooking() {
        
        if (!this.validateBookingData()) {
            return;
        }

        try {
            this.setLoading(true);

            const newBooking = this.createBookingData({
                serviceId: this.selectedService.id,
                barberId: this.selectedBarber.id,
                date: this.selectedDate,
                time: this.selectedTime,
                price: this.selectedService.price
            });

            this.showSuccess('Agendamento realizado com sucesso!');
            this.redirectToCheckout(newBooking.id);
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            this.showError('Erro ao criar agendamento');
        } finally {
            this.setLoading(false);
        }
    }

    validateBookingData() {
        const isValid = !!(this.selectedService && 
                          this.selectedBarber && 
                          this.selectedDate && 
                          this.selectedTime);

        return isValid;
    }

    showError(message) {
        console.error('[BookingManager] Erro:', message);
        this.showNotification('error', message);
    }

    showSuccess(message) {
        this.showNotification('success', message);
    }

    showNotification(type, message) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'error' 
            ? 'fas fa-exclamation-circle'
            : 'fas fa-check-circle';
        
        const messageElement = document.createElement('span');
        messageElement.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => notification.remove();

        notification.appendChild(icon);
        notification.appendChild(messageElement);
        notification.appendChild(closeButton);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        if (type === 'error') {
            console.error(message);
        } else {
            console.log(message);
        }
    }

    redirectToCheckout(bookingId) {
        const purchaseData = {
            service: this.selectedService.name,
            barber: this.selectedBarber.name,
            date: this.selectedDate.toISOString().split('T')[0],
            time: this.selectedTime,
            price: this.selectedService.price
        };

        const encodedData = btoa(JSON.stringify(purchaseData));

        window.location.href = `checkout.html?data=${encodedData}`;
    }

    handleDateSelect(date) {
        this.selectedDate = date;
        this.loadTimeSlots();
    }

    showWarning(message) {
        console.warn('[BookingManager] Aviso:', message);
        const notification = document.createElement('div');
        notification.className = 'notification warning';
        notification.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.onclick = () => notification.remove();
        notification.appendChild(closeButton);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    getBarberAvailability(barberId, date) {
    
        const barber = this.barbers.find(b => b.id == barberId);

        if (!barber) return [];
        const dayOfWeek = new Date(date).getDay();

        return [
            "09:00", "10:00", "11:00",
            "14:00", "15:00", "16:00", "17:00", "18:00"
        ];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingManager = new BookingManager();
}); 