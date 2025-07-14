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
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html') || path.includes('register.html');
    const isDashboardPage = path.includes('dashboard.html');
    
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
    if (!overlay) return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Mostrar el formulario correcto
    overlay.querySelectorAll('.auth-form').forEach(f => f.style.display = 'none');
    if (type === 'login') {
        overlay.querySelector('.auth-login-form').style.display = 'block';
    } else if (type === 'register') {
        overlay.querySelector('.auth-register-form').style.display = 'block';
    } else if (type === 'forgot') {
        overlay.querySelector('.auth-forgot-form').style.display = 'block';
    }
    setTimeout(() => {
        overlay.querySelector('.auth-modal').focus();
    }, 100);
}
function hideAuthModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.body.style.overflow = '';
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
    // Cerrar modal
    const overlay = document.getElementById('auth-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) hideAuthModal();
        });
        const closeBtn = document.getElementById('auth-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', hideAuthModal);
        // ESC para cerrar
        document.addEventListener('keydown', e => {
            if (overlay.style.display === 'flex' && e.key === 'Escape') hideAuthModal();
        });
        // Cambiar entre formularios
        const toRegister = overlay.querySelector('#auth-to-register');
        if (toRegister) toRegister.addEventListener('click', e => { e.preventDefault(); showAuthModal('register'); });
        const toLogin = overlay.querySelector('#auth-to-login');
        if (toLogin) toLogin.addEventListener('click', e => { e.preventDefault(); showAuthModal('login'); });
        const forgot = overlay.querySelector('#auth-forgot-link');
        if (forgot) forgot.addEventListener('click', e => { e.preventDefault(); showAuthModal('forgot'); });
        const backLogin = overlay.querySelector('#auth-back-login');
        if (backLogin) backLogin.addEventListener('click', e => { e.preventDefault(); showAuthModal('login'); });
    }
}); 