// Carousel Management for Soged Language Learning Platform
class CarouselManager {
    constructor() {
        this.featuresCarousel = null;
        this.partnersCarousel = null;
        this.currentFeaturesIndex = 0;
        this.currentPartnersIndex = 0;
        this.init();
    }

    init() {
        this.setupFeaturesCarousel();
        this.setupPartnersCarousel();
        this.setupEventListeners();
    }

    setupFeaturesCarousel() {
        this.featuresCarousel = document.getElementById('featuresCarousel');
        if (!this.featuresCarousel) return;

        const cards = this.featuresCarousel.querySelectorAll('.feature-card');
        this.totalFeatures = cards.length;
        this.visibleFeatures = 3; // Show 3 cards at a time
        
        // Clone cards for infinite scroll effect
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            this.featuresCarousel.appendChild(clone);
        });
    }

    setupPartnersCarousel() {
        this.partnersCarousel = document.getElementById('partnersCarousel');
        if (!this.partnersCarousel) return;

        const cards = this.partnersCarousel.querySelectorAll('.partner-card');
        this.totalPartners = cards.length;
        this.visiblePartners = 3; // Show 3 cards at a time
        
        // Clone cards for infinite scroll effect
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            this.partnersCarousel.appendChild(clone);
        });

        // Start auto-scroll animation
        this.startPartnersAutoScroll();
    }

    setupEventListeners() {
        // Features carousel controls
        const prevFeaturesBtn = document.getElementById('prevFeatures');
        const nextFeaturesBtn = document.getElementById('nextFeatures');

        if (prevFeaturesBtn) {
            prevFeaturesBtn.addEventListener('click', () => this.prevFeatures());
        }

        if (nextFeaturesBtn) {
            nextFeaturesBtn.addEventListener('click', () => this.nextFeatures());
        }

        // Partners carousel controls (optional, since it auto-scrolls)
        const prevPartnersBtn = document.getElementById('prevPartners');
        const nextPartnersBtn = document.getElementById('nextPartners');

        if (prevPartnersBtn) {
            prevPartnersBtn.addEventListener('click', () => this.prevPartners());
        }

        if (nextPartnersBtn) {
            nextPartnersBtn.addEventListener('click', () => this.nextPartners());
        }

        // Pause auto-scroll on hover
        if (this.partnersCarousel) {
            this.partnersCarousel.addEventListener('mouseenter', () => {
                this.partnersCarousel.style.animationPlayState = 'paused';
            });

            this.partnersCarousel.addEventListener('mouseleave', () => {
                this.partnersCarousel.style.animationPlayState = 'running';
            });
        }
    }

    prevFeatures() {
        if (this.currentFeaturesIndex > 0) {
            this.currentFeaturesIndex--;
        } else {
            this.currentFeaturesIndex = this.totalFeatures - 1;
        }
        this.updateFeaturesCarousel();
    }

    nextFeatures() {
        if (this.currentFeaturesIndex < this.totalFeatures - 1) {
            this.currentFeaturesIndex++;
        } else {
            this.currentFeaturesIndex = 0;
        }
        this.updateFeaturesCarousel();
    }

    updateFeaturesCarousel() {
        if (!this.featuresCarousel) return;

        const cardWidth = this.featuresCarousel.querySelector('.feature-card').offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(this.currentFeaturesIndex * (cardWidth + gap));
        
        this.featuresCarousel.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.updateCarouselButtons('features');
    }

    prevPartners() {
        if (this.currentPartnersIndex > 0) {
            this.currentPartnersIndex--;
        } else {
            this.currentPartnersIndex = this.totalPartners - 1;
        }
        this.updatePartnersCarousel();
    }

    nextPartners() {
        if (this.currentPartnersIndex < this.totalPartners - 1) {
            this.currentPartnersIndex++;
        } else {
            this.currentPartnersIndex = 0;
        }
        this.updatePartnersCarousel();
    }

    updatePartnersCarousel() {
        if (!this.partnersCarousel) return;

        const cardWidth = this.partnersCarousel.querySelector('.partner-card').offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(this.currentPartnersIndex * (cardWidth + gap));
        
        this.partnersCarousel.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.updateCarouselButtons('partners');
    }

    updateCarouselButtons(type) {
        const prevBtn = document.getElementById(`prev${type.charAt(0).toUpperCase() + type.slice(1)}`);
        const nextBtn = document.getElementById(`next${type.charAt(0).toUpperCase() + type.slice(1)}`);
        
        if (type === 'features') {
            if (prevBtn) prevBtn.disabled = this.currentFeaturesIndex === 0;
            if (nextBtn) nextBtn.disabled = this.currentFeaturesIndex === this.totalFeatures - 1;
        } else if (type === 'partners') {
            if (prevBtn) prevBtn.disabled = this.currentPartnersIndex === 0;
            if (nextBtn) nextBtn.disabled = this.currentPartnersIndex === this.totalPartners - 1;
        }
    }

    startPartnersAutoScroll() {
        if (!this.partnersCarousel) return;

        // Add auto-scroll class after a short delay
        setTimeout(() => {
            this.partnersCarousel.classList.add('auto-scroll');
        }, 1000);
    }

    // Method to handle window resize
    handleResize() {
        // Recalculate carousel positions on window resize
        if (this.featuresCarousel) {
            this.updateFeaturesCarousel();
        }
        if (this.partnersCarousel) {
            this.updatePartnersCarousel();
        }
    }
}

// Initialize carousel manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.carouselManager = new CarouselManager();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.carouselManager) {
            window.carouselManager.handleResize();
        }
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarouselManager;
} 