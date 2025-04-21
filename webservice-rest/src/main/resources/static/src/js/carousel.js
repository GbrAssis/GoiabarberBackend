class Carousel {
    constructor(element, options = {}) {
        this.container = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = element.querySelector('.carousel-button.next');
        this.prevButton = element.querySelector('.carousel-button.prev');
        this.dotsContainer = element.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        
        this.initializeCarousel();
        this.addEventListeners();
        this.startAutoPlay();
    }

    initializeCarousel() {
        // Position slides
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });

        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            this.dotsContainer.appendChild(dot);
        });
    }

    moveToSlide(index) {
        this.track.style.transform = `translateX(-${this.slideWidth * index}px)`;
        this.currentIndex = index;
        
        // Update dots
        const dots = this.dotsContainer.children;
        Array.from(dots).forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    addEventListeners() {
        this.nextButton.addEventListener('click', () => {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.moveToSlide(nextIndex);
        });

        this.prevButton.addEventListener('click', () => {
            const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.moveToSlide(prevIndex);
        });

        Array.from(this.dotsContainer.children).forEach((dot, index) => {
            dot.addEventListener('click', () => this.moveToSlide(index));
        });
    }

    startAutoPlay() {
        setInterval(() => {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.moveToSlide(nextIndex);
        }, 5000);
    }
} 