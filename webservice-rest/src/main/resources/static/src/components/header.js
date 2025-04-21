// Função getCookie no início do arquivo
function getCookie(name) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}

class Header extends HTMLElement {
    constructor() {
        super();
        const isAdmin = this.checkIfUserIsAdmin();
        
        // Admin menu items that should only be shown to admin users
        const adminMenuItems = isAdmin ? `
            <li><a href="/GoibarberFront/cadastros.html">Cadastros</a></li>
            <li><a href="/GoibarberFront/cliente.html">Cliente</a></li>
        ` : '';

        this.innerHTML = `
            <header class="header desktop">
                <nav class="nav-container">
                    <div class="logo">
                        <a href="/GoibarberFront/home.html">
                            <img src="./src/logo-goiaba.png" alt="Goiabarber Logo">
                        </a>
                    </div>
                    <ul class="nav-links">
                        <li><a href="/GoibarberFront/home.html">Home</a></li>
                        <li><a href="/GoibarberFront/servicos.html">Serviços</a></li>
                        <li><a href="/GoibarberFront/agendamento.html">Agendamento</a></li>
                        <li><a href="/GoibarberFront/perfil.html">Perfil</a></li>
                        ${adminMenuItems}
                    </ul>
                    <div class="user-actions">
                        
                        <a href="/GoibarberFront/index.html"class="btn-login">Sair</a>
                    </div>
                </nav>
            </header>

            <header class="header mobile">
                <nav class="nav-container nav-container-mobile ">
                    <div class="logo">
                        <a href="/GoibarberFront/home.html">
                            <img src="./src/logo-goiaba.png" alt="Goiabarber Logo">
                        </a>
                    </div>
                    <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                    </span>                    
                    <ul class="nav-links mobile-menu">
                        <li><a href="/GoibarberFront/home.html">Home</a></li>
                        <li><a href="/GoibarberFront/servicos.html">Serviços</a></li>
                        <li><a href="/GoibarberFront/agendamento.html">Agendamento</a></li>
                        <li><a href="/GoibarberFront/perfil.html">Perfil</a></li>
                        ${adminMenuItems}
                        <div class="user-actions">
                            <a href="/GoibarberFront/index.html"class="btn-login">Sair</a>
                        </div>
                    </ul>
                </nav>
            </header>            
        `;
    }

    checkIfUserIsAdmin() {
        const userDataCookie = getCookie('userData');
        console.log(userDataCookie);
        const userData = userDataCookie ? JSON.parse(userDataCookie) : {};
        return userData.admin === true;
    }
}

customElements.define('app-header', Header);

class MobileHeader {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const hamburger = document.querySelector('.hamburger-box');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('is-active');
                mobileMenu.classList.toggle('is-active');
                mobileMenu.classList.toggle('menu-open');
            });

            // Fecha o menu ao clicar em um link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('is-active');
                    mobileMenu.classList.remove('is-active');
                    mobileMenu.classList.remove('menu-open');
                });
            });
        }
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new MobileHeader();
}); 