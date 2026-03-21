// Navigation Active State Management
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        
        // Map page names to menu items
        const pageMap = {
            'index': 'home',
            'languages': 'learn',
            'lessons': 'learn',
            'courses': 'learn',
            'practice': 'learn',
            'games': 'learn',
            'dictionary': 'resources',
            'grammar': 'resources',
            'audio': 'resources',
            'videos': 'resources',
            'downloads': 'resources',
            'about': 'about-us',
            'contact': 'contact'
        };

        return pageMap[page] || 'home';
    }

    init() {
        this.setActiveNavItem();
        this.setupDropdownActiveStates();
    }

    setActiveNavItem() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            // Remove any existing active class
            link.classList.remove('active');
            
            // Check if this link corresponds to current page
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = this.getPageFromHref(href);
                if (linkPage === this.currentPage) {
                    link.classList.add('active');
                }
            }
        });
    }

    getPageFromHref(href) {
        if (href === 'index.html' || href === '/') return 'home';
        if (href === 'about.html') return 'about-us';
        if (href === 'contact.html') return 'contact';
        
        // For dropdown items, check parent dropdown
        if (href.includes('languages') || href.includes('lessons') || 
            href.includes('courses') || href.includes('practice') || 
            href.includes('games')) {
            return 'learn';
        }
        
        if (href.includes('dictionary') || href.includes('grammar') || 
            href.includes('audio') || href.includes('videos') || 
            href.includes('downloads')) {
            return 'resources';
        }
        
        return 'home';
    }

    setupDropdownActiveStates() {
        // Add active state to dropdown parent if child is active
        const dropdownParents = document.querySelectorAll('.dropdown-toggle');
        
        dropdownParents.forEach(parent => {
            const dropdownMenu = parent.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
                
                dropdownItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href) {
                        const itemPage = this.getPageFromHref(href);
                        if (itemPage === this.currentPage) {
                            parent.classList.add('active');
                            item.classList.add('active');
                        }
                    }
                });
            }
        });
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});

// Update active state when navigating
window.addEventListener('popstate', () => {
    if (window.navigationManager) {
        window.navigationManager.init();
    }
}); 