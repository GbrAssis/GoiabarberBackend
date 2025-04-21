class Footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <!-- Logo e Informações Principais -->
                    <div class="footer-main">
                        <div class="footer-brand">
                            <img src="../logo-goiaba.png" alt="Goiabarber Logo" class="footer-logo">
                            <p>Goiabarber | CNPJ: XX.XXX.XXX/0001-XX</p>
                            <p>Rua das Barbearias, 123 - Centro</p>
                            <p>São Paulo/SP - CEP 01000-000</p>
                        </div>
                    </div>

                    <!-- Links Úteis -->
                    <div class="footer-links">
                        <h3>NOSSOS SERVIÇOS</h3>
                        <ul>
                            <li><a href="GoibarberFront/servicos.html">Cortes</a></li>
                            <li><a href="GoibarberFront/servicos.html">Barba</a></li>
                            <li><a href="GoibarberFront/servicos.html">Combos</a></li>
                            <li><a href="GoibarberFront/servicos.html">Produtos</a></li>
                        </ul>
                    </div>

                    <!-- Informações -->
                    <div class="footer-info">
                        <h3>INFORMAÇÕES</h3>
                        <ul>
                            <li><a href="GoibarberFront/sobre.html">Sobre Nós</a></li>
                            <li><a href="GoibarberFront/politica-privacidade.html">Política de Privacidade</a></li>
                            <li><a href="GoibarberFront/termos.html">Termos de Uso</a></li>
                            <li><a href="GoibarberFront/trabalhe-conosco.html">Trabalhe Conosco</a></li>
                        </ul>
                    </div>

                    <!-- Contato -->
                    <div class="footer-contact">
                        <h3>CONTATO</h3>
                        <div class="contact-info">
                            <p>
                                <i class="icon-whatsapp"></i>
                                <a href="https://wa.me/5562999999999" target="_blank">+55 62 99999-9999</a>
                            </p>
                            <p>
                                <i class="icon-phone"></i>
                                <a href="tel:+556232999999">+55 62 3299-9999</a>
                            </p>
                            <p>
                                <i class="icon-email"></i>
                                <a href="mailto:contato@goiabarber.com.br">contato@goiabarber.com.br</a>
                            </p>
                        </div>
                        <div class="social-media">
                            <a href="#" target="_blank" class="social-icon"><i class="icon-facebook"></i></a>
                            <a href="#" target="_blank" class="social-icon"><i class="icon-instagram"></i></a>
                            <a href="#" target="_blank" class="social-icon"><i class="icon-youtube"></i></a>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Goiabarber - Todos os direitos reservados</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', Footer); 