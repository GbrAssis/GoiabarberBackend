class Calendar {
    constructor(containerId, options = {}) {
        console.log('[Calendar] Inicializando calendário...');
        this.container = document.getElementById(containerId);
        this.options = {
            onDateSelect: options.onDateSelect || (() => {}),
            minDate: options.minDate || new Date(),
            maxDate: options.maxDate || this.addMonths(new Date(), 2),
            disabledDays: options.disabledDays || [0],
            ...options
        };

        this.currentDate = new Date();
        this.selectedDate = null;
        
        this.init();
    }

    init() {
        console.log('[Calendar] Chamando init()');
        this.render();
        this.attachEventListeners();
    }

    render() {
        console.log('[Calendar] Renderizando calendário...');
        const calendar = this.createCalendarHTML();
        this.container.innerHTML = calendar;
        this.highlightToday();
        if (this.selectedDate) {
            this.highlightSelectedDate();
        }
    }

    createCalendarHTML() {
        console.log('[Calendar] Criando HTML do calendário...');
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const firstDayIndex = firstDay.getDay();
        const lastDate = lastDay.getDate();
        
        const monthName = this.getMonthName(month);

        let html = `
            <div class="calendar-header">
                <button class="calendar-nav prev">&lt;</button>
                <h3>${monthName} ${year}</h3>
                <button class="calendar-nav next">&gt;</button>
            </div>
            <div class="calendar-body">
                <div class="calendar-weekdays">
                    ${this.getWeekDaysHTML()}
                </div>
                <div class="calendar-dates">
        `;

        for (let i = 0; i < firstDayIndex; i++) {
            html += '<div class="calendar-date empty"></div>';
        }

        for (let day = 1; day <= lastDate; day++) {
            const date = new Date(year, month, day);
            const isDisabled = this.isDateDisabled(date);
            const classes = ['calendar-date'];
            
            if (isDisabled) {
                classes.push('disabled');
            }

            html += `
                <div class="${classes.join(' ')}" data-date="${date.toISOString()}">
                    ${day}
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    getWeekDaysHTML() {
        console.log('[Calendar] Gerando nomes dos dias da semana...');
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return weekDays.map(day => `<div class="weekday">${day}</div>`).join('');
    }

    getMonthName(month) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        console.log(`[Calendar] Obtendo nome do mês: ${months[month]}`);
        return months[month];
    }

    attachEventListeners() {
        console.log('[Calendar] Adicionando event listeners de navegação e datas...');
        const prevButton = this.container.querySelector('.calendar-nav.prev');
        const nextButton = this.container.querySelector('.calendar-nav.next');

        prevButton.addEventListener('click', () => this.navigateMonth(-1));
        nextButton.addEventListener('click', () => this.navigateMonth(1));

        const dates = this.container.querySelectorAll('.calendar-date:not(.empty):not(.disabled)');
        dates.forEach(dateElement => {
            dateElement.addEventListener('click', (e) => {
                const dateStr = e.target.dataset.date;
                console.log('[Calendar] Data clicada:', dateStr);
                this.selectDate(new Date(dateStr));
            });
        });
    }

    navigateMonth(direction) {
        console.log(`[Calendar] Navegando mês: ${direction > 0 ? 'próximo' : 'anterior'}`);
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + direction,
            1
        );
        this.render();
    }

    selectDate(date) {
        if (this.isDateDisabled(date)) {
            console.log('[Calendar] Data desabilitada selecionada:', date);
            return;
        }
        console.log('[Calendar] Data selecionada:', date);
        this.selectedDate = date;
        this.highlightSelectedDate();
        this.options.onDateSelect(date);
    }

    highlightToday() {
        const today = new Date();
        const todayElement = this.container.querySelector(
            `.calendar-date[data-date="${today.toISOString().split('T')[0]}"]`
        );
        if (todayElement) {
            console.log('[Calendar] Destacando hoje:', today);
            todayElement.classList.add('today');
        }
    }

    highlightSelectedDate() {
        // Remove highlight anterior
        const previousSelected = this.container.querySelector('.calendar-date.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        // Adiciona novo highlight
        const selectedElement = this.container.querySelector(
            `.calendar-date[data-date="${this.selectedDate.toISOString().split('T')[0]}"]`
        );
        if (selectedElement) {
            console.log('[Calendar] Destacando data selecionada:', this.selectedDate);
            selectedElement.classList.add('selected');
        }
    }

    isDateDisabled(date) {
        // Verifica se a data está no passado
        if (date < new Date().setHours(0, 0, 0, 0)) {
            console.log('[Calendar] Data está no passado:', date);
            return true;
        }

        // Verifica se a data está além do máximo permitido
        if (date > this.options.maxDate) {
            console.log('[Calendar] Data está além do máximo permitido:', date);
            return true;
        }

        // Verifica se é um dia da semana desabilitado
        if (this.options.disabledDays.includes(date.getDay())) {
            console.log('[Calendar] Dia da semana desabilitado:', date.getDay());
            return true;
        }

        return false;
    }

    addMonths(date, months) {
        console.log(`[Calendar] Adicionando ${months} meses à data:`, date);
        return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
    }

    // Métodos públicos para controle externo
    getSelectedDate() {
        console.log('[Calendar] getSelectedDate chamado. Data:', this.selectedDate);
        return this.selectedDate;
    }

    setSelectedDate(date) {
        console.log('[Calendar] setSelectedDate chamado. Data:', date);
        this.selectDate(new Date(date));
    }

    refresh() {
        console.log('[Calendar] refresh chamado.');
        this.render();
    }
}

// Estilos CSS para o calendário
const style = document.createElement('style');
style.textContent = `
    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--primary-color);
        color: white;
        border-radius: 8px 8px 0 0;
    }

    .calendar-nav {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: opacity 0.3s ease;
    }

    .calendar-nav:hover {
        opacity: 0.8;
    }

    .calendar-body {
        padding: 1rem;
        background: white;
        border-radius: 0 0 8px 8px;
    }

    .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-weight: 500;
        color: #666;
        margin-bottom: 0.5rem;
    }

    .calendar-dates {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
    }

    .calendar-date {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .calendar-date:not(.empty):not(.disabled):hover {
        background: var(--primary-color);
        color: white;
    }

    .calendar-date.today {
        border: 2px solid var(--primary-color);
    }

    .calendar-date.selected {
        background: var(--primary-color);
        color: white;
    }

    .calendar-date.disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .calendar-date.empty {
        cursor: default;
    }
`;

document.head.appendChild(style);

// Exporta a classe Calendar
export { Calendar }; 