// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
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

    if (isAuthPage) {
        // Load auth header for login and register pages
        loadComponent('auth-header-component', '/components/auth-header.html');
    } else if (isDashboardPage) {
        // Load dashboard header for dashboard page
        loadComponent('header-component', '/components/dashboard-header.html');
    } else {
        // Load regular header and footer for other pages
        loadComponent('header-component', '/components/header.html');
        loadComponent('footer-component', '/components/footer.html');
    }
}); 