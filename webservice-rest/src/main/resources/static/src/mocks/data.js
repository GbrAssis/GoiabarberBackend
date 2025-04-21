const initializeLocalStorage = () => {

    const storedServices = localStorage.getItem('services');
    const storedBarbers = localStorage.getItem('barbers');

    // Dados iniciais padrão
    const initialData = {
        services: [
            {
                id: 1,
                name: "Corte de Cabelo",
                description: "Corte moderno ou tradicional realizado por profissionais experientes",
                duration: "45min",
                price: 45.00,
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg"
            },
            {
                id: 2,
                name: "Barba",
                description: "Modelagem e aparagem de barba com toalha quente e produtos premium",
                duration: "30min",
                price: 35.00,
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg"
            },
            {
                id: 3,
                name: "Corte + Barba",
                description: "Combinação de corte de cabelo e serviço completo de barba",
                duration: "1h15min",
                price: 75.00,
                image: "../assets/images/corte-barba.jpg",
                category: "regular"
            },
            {
                id: 4,
                name: "Hidratação",
                description: "Tratamento profundo para cabelos com produtos especializados",
                duration: "45min",
                price: 50.00,
                image: "../assets/images/hidratacao.jpg",
                category: "regular"
            },
            {
                id: 5,
                name: "Coloração",
                description: "Pintura de cabelo com produtos de alta qualidade",
                duration: "1h30min",
                price: 90.00,
                image: "../assets/images/coloracao.jpg",
                category: "regular"
            },
            {
                id: 6,
                name: "Sobrancelha",
                description: "Design e ajuste de sobrancelha masculina",
                duration: "20min",
                price: 25.00,
                image: "../assets/images/sobrancelha.jpg",
                category: "regular"
            },
            {
                id: 7,
                name: "Massagem Facial",
                description: "Massagem relaxante com produtos específicos para a pele",
                duration: "30min",
                price: 40.00,
                image: "../assets/images/massagem-facial.jpg",
                category: "regular"
            },
            {
                id: 8,
                name: "Pacote Pai e Filho",
                description: "Experiência especial para pai e filho, inclui cortes e hidratação",
                duration: "2h",
                price: 110.00,
                originalPrice: 140.00,
                discount: "21% OFF",
                image: "../assets/images/pai-filho.jpg",
                category: "special",
                features: [
                    "Corte de cabelo para pai e filho",
                    "Hidratação capilar premium",
                    "Ambiente exclusivo",
                    "Bebidas não alcoólicas inclusas",
                    "Atendimento personalizado"
                ]
            },
            {
                id: 9,
                name: "Pacote Noivo",
                description: "Preparação completa para o grande dia",
                duration: "3h",
                price: 250.00,
                image: "../assets/images/noivo.jpg",
                category: "special",
                features: [
                    "Corte de cabelo personalizado",
                    "Tratamento completo de barba",
                    "Hidratação facial premium",
                    "Massagem relaxante",
                    "Design de sobrancelha",
                    "Bebidas premium inclusas",
                    "Ambiente VIP"
                ],
                badge: "Premium"
            },
            {
                id: 10,
                name: "Pacote Executivo",
                description: "Cuidados completos para o homem moderno",
                duration: "2h30min",
                price: 180.00,
                image: "../assets/images/executivo.jpg",
                category: "special",
                features: [
                    "Corte de cabelo executivo",
                    "Barba feita com produtos importados",
                    "Hidratação facial",
                    "Massagem nos ombros",
                    "Ambiente exclusivo"
                ]
            },
            {
                id: 11,
                name: "Pacote Spa Day",
                description: "Um dia de cuidados e relaxamento",
                duration: "4h",
                price: 300.00,
                image: "../assets/images/spa-day.jpg",
                category: "special",
                features: [
                    "Corte de cabelo",
                    "Tratamento de barba premium",
                    "Hidratação corporal",
                    "Massagem relaxante completa",
                    "Tratamento facial",
                    "Pedras quentes",
                    "Buffet de bebidas e snacks"
                ],
                badge: "Premium"
            }
        ],
        barbers: [
            {
                id: 1,
                name: "João Silva",
                specialty: "Especialista em Degradê",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.8,
                availableDays: [1, 2, 3, 4, 5]
            },
            {
                id: 2,
                name: "Pedro Santos",
                specialty: "Barbeiro Master",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.9,
                availableDays: [1, 2, 3, 4, 5, 6]
            },
            {
                id: 3,
                name: "Carlos Oliveira",
                specialty: "Expert em Barba",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.7,
                availableDays: [2, 3, 4, 5, 6]
            },
            {
                id: 4,
                name: "Lucas Santos",
                specialty: "Barbeiro Master",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.9,
                availableDays: [1, 2, 3, 4, 5, 6]
            },
            {
                id: 5,
                name: "Marcos Santos",
                specialty: "Barbeiro Master",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.9,
                availableDays: [1, 2, 3, 4, 5, 6]
            },
            {
                id: 6,
                name: "Pedro silva",
                specialty: "Barbeiro Master",
                image: "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_1899,h_906,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
                rating: 4.9,
                availableDays: [1, 2, 3, 4, 5, 6]
            }
        ],
        timeSlots: {
            morning: ["09:00", "10:00", "11:00"],
            afternoon: ["14:00", "15:00", "16:00", "17:00", "18:00"]
        },
        usuariosMock: [
            {
                admin: true,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456",
                telefone: "(11) 98765-4321",
                nascimento: "1990-05-15",
                avatar: "",
                userBookings: [
                    {
                        id: 1,
                        serviceId: 1,
                        barberId: 2,
                        date: "2024-03-20",
                        time: "14:00",
                        status: "confirmed",
                        price: 75.00
                    }
                ]
            },
            {
                admin: false,
                nome: "Maria Oliveira",
                email: "maria.oliveira@email.com",
                senha: "123456",
                telefone: "(11) 91234-5678",
                nascimento: "1995-08-25",
                avatar: "",
                userBookings: []
            },
            {
                admin: false,
                nome: "Carlos Souza",
                email: "carlos.souza@email.com",
                senha: "123456",
                telefone: "(21) 99876-5432",
                nascimento: "1988-03-10",
                avatar: "",
                userBookings: [
                    {
                        id: 2,
                        serviceId: 3,
                        barberId: 1,
                        date: "2024-03-25",
                        time: "10:00",
                        status: "pending",
                        price: 70.00
                    }
                ]
            },
            {
                admin: true,
                nome: "Luciana Pereira",
                email: "luciana.pereira@email.com",
                telefone: "(31) 98765-4321",
                nascimento: "1982-12-02",
                avatar: "",
                userBookings: []
            }
        ]
    };

    // Se não existir dados no localStorage, inicializa com os dados padrão
    if (!storedServices) {
        localStorage.setItem('services', JSON.stringify(initialData.services));
    }
    if (!storedBarbers) {
        localStorage.setItem('barbers', JSON.stringify(initialData.barbers));
    }

    // Retorna os dados do localStorage ou os dados iniciais
    return {
        services: JSON.parse(localStorage.getItem('services')) || initialData.services,
        barbers: JSON.parse(localStorage.getItem('barbers')) || initialData.barbers,
        timeSlots: initialData.timeSlots,
        usuariosMock: initialData.usuariosMock
    };
};

