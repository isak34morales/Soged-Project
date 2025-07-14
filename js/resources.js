// Resources Page JavaScript

class ResourcesManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.resourceCards = document.querySelectorAll('.resource-card');
        this.resourcesGrid = document.getElementById('resourcesGrid');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.visibleCards = 12;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSearch();
        this.setupFilters();
        this.setupLoadMore();
    }
    
    setupEventListeners() {
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.filterResources();
            });
        }
        
        // Category filters
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveCategory(e.target.closest('.category-btn'));
            });
        });
        
        // Load more functionality
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreResources();
            });
        }
    }
    
    setupSearch() {
        // Add search icon click functionality
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }
        
        // Add enter key functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }
    
    setupFilters() {
        // Initialize with "All" category active
        const allBtn = document.querySelector('.category-btn[data-category="all"]');
        if (allBtn) {
            this.setActiveCategory(allBtn);
        }
    }
    
    setupLoadMore() {
        // Hide load more button if not enough cards
        if (this.resourceCards.length <= this.visibleCards) {
            if (this.loadMoreBtn) {
                this.loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    setActiveCategory(button) {
        // Remove active class from all buttons
        this.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current category
        this.currentCategory = button.getAttribute('data-category');
        
        // Filter resources
        this.filterResources();
    }
    
    filterResources() {
        let visibleCount = 0;
        
        this.resourceCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const searchText = card.getAttribute('data-search');
            
            // Check if card matches current filter
            const matchesCategory = this.currentCategory === 'all' || category === this.currentCategory;
            const matchesSearch = !this.currentSearch || searchText.includes(this.currentSearch);
            
            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.classList.add('filtered');
                
                // Show only visible cards
                if (visibleCount < this.visibleCards) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.classList.add('hidden');
                card.classList.remove('filtered');
                card.style.display = 'none';
            }
        });
        
        // Update load more button visibility
        this.updateLoadMoreButton(visibleCount);
        
        // Show no results message if needed
        this.showNoResultsMessage(visibleCount);
    }
    
    updateLoadMoreButton(visibleCount) {
        if (this.loadMoreBtn) {
            const totalMatchingCards = this.getMatchingCardsCount();
            
            if (visibleCount >= totalMatchingCards) {
                this.loadMoreBtn.style.display = 'none';
            } else {
                this.loadMoreBtn.style.display = 'block';
            }
        }
    }
    
    getMatchingCardsCount() {
        let count = 0;
        this.resourceCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const searchText = card.getAttribute('data-search');
            
            const matchesCategory = this.currentCategory === 'all' || category === this.currentCategory;
            const matchesSearch = !this.currentSearch || searchText.includes(this.currentSearch);
            
            if (matchesCategory && matchesSearch) {
                count++;
            }
        });
        return count;
    }
    
    showNoResultsMessage(visibleCount) {
        // Remove existing no results message
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Show message if no results
        if (visibleCount === 0) {
            const message = document.createElement('div');
            message.className = 'no-results-message text-center py-5';
            message.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No resources found</h3>
                <p style="color: var(--text-secondary);">Try adjusting your search or filter criteria</p>
            `;
            
            if (this.resourcesGrid) {
                this.resourcesGrid.appendChild(message);
            }
        }
    }
    
    performSearch() {
        // Trigger search with current input value
        if (this.searchInput) {
            this.currentSearch = this.searchInput.value.toLowerCase();
            this.filterResources();
        }
    }
    
    loadMoreResources() {
        const matchingCards = Array.from(this.resourceCards).filter(card => {
            const category = card.getAttribute('data-category');
            const searchText = card.getAttribute('data-search');
            
            const matchesCategory = this.currentCategory === 'all' || category === this.currentCategory;
            const matchesSearch = !this.currentSearch || searchText.includes(this.currentSearch);
            
            return matchesCategory && matchesSearch;
        });
        
        // Show more cards
        matchingCards.forEach((card, index) => {
            if (index < this.visibleCards + 6) { // Load 6 more cards
                card.style.display = 'block';
            }
        });
        
        this.visibleCards += 6;
        
        // Hide load more button if all cards are shown
        if (this.visibleCards >= matchingCards.length) {
            if (this.loadMoreBtn) {
                this.loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    // Add smooth animations
    addCardAnimations() {
        this.resourceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Handle resource card interactions
    setupCardInteractions() {
        this.resourceCards.forEach(card => {
            const downloadBtn = card.querySelector('.btn-primary');
            const actionBtn = card.querySelector('.btn-outline-primary');
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleDownload(card);
                });
            }
            
            if (actionBtn) {
                actionBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAction(card);
                });
            }
        });
    }
    
    handleDownload(card) {
        const title = card.querySelector('.resource-title').textContent;
        
        // Show download notification
        this.showNotification(`Downloading ${title}...`, 'success');
        
        // Simulate download
        setTimeout(() => {
            this.showNotification(`${title} downloaded successfully!`, 'success');
        }, 2000);
    }
    
    handleAction(card) {
        const title = card.querySelector('.resource-title').textContent;
        const actionText = card.querySelector('.btn-outline-primary').textContent.trim();
        
        if (actionText.includes('Practice')) {
            this.showNotification(`Starting practice for ${title}...`, 'info');
        } else if (actionText.includes('Listen')) {
            this.showNotification(`Playing audio for ${title}...`, 'info');
        } else if (actionText.includes('Watch')) {
            this.showNotification(`Opening video for ${title}...`, 'info');
        } else if (actionText.includes('Preview')) {
            this.showNotification(`Opening preview for ${title}...`, 'info');
        } else if (actionText.includes('Explore')) {
            this.showNotification(`Exploring ${title}...`, 'info');
        } else if (actionText.includes('Save')) {
            this.showNotification(`${title} saved to favorites!`, 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            box-shadow: 0 8px 32px var(--shadow-color);
            z-index: 1050;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const resourcesManager = new ResourcesManager();
    
    // Add card animations
    resourcesManager.addCardAnimations();
    
    // Setup card interactions
    resourcesManager.setupCardInteractions();
    
    // Make it globally available
    window.resourcesManager = resourcesManager;
    
    console.log('Resources manager initialized');
}); 