// Theme management
class ThemeManager {
    constructor() {
        this.themeSwitch = null;
        this.init();
    }

    init() {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme') || this.getSystemTheme();
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Initialize theme switch after component is loaded
        this.initializeThemeSwitch();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    initializeThemeSwitch() {
        // Wait for the theme switch to be available in the DOM
        const checkThemeSwitch = setInterval(() => {
            this.themeSwitch = document.getElementById('theme-switch');
            if (this.themeSwitch) {
                clearInterval(checkThemeSwitch);
                this.setupThemeSwitch();
            }
        }, 100);
    }

    setupThemeSwitch() {
        // Set initial state
        this.themeSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';

        // Add event listener
        this.themeSwitch.addEventListener('change', () => {
            const newTheme = this.themeSwitch.checked ? 'dark' : 'light';
            this.setTheme(newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 