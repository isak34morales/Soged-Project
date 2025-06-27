// Auth Manager Class
class AuthManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful login
            const userData = {
                email,
                name: 'Demo User',
                languagePreference: 'guna'
            };

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Redirect to index
            window.location.href = 'index.html';
        } catch (error) {
            this.showError('Invalid email or password');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const languagePreference = document.getElementById('languagePreference').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful registration
            const userData = {
                firstName,
                lastName,
                email,
                username,
                languagePreference
            };

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Show success message
            this.showSuccess('Registration successful! Redirecting to dashboard...');

            // Redirect to index after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            this.showError('Registration failed. Please try again.');
        }
    }

    showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        const form = this.loginForm || this.registerForm;
        form.insertBefore(alertDiv, form.firstChild);

        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    showSuccess(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        const form = this.loginForm || this.registerForm;
        form.insertBefore(alertDiv, form.firstChild);
    }
}

// Initialize Auth Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
}); 