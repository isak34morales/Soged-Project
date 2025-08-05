// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Si es el modal de auth, configurar eventos después de cargar
        if (elementId === 'auth-modal-root') {
            console.log('Auth modal loaded, setting up events...');
            setTimeout(() => {
                setupModalEvents();
                // Configurar eventos de formulario si authManager existe
                if (window.authManager) {
                    window.authManager.setupEventListeners();
                }
            }, 100);
        }
        
        // Si es el header, asignar eventos a los botones de login/register
        if (elementId === 'header-component') {
            setTimeout(() => {
                document.querySelectorAll('.nav-login-btn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        showAuthModal('login');
                    });
                });
                document.querySelectorAll('.nav-register-btn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        showAuthModal('register');
                    });
                });
            }, 0);
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html') || path.includes('register.html');
    const isDashboardPage = path.includes('dashboard.html') || path.includes('dashboard-new.html');
    const isPagesFolder = path.includes('/pages/') || window.location.href.includes('/pages/');
    const isCoursesFolder = path.includes('/courses/') || window.location.href.includes('/courses/');
    
    // Determine the base path for components
    let basePath = '';
    if (isPagesFolder || isAuthPage || isDashboardPage || isCoursesFolder) {
        basePath = '../components/';
    } else {
        basePath = 'components/';
    }

    if (isAuthPage) {
        // Load auth header for login and register pages
        loadComponent('auth-header-component', basePath + 'auth-header.html');
    } else if (isDashboardPage) {
        // Load dashboard header for dashboard page
        loadComponent('header-component', basePath + 'dashboard-header.html');
    } else {
        // Load regular header and footer for other pages
        // Use Web Component header.js for non-logged users
        const headerScript = document.createElement('script');
        headerScript.src = basePath + 'header.js';
        document.head.appendChild(headerScript);
        
        // Add the Web Component to the page
        const headerElement = document.createElement('soged-header');
        document.getElementById('header-component').appendChild(headerElement);
        
        loadComponent('footer-component', basePath + 'footer.html');
        loadComponent('auth-modal-root', basePath + 'auth-modal.html');
    }
    
    // Listen for auth modal events from the header
    document.addEventListener('openAuthModal', (e) => {
        console.log('Received openAuthModal event:', e.detail);
        showAuthModal(e.detail.type);
    });
    
    // Initialize modal after a short delay to ensure everything is loaded
    setTimeout(() => {
        initializeAuthModal();
    }, 500);
});

// === AUTH MODAL LOGIC ===
function showAuthModal(type = 'login') {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) {
        console.error('Modal overlay not found');
        return;
    }
    
    console.log('Opening modal:', type);
    
    // Mostrar el overlay primero
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Ocultar todos los formularios primero
    overlay.querySelectorAll('.auth-form').forEach(f => {
        f.style.display = 'none';
        f.style.opacity = '0';
    });
    
    // Mostrar el formulario correcto con animación
    let targetForm;
    if (type === 'login') {
        targetForm = overlay.querySelector('.auth-login-form');
    } else if (type === 'register') {
        targetForm = overlay.querySelector('.auth-register-form');
    } else if (type === 'forgot') {
        targetForm = overlay.querySelector('.auth-forgot-form');
    }
    
    if (targetForm) {
        targetForm.style.display = 'block';
        // Pequeño delay para asegurar que el display se aplique
        setTimeout(() => {
            targetForm.style.opacity = '1';
            // Focus en el primer input del formulario
            const firstInput = targetForm.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 50);
    } else {
        console.error('Target form not found for type:', type);
    }
}

function hideAuthModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) {
        console.error('Modal overlay not found for hiding');
        return;
    }
    
    console.log('Hiding modal');
    
    // Animación de salida
    const modal = overlay.querySelector('.auth-modal');
    if (modal) {
        modal.style.transform = 'scale(0.95)';
        modal.style.opacity = '0';
    }
    
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        if (modal) {
            modal.style.transform = '';
            modal.style.opacity = '';
        }
    }, 200);
}

function setupModalEvents() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;
    
    // Close modal when clicking overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideAuthModal();
        }
    });
    
    // Close modal with close button
    const closeButtons = overlay.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', hideAuthModal);
    });
    
    // Switch between login and register forms
    const switchToRegister = overlay.querySelector('.switch-to-register');
    const switchToLogin = overlay.querySelector('.switch-to-login');
    const switchToForgot = overlay.querySelector('.switch-to-forgot');
    const backToLogin = overlay.querySelector('.back-to-login');
    
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    if (switchToForgot) {
        switchToForgot.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('forgot');
        });
    }
    
    if (backToLogin) {
        backToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // Handle form submissions
    const loginForm = overlay.querySelector('.auth-login-form form');
    const registerForm = overlay.querySelector('.auth-register-form form');
    const forgotForm = overlay.querySelector('.auth-forgot-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Add hover effects to buttons
    const buttons = overlay.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Add focus effects to inputs
    const inputs = overlay.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#28A745';
            input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e1e5e9';
            input.style.boxShadow = 'none';
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || document.getElementById('login-email')?.value;
    const password = formData.get('password') || document.getElementById('login-password')?.value;
    
    console.log('Login attempt:', { email, password });
    
    // Aquí iría la lógica de autenticación real
    // Por ahora, simulamos un login exitoso
    setTimeout(() => {
        hideAuthModal();
        // Redirigir al dashboard
        window.location.href = 'dashboard/dashboard-new.html';
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || document.getElementById('register-firstname')?.value;
    const email = formData.get('email') || document.getElementById('register-email')?.value;
    const password = formData.get('password') || document.getElementById('register-password')?.value;
    
    console.log('Register attempt:', { name, email, password });
    
    // Aquí iría la lógica de registro real
    // Por ahora, simulamos un registro exitoso
    setTimeout(() => {
        hideAuthModal();
        // Redirigir al dashboard
        window.location.href = 'dashboard/dashboard-new.html';
    }, 1000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || document.getElementById('forgot-email')?.value;
    
    console.log('Forgot password attempt:', { email });
    
    // Show success message in the form
    const forgotForm = e.target;
    const submitButton = forgotForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Change button to show success state
    submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Form Sent!';
    submitButton.style.background = 'linear-gradient(135deg, #28A745 0%, #20C997 100%)';
    submitButton.disabled = true;
    
    // Disable the email input
    const emailInput = document.getElementById('forgot-email');
    emailInput.disabled = true;
    
    // Aquí iría la lógica de recuperación de contraseña
    // Por ahora, simulamos un envío exitoso
    setTimeout(() => {
        hideAuthModal();
        // Reset button and input after modal is hidden
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        emailInput.disabled = false;
    }, 2000);
}

// Make modal functions globally available
window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal; 

// Initialize auth modal
function initializeAuthModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (overlay) {
        console.log('Initializing auth modal...');
        setupModalEvents();
        
        // Ensure modal is hidden initially
        overlay.style.display = 'none';
        
        // Hide all forms initially
        overlay.querySelectorAll('.auth-form').forEach(f => {
            f.style.display = 'none';
            f.style.opacity = '0';
        });
    }
} 