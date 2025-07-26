// Theme management
class ThemeManager {
    constructor() {
        this.themeSwitch = null;
        this.init();
    }

    init() {
        // Always start with light theme by default
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Initialize theme switch after component is loaded
        this.initializeThemeSwitch();
    }

    getSystemTheme() {
        // Always return light theme as default
        return 'light';
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
        // Set initial state - when checked = dark mode, when unchecked = light mode
        this.themeSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';

        // Add event listener
        this.themeSwitch.addEventListener('change', () => {
            const newTheme = this.themeSwitch.checked ? 'dark' : 'light';
            this.setTheme(newTheme);
        });

        // Listen for system theme changes (but default to light)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme('light'); // Always default to light
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