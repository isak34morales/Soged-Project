// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
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
        
        // Si es el modal de auth, configurar eventos después de cargar
        if (elementId === 'auth-modal-root') {
            setTimeout(() => {
                setupModalEvents();
                // Configurar eventos de formulario si authManager existe
                if (window.authManager) {
                    window.authManager.setupEventListeners();
                }
            }, 100);
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
    
    // Determine the base path for components
    const isInPagesFolder = path.includes('/pages/') || window.location.href.includes('/pages/');
    const basePath = isInPagesFolder ? '../components/' : 'components/';

    if (isAuthPage) {
        // Load auth header for login and register pages
        loadComponent('auth-header-component', basePath + 'auth-header.html');
    } else if (isDashboardPage) {
        // Load dashboard header for dashboard page
        loadComponent('header-component', basePath + 'dashboard-header.html');
    } else {
        // Load regular header and footer for other pages
        loadComponent('header-component', basePath + 'header.html');
        loadComponent('footer-component', basePath + 'footer.html');
        loadComponent('auth-modal-root', basePath + 'auth-modal.html');
    }
});

// === AUTH MODAL LOGIC ===
function showAuthModal(type = 'login') {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) {
        console.error('Modal overlay not found');
        return;
    }
    
    console.log('Opening modal:', type);
    
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
        setTimeout(() => {
            targetForm.style.opacity = '1';
        }, 10);
    }
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus en el primer input del formulario
    setTimeout(() => {
        const firstInput = targetForm?.querySelector('input');
        if (firstInput) firstInput.focus();
        
        // Configurar eventos de formulario si authManager existe
        if (window.authManager) {
            window.authManager.setupEventListeners();
        }
    }, 100);
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

// Eventos globales para abrir modal desde header
window.addEventListener('DOMContentLoaded', () => {
    // Botones del header
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
    
    // Verificar si el modal ya existe y configurar eventos
    setTimeout(() => {
        const overlay = document.getElementById('auth-modal-overlay');
        if (overlay) {
            setupModalEvents();
        }
    }, 500);
});

function setupModalEvents() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) {
        console.error('Modal overlay not found for event setup');
        return;
    }
    
    console.log('Setting up modal events');
    
    // Cerrar modal al hacer click fuera
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            console.log('Click outside modal - closing');
            hideAuthModal();
        }
    });
    
    // Botón de cerrar
    const closeBtn = document.getElementById('auth-modal-close');
    if (closeBtn) {
        console.log('Close button found, adding event listener');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            hideAuthModal();
        });
    } else {
        console.error('Close button not found');
    }
    
    // ESC para cerrar
    document.addEventListener('keydown', e => {
        if (overlay.style.display === 'flex' && e.key === 'Escape') {
            console.log('ESC pressed - closing modal');
            hideAuthModal();
        }
    });
    
    // Navegación entre formularios
    const toRegister = overlay.querySelector('#auth-to-register');
    if (toRegister) {
        toRegister.addEventListener('click', e => {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    const toLogin = overlay.querySelector('#auth-to-login');
    if (toLogin) {
        toLogin.addEventListener('click', e => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    const forgot = overlay.querySelector('#auth-forgot-link');
    if (forgot) {
        forgot.addEventListener('click', e => {
            e.preventDefault();
            showAuthModal('forgot');
        });
    }
    
    const backLogin = overlay.querySelector('#auth-back-login');
    if (backLogin) {
        backLogin.addEventListener('click', e => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // Prevenir que el modal se cierre al hacer click dentro
    const modal = overlay.querySelector('.auth-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            e.stopPropagation();
        });
    }
    
    // También configurar eventos para botones sociales
    const socialButtons = overlay.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            console.log('Social button clicked:', btn.classList.contains('btn-google') ? 'Google' : 'Microsoft');
            // Aquí puedes agregar la lógica de autenticación social
        });
    });
} 