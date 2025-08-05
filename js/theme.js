// Theme management
class ThemeManager {
    constructor() {
        this.themeSwitch = null;
        this.init();
    }

    init() {
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme immediately
        this.setTheme(savedTheme);
        
        // Initialize theme switch after component is loaded
        this.initializeThemeSwitch();
        
        console.log('Theme initialized:', savedTheme);
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
        // Get current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        // Set initial state - checked = dark mode, unchecked = light mode
        this.themeSwitch.checked = currentTheme === 'dark';
        
        console.log('Theme switch initialized. Current theme:', currentTheme, 'Switch checked:', this.themeSwitch.checked);

        // Remove any existing event listeners
        this.themeSwitch.removeEventListener('change', this.handleThemeChange);
        
        // Add new event listener
        this.themeSwitch.addEventListener('change', this.handleThemeChange.bind(this));
        
        // Also add click listener to the label for better compatibility
        const themeSwitchLabel = this.themeSwitch.nextElementSibling;
        if (themeSwitchLabel && themeSwitchLabel.classList.contains('theme-switch')) {
            themeSwitchLabel.addEventListener('click', (e) => {
                e.preventDefault();
                this.themeSwitch.checked = !this.themeSwitch.checked;
                this.handleThemeChange({ target: this.themeSwitch });
            });
        }
    }

    handleThemeChange(e) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        console.log('Theme switch toggled. New theme:', newTheme, 'Checked:', e.target.checked);
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        // Set theme attribute on document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update switch if it exists
        if (this.themeSwitch) {
            this.themeSwitch.checked = theme === 'dark';
        }
        
        // Force a reflow to ensure CSS variables are applied
        document.body.offsetHeight;
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        
        console.log('Theme changed to:', theme);
        
        // Force update of all theme-dependent elements
        this.updateThemeElements(theme);
    }

    updateThemeElements(theme) {
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
        
        // Force CSS variable updates
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--bg-primary', '#0F172A');
            root.style.setProperty('--bg-secondary', '#1E293B');
            root.style.setProperty('--text-primary', '#F1F5F9');
            root.style.setProperty('--text-secondary', '#94A3B8');
        } else {
            root.style.setProperty('--bg-primary', '#F8FAFC');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-primary', '#1E293B');
            root.style.setProperty('--text-secondary', '#64748B');
        }
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Make theme manager globally available
window.ThemeManager = ThemeManager; 