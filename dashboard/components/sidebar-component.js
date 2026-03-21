class DashboardSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isCollapsed = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 320px;
                    height: 100vh;
                    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
                    border-right: 1px solid rgba(0, 163, 224, 0.1);
                    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
                    transition: width 0.3s ease;
                    overflow: hidden;
                    position: relative;
                }

                :host([collapsed]) {
                    width: 80px;
                }

                .sidebar-toggle {
                    position: absolute;
                    top: 20px;
                    right: -15px;
                    width: 30px;
                    height: 30px;
                    background: #4A90E2;
                    border: none;
                    border-radius: 50%;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1001;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .sidebar-toggle:hover {
                    background: #007acc;
                    transform: scale(1.1);
                }

                .sidebar-toggle i {
                    transition: transform 0.3s ease;
                }

                :host([collapsed]) .sidebar-toggle i {
                    transform: rotate(180deg);
                }

                .sidebar-header {
                    padding: 2rem 1.5rem 1rem;
                    background: linear-gradient(135deg, #4A90E2 0%, #007acc 100%);
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .sidebar-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
                    opacity: 0.3;
                }

                .user-profile {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    min-height: 80px;
                }

                :host([collapsed]) .user-profile {
                    flex-direction: column;
                    align-items: center;
                }

                .profile-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                :host([collapsed]) .profile-avatar {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 0.8rem;
                    border: 3px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
                }

                :host([collapsed]) .user-profile {
                    padding: 1rem 0;
                }

                .profile-info {
                    flex: 1;
                    min-width: 0;
                }

                :host([collapsed]) .profile-info {
                    display: none;
                }

                .profile-info h4 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 0.3rem;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .user-level {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .sidebar-nav {
                    flex: 1;
                    padding: 1.5rem 1rem;
                    overflow-y: auto;
                    overflow-x: hidden;
                    margin: 0;
                }

                .nav-section {
                    margin-bottom: 1rem;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 1.2rem 1.5rem;
                    color: #2c3e50;
                    text-decoration: none;
                    border-radius: 20px;
                    margin-bottom: 0.5rem;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    font-weight: 600;
                    position: relative;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .nav-link:hover::before {
                    left: 100%;
                }

                .nav-link:hover {
                    background: rgba(74, 144, 226, 0.15);
                    color: #4A90E2;
                    transform: translateX(8px) scale(1.02);
                    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
                }

                .nav-link.active {
                    background: linear-gradient(135deg, #4A90E2, #007acc);
                    color: white;
                    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
                    transform: translateX(5px);
                }

                .nav-link.active::before {
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                }

                .nav-link i {
                    margin-right: 1.2rem;
                    font-size: 1.5rem;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 2;
                    display: inline-block !important;
                    width: 1.5rem !important;
                    height: 1.5rem !important;
                    text-align: center !important;
                    line-height: 1.5rem !important;
                    color: inherit !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    font-weight: 900 !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                    min-width: 1.5rem !important;
                    min-height: 1.5rem !important;
                }

                /* Fallback para iconos si Font Awesome no carga */
                .nav-link i::before {
                    content: '';
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    background: currentColor;
                    border-radius: 2px;
                    opacity: 0.7;
                }

                /* Cuando Font Awesome está disponible, ocultar el fallback */
                .nav-link i.fas::before {
                    display: none !important;
                }

                /* Asegurar que los iconos de Font Awesome se muestren */
                .nav-link i.fas {
                    font-family: "Font Awesome 6 Free" !important;
                    font-weight: 900 !important;
                }

                /* Debug: Asegurar que los iconos sean visibles */
                .nav-link i {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    padding: 0.2rem;
                }

                .nav-link:hover i {
                    background: rgba(74, 144, 226, 0.2);
                }

                .nav-link.active i {
                    background: rgba(255, 255, 255, 0.3);
                }

                .nav-link:hover i {
                    transform: scale(1.2) rotate(5deg);
                    color: #4A90E2;
                }

                .nav-link.active i {
                    transform: scale(1.1);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1.1); }
                    50% { transform: scale(1.15); }
                }

                .nav-link span {
                    font-size: 1rem;
                    font-weight: 600;
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                :host([collapsed]) .nav-link span {
                    display: none;
                }

                :host([collapsed]) .nav-link {
                    justify-content: center;
                    padding: 1.2rem 0.8rem;
                    margin-bottom: 0.3rem;
                }

                :host([collapsed]) .nav-link i {
                    margin-right: 0;
                    font-size: 2rem;
                    font-weight: 900;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    color: #4A90E2;
                }

                :host([collapsed]) .nav-link.active i {
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                :host([collapsed]) .nav-link:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
                }

                :host([collapsed]) .nav-link.active {
                    transform: scale(1.05);
                }

                /* Tooltip for collapsed sidebar */
                :host([collapsed]) .nav-link {
                    position: relative;
                }

                :host([collapsed]) .nav-link:hover::after {
                    content: attr(data-title);
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 0.5rem 0.8rem;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    z-index: 1000;
                    margin-left: 10px;
                    pointer-events: none;
                }

                /* Scrollbar styling */
                .sidebar-nav::-webkit-scrollbar {
                    width: 6px;
                }

                .sidebar-nav::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                }

                .sidebar-nav::-webkit-scrollbar-thumb {
                    background: #4A90E2;
                    border-radius: 3px;
                }

                .sidebar-nav::-webkit-scrollbar-thumb:hover {
                    background: #007acc;
                }

                /* Dark theme support */
                [data-theme="dark"] :host {
                    background: linear-gradient(180deg, #1e1e2e 0%, #16213e 100%);
                    border-right-color: rgba(74, 144, 226, 0.2);
                }

                [data-theme="dark"] .nav-link {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .nav-link:hover {
                    background: rgba(74, 144, 226, 0.2);
                }
            </style>

            <button class="sidebar-toggle" id="sidebarToggle">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="sidebar-header">
                <div class="user-profile">
                    <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=4A90E2&color=fff&size=80&font-size=0.3" alt="Profile" class="profile-avatar">
                    <div class="user-info">
                        <h3 class="user-name">Maria Santos</h3>
                        <span class="user-level">Advanced Student</span>
                    </div>
                </div>
            </div>

            <nav class="sidebar-nav">
                <a href="#" class="nav-link active" data-section="overview" data-title="Overview">
                    <i class="fas fa-home"></i>
                    <span>Overview</span>
                </a>
                <a href="#" class="nav-link" data-section="courses" data-title="Courses">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Courses</span>
                </a>
                <a href="#" class="nav-link" data-section="community" data-title="Community">
                    <i class="fas fa-users"></i>
                    <span>Community</span>
                </a>
                <a href="#" class="nav-link" data-section="achievements" data-title="Achievements">
                    <i class="fas fa-trophy"></i>
                    <span>Achievements</span>
                </a>
                <a href="#" class="nav-link" data-section="profile" data-title="Profile">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </a>
                <a href="#" class="nav-link" data-section="settings" data-title="Settings">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
            </nav>
        `;
    }

    setupEventListeners() {
        const toggleBtn = this.shadowRoot.getElementById('sidebarToggle');
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');

        // Toggle sidebar
        toggleBtn.addEventListener('click', () => {
            this.toggleCollapse();
        });

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.setAttribute('collapsed', '');
        } else {
            this.removeAttribute('collapsed');
        }

        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: this.isCollapsed }
        }));
    }

    handleNavigation(clickedLink) {
        // Remove active class from all links
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to clicked link
        clickedLink.classList.add('active');

        // Dispatch navigation event
        const section = clickedLink.getAttribute('data-section');
        this.dispatchEvent(new CustomEvent('sectionChange', {
            detail: { section }
        }));
    }

    // Public methods
    collapse() {
        this.isCollapsed = true;
        this.setAttribute('collapsed', '');
    }

    expand() {
        this.isCollapsed = false;
        this.removeAttribute('collapsed');
    }
}

customElements.define('dashboard-sidebar', DashboardSidebar); 