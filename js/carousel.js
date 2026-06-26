// Carousel Management for Soged Language Learning Platform
class CarouselManager {
    constructor() {
        this.featuresCarousel = null;
        this.currentFeaturesIndex = 0;
        this.init();
    }

    init() {
        this.setupFeaturesCarousel();
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

        const featureCard = this.featuresCarousel.querySelector('.feature-card');
        if (!featureCard) return;

        const cardWidth = featureCard.offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(this.currentFeaturesIndex * (cardWidth + gap));
        
        this.featuresCarousel.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.updateCarouselButtons('features');
    }

    updateCarouselButtons(type) {
        const prevBtn = document.getElementById(`prev${type.charAt(0).toUpperCase() + type.slice(1)}`);
        const nextBtn = document.getElementById(`next${type.charAt(0).toUpperCase() + type.slice(1)}`);
        
        if (type === 'features') {
            if (prevBtn) prevBtn.disabled = this.currentFeaturesIndex === 0;
            if (nextBtn) nextBtn.disabled = this.currentFeaturesIndex === this.totalFeatures - 1;
        }
    }

    // Method to handle window resize
    handleResize() {
        if (this.featuresCarousel) {
            this.updateFeaturesCarousel();
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