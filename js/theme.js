// Theme Management System - Soged Project
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeSwitch = null;
        this.init();
    }

    init() {
        // Get saved theme or default to light
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme immediately
        this.setTheme(this.currentTheme);
        
        // Initialize theme switch after components are loaded
        this.initializeThemeSwitch();
        
        // Listen for theme changes from other components
        window.addEventListener('themeChanged', (e) => {
            this.setTheme(e.detail.theme);
        });
        
        console.log('Theme Manager initialized:', this.currentTheme);
    }

    initializeThemeSwitch() {
        // Wait for the theme switch to be available in the DOM
        const checkThemeSwitch = setInterval(() => {
            // Check for theme switch in main DOM
            this.themeSwitch = document.getElementById('theme-switch');
            
            // If not found in main DOM, check in shadow DOM of header component
            if (!this.themeSwitch) {
                const headerComponent = document.querySelector('soged-header');
                if (headerComponent && headerComponent.shadowRoot) {
                    this.themeSwitch = headerComponent.shadowRoot.getElementById('theme-switch');
                }
            }
            
            if (this.themeSwitch) {
                clearInterval(checkThemeSwitch);
                this.setupThemeSwitch();
            }
        }, 100);
    }

    setupThemeSwitch() {
        // Set initial state - checked = dark mode, unchecked = light mode
        this.themeSwitch.checked = this.currentTheme === 'dark';
        
        console.log('Theme switch initialized. Current theme:', this.currentTheme, 'Switch checked:', this.themeSwitch.checked);

        // Remove any existing event listeners
        this.themeSwitch.removeEventListener('change', this.handleThemeChange);
        
        // Add new event listener
        this.themeSwitch.addEventListener('change', this.handleThemeChange.bind(this));
        
        // Also add click listener to the label for better compatibility
        const themeSwitchLabel = this.themeSwitch.nextElementSibling;
        if (themeSwitchLabel && themeSwitchLabel.classList.contains('theme-switch')) {
            themeSwitchLabel.removeEventListener('click', this.handleLabelClick);
            themeSwitchLabel.addEventListener('click', this.handleLabelClick.bind(this));
        }
    }

    handleLabelClick(e) {
        e.preventDefault();
        this.themeSwitch.checked = !this.themeSwitch.checked;
        this.handleThemeChange({ target: this.themeSwitch });
    }

    handleThemeChange(e) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        console.log('Theme switch toggled. New theme:', newTheme, 'Checked:', e.target.checked);
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        // Update current theme
        this.currentTheme = theme;
        
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
        
        // Update all theme-dependent elements
        this.updateThemeElements(theme);
    }

    updateThemeElements(theme) {
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
        
        // Force CSS variable updates for immediate effect
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--bg-primary', '#0F172A');
            root.style.setProperty('--bg-secondary', '#1E293B');
            root.style.setProperty('--bg-tertiary', '#334155');
            root.style.setProperty('--card-bg', '#1E293B');
            root.style.setProperty('--header-bg', '#0F172A');
            root.style.setProperty('--footer-bg', '#0F172A');
            root.style.setProperty('--navbar-bg', '#0F172A');
            root.style.setProperty('--text-primary', '#F1F5F9');
            root.style.setProperty('--text-secondary', '#94A3B8');
            root.style.setProperty('--text-color', '#F1F5F9');
            root.style.setProperty('--border-color', '#334155');
            root.style.setProperty('--input-bg', '#1E293B');
            root.style.setProperty('--input-border', '#475569');
            root.style.setProperty('--input-text', '#F1F5F9');
            root.style.setProperty('--shadow-color', 'rgba(40, 167, 69, 0.15)');
        } else {
            root.style.setProperty('--bg-primary', '#F8FAFC');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--bg-tertiary', '#F1F5F9');
            root.style.setProperty('--card-bg', '#fff');
            root.style.setProperty('--header-bg', '#fff');
            root.style.setProperty('--footer-bg', '#F8FAFC');
            root.style.setProperty('--navbar-bg', '#fff');
            root.style.setProperty('--text-primary', '#1E293B');
            root.style.setProperty('--text-secondary', '#64748B');
            root.style.setProperty('--text-color', '#1E293B');
            root.style.setProperty('--border-color', '#E2E8F0');
            root.style.setProperty('--input-bg', '#fff');
            root.style.setProperty('--input-border', '#CBD5E1');
            root.style.setProperty('--input-text', '#1E293B');
            root.style.setProperty('--shadow-color', 'rgba(40, 167, 69, 0.08)');
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    // Method to sync theme with header component
    syncWithHeader() {
        const headerComponent = document.querySelector('soged-header');
        if (headerComponent && headerComponent.shadowRoot) {
            const headerThemeSwitch = headerComponent.shadowRoot.getElementById('theme-switch');
            if (headerThemeSwitch) {
                headerThemeSwitch.checked = this.currentTheme === 'dark';
            }
        }
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Sync theme with header component after it's loaded
    setTimeout(() => {
        window.themeManager.syncWithHeader();
    }, 500);
});

// Make theme manager globally available
window.ThemeManager = ThemeManager; 