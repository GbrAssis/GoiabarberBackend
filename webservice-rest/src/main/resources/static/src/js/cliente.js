import { ApiService, MOCK_DATA } from '../mocks/data.js';

class ClientManager {
    constructor() {
        this.clientsList = document.getElementById('clientsList');
        this.bookingsList = document.getElementById('bookingsList');
        this.init();
    }

    async init() {
        await this.loadClients();
        await this.loadBookings();
    }

    async loadClients() {
        try {

            const users = MOCK_DATA.usuariosMock;
            users.forEach(user => {
                const clientCard = this.createClientCard(user);
                this.clientsList.appendChild(clientCard);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    }

    async loadBookings() {
        try {
            const bookings = await ApiService.getUserBookings();
            
            bookings.forEach(booking => {
                const bookingCard = this.createBookingCard(booking);
                this.bookingsList.appendChild(bookingCard);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        }
    }

    createClientCard(user) {
        const card = document.createElement('div');
        card.className = 'client-card';
        
        card.innerHTML = `
            <div class="client-info">
                <h3>${user.nome} ${user.admin ? '<span class="admin-badge">Admin</span>' : ''}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Telefone:</strong> ${user.telefone}</p>
                <p><strong>Data de Nascimento:</strong> ${new Date(user.nascimento).toLocaleDateString()}</p>
            </div>
        `;
        
        return card;
    }

    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card';
        
        const statusClass = booking.status === 'confirmed' ? 'status-confirmed' : 'status-pending';
        const statusText = booking.status === 'confirmed' ? 'Confirmado' : 'Pendente';
        
        card.innerHTML = `
            <div>
                <strong>Cliente:</strong> ${booking.userName}<br>
                <strong>Email:</strong> ${booking.userEmail}
            </div>
            <div>
                <strong>Serviço:</strong> ${booking.serviceName}<br>
                <strong>Profissional:</strong> ${booking.barberName}
            </div>
            <div>
                <strong>Data:</strong> ${new Date(booking.date).toLocaleDateString()}<br>
                <strong>Horário:</strong> ${booking.time}
            </div>
            <div>
                <strong>Status:</strong> <span class="booking-status ${statusClass}">${statusText}</span><br>
                <strong>Valor:</strong> R$ ${booking.price.toFixed(2)}
            </div>
        `;
        
        return card;
    }
}

// Initialize the client manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ClientManager();
}); 