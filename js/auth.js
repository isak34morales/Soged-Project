// Auth Management for Soged Language Learning Platform
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.updateUI();
    }

    checkAuthStatus() {
        // Check if user is logged in (you can modify this based on your auth system)
        const token = localStorage.getItem('soged_token');
        const userData = localStorage.getItem('soged_user');
        
        if (token && userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
            }
        }
    }

    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Theme toggle
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }

    updateUI() {
        const userMenu = document.getElementById('user-menu');
        const authButtons = document.getElementById('auth-buttons');
        const userName = document.getElementById('user-name');

        if (this.isAuthenticated && this.currentUser) {
            // Show user menu, hide auth buttons
            if (userMenu) userMenu.classList.remove('d-none');
            if (authButtons) authButtons.classList.add('d-none');
            if (userName) userName.textContent = this.currentUser.name || 'Usuario';
        } else {
            // Show auth buttons, hide user menu
            if (userMenu) userMenu.classList.add('d-none');
            if (authButtons) authButtons.classList.remove('d-none');
        }
    }

    login(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        
        // Store in localStorage (in a real app, you'd use secure tokens)
        localStorage.setItem('soged_token', 'dummy_token_' + Date.now());
        localStorage.setItem('soged_user', JSON.stringify(userData));
        
        this.updateUI();
        this.showNotification('¡Bienvenido a Soged!', 'success');
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear localStorage
        localStorage.removeItem('soged_token');
        localStorage.removeItem('soged_user');
        
        this.updateUI();
        this.showNotification('Sesión cerrada exitosamente', 'info');
        
        // Redirect to home if not already there
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('soged_theme', newTheme);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Check if user has access to specific features
    hasAccess(feature) {
        if (!this.isAuthenticated) return false;
        
        const accessLevels = {
            'basic': true,
            'premium': this.currentUser?.subscription === 'premium',
            'admin': this.currentUser?.role === 'admin'
        };
        
        return accessLevels[feature] || false;
    }

    // Get user progress for a specific language
    getUserProgress(language) {
        if (!this.isAuthenticated) return null;
        
        const progress = localStorage.getItem(`soged_progress_${language}`);
        return progress ? JSON.parse(progress) : {
            level: 1,
            lessonsCompleted: 0,
            totalLessons: 0,
            score: 0,
            streak: 0
        };
    }

    // Update user progress
    updateProgress(language, progressData) {
        if (!this.isAuthenticated) return;
        
        localStorage.setItem(`soged_progress_${language}`, JSON.stringify(progressData));
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    
    // Set theme from localStorage
    const savedTheme = localStorage.getItem('soged_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.checked = savedTheme === 'dark';
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
} 