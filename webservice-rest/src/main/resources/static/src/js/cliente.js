class ClientManager {
    constructor() {
        this.clientsList = document.getElementById('clientsList');
        this.bookingsList = document.getElementById('bookingsList');
        this.init();
        
        // Atualiza as listas a cada 30 segundos
        setInterval(() => {
            this.loadClients();
            this.loadBookings();
        }, 30000);
    }

    async init() {
        await this.loadClients();
        await this.loadBookings();
    }

    async loadClients() {
        try {
            console.log('Iniciando carregamento de clientes...');
            const response = await fetch('/login/users');
            console.log('Resposta do servidor:', response);
            
            if (!response.ok) {
                throw new Error('Erro ao carregar clientes');
            }
            const users = await response.json();
            console.log('Usuários carregados:', users);
            
            this.clientsList.innerHTML = ''; // Limpa a lista antes de adicionar
            if (users.length === 0) {
                this.clientsList.innerHTML = '<p class="info-message">Nenhum cliente cadastrado.</p>';
                return;
            }
            
            users.forEach(user => {
                const clientCard = this.createClientCard(user);
                this.clientsList.appendChild(clientCard);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            this.clientsList.innerHTML = '<p class="error-message">Erro ao carregar a lista de clientes.</p>';
        }
    }

    async loadBookings() {
        try {
            console.log('Iniciando carregamento de agendamentos...');
            const response = await fetch('/agendamentos');
            console.log('Resposta do servidor (agendamentos):', response);
            
            if (!response.ok) {
                throw new Error('Erro ao carregar agendamentos');
            }
            const bookings = await response.json();
            console.log('Agendamentos carregados:', bookings);
            
            this.bookingsList.innerHTML = ''; // Limpa a lista antes de adicionar
            if (bookings.length === 0) {
                this.bookingsList.innerHTML = '<p class="info-message">Nenhum agendamento realizado.</p>';
                return;
            }
            
            bookings.forEach(booking => {
                const bookingCard = this.createBookingCard(booking);
                this.bookingsList.appendChild(bookingCard);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            this.bookingsList.innerHTML = '<p class="error-message">Erro ao carregar a lista de agendamentos.</p>';
        }
    }

    createClientCard(user) {
        const card = document.createElement('div');
        card.className = 'client-card';
        
        const nascimento = user.nascimento ? new Date(user.nascimento).toLocaleDateString() : 'Não informado';
        
        card.innerHTML = `
            <div class="client-info">
                <h3>${user.nome || user.name} ${user.admin ? '<span class="admin-badge">Admin</span>' : ''}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Telefone:</strong> ${user.telefone || 'Não informado'}</p>
                <p><strong>Data de Nascimento:</strong> ${nascimento}</p>
            </div>
        `;
        
        return card;
    }

    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card';
        
        // Safe property access with fallbacks
        const status = booking?.status || 'pendente';
        const statusClass = status === 'confirmado' ? 'status-confirmed' : 'status-pending';
        const statusText = status === 'confirmado' ? 'Confirmado' : 'Pendente';
        
        const dataHora = booking?.dataHora ? new Date(booking.dataHora) : null;
        const data = dataHora ? dataHora.toLocaleDateString('pt-BR') : 'Não informado';
        const hora = dataHora ? dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Não informado';
        
        const userName = booking?.user?.nome || booking?.user?.name || 'Não informado';
        const userEmail = booking?.user?.email || 'Não informado';
        const serviceName = booking?.servico?.name || 'Não informado';
        const servicePrice = booking?.servico?.price ? `R$ ${booking.servico.price.toFixed(2)}` : 'R$ 0,00';
        
        card.innerHTML = `
            <div>
                <strong>Cliente:</strong> ${userName}<br>
                <strong>Email:</strong> ${userEmail}
            </div>
            <div>
                <strong>Serviço:</strong> ${serviceName}<br>
                <strong>Valor:</strong> ${servicePrice}
            </div>
            <div>
                <strong>Data:</strong> ${data}<br>
                <strong>Horário:</strong> ${hora}
            </div>
            <div>
                <strong>Status:</strong> <span class="booking-status ${statusClass}">${statusText}</span>
            </div>
        `;
        
        return card;
    }
}

// Initialize the client manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada, iniciando ClientManager...');
    new ClientManager();
}); 