// Inicializa o MOCK_DATA com dados do localStorage
const MOCK_DATA = initializeLocalStorage();

// Simulação de chamadas à API
class ApiService {
    static async getServices() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_DATA.services;
    }

    static async getBarbers() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_DATA.barbers;
    }

    static async getBarberAvailability(barberId, date) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const barber = MOCK_DATA.barbers.find(b => b.id == barberId);
        const dayOfWeek = new Date(date).getDay();
        
        if (!barber.availableDays.includes(dayOfWeek)) {
            return [];
        }
        return [...MOCK_DATA.timeSlots.morning, ...MOCK_DATA.timeSlots.afternoon];
    }

    static async getUserBookings() {
        await new Promise(resolve => setTimeout(resolve, 400));
        const allBookings = MOCK_DATA.usuariosMock.reduce((bookings, user) => {
            return [...bookings, ...user.userBookings.map(booking => {
                const service = MOCK_DATA.services.find(s => s.id === booking.serviceId);
                const barber = MOCK_DATA.barbers.find(b => b.id === booking.barberId);
                
                return {
                    ...booking,
                    userName: user.nome,
                    userEmail: user.email,
                    serviceName: service ? service.name : 'Serviço não encontrado',
                    barberName: barber ? barber.name : 'Profissional não encontrado'
                };
            })];
        }, []);
        
        return allBookings;
    }

    static async createBooking(bookingData) {
        await new Promise(resolve => setTimeout(resolve, 600));
        const newBooking = {
            id: Math.floor(Math.random() * 1000),
            ...bookingData,
            status: "pending"
        };
        return newBooking;
    }

    static async login(email, senha) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const user = MOCK_DATA.usuariosMock.find(
            user => user.email === email && user.senha === senha
        );
        
        if (!user) {
            throw new Error('Email ou senha inválidos');
        }
        
        const { senha: _, ...userData } = user;
        return userData;
    }
}

export { MOCK_DATA, ApiService }; 
