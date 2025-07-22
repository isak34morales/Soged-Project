class DashboardSidebarSimple extends HTMLElement {
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
                    background: #ffffff;
                    border-right: 1px solid #e0e0e0;
                    transition: width 0.3s ease;
                    overflow: hidden;
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
                    cursor: pointer;
                    z-index: 1001;
                }

                .sidebar-header {
                    padding: 2rem 1.5rem 1rem;
                    background: #4A90E2;
                    color: white;
                    text-align: center;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                :host([collapsed]) .user-profile {
                    flex-direction: column;
                    align-items: center;
                }

                .profile-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    border: 3px solid rgba(255, 255, 255, 0.3);
                }

                .profile-info {
                    flex: 1;
                }

                :host([collapsed]) .profile-info {
                    display: none;
                }

                .profile-info h4 {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin-bottom: 0.3rem;
                }

                .user-level {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }

                .sidebar-nav {
                    padding: 1.5rem 1rem;
                    overflow-y: auto;
                }

                .nav-section {
                    margin-bottom: 1rem;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    color: #333;
                    text-decoration: none;
                    border-radius: 10px;
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                    border: 1px solid #e9ecef;
                }

                .nav-link:hover {
                    background: #e9ecef;
                    color: #4A90E2;
                }

                .nav-link.active {
                    background: #4A90E2;
                    color: white;
                }

                .nav-link i {
                    margin-right: 1rem;
                    font-size: 1.5rem;
                    width: 1.5rem;
                    text-align: center;
                    display: inline-block;
                    color: inherit;
                }

                .nav-link span {
                    font-size: 1rem;
                    font-weight: 600;
                }

                :host([collapsed]) .nav-link span {
                    display: none;
                }

                :host([collapsed]) .nav-link {
                    justify-content: center;
                    padding: 1rem 0.5rem;
                }

                :host([collapsed]) .nav-link i {
                    margin-right: 0;
                    font-size: 2rem;
                }

                /* Debug styles */
                .nav-link i {
                    border: 1px solid red;
                    background: yellow;
                    min-width: 1.5rem;
                    min-height: 1.5rem;
                }
            </style>

            <button class="sidebar-toggle" id="sidebarToggle">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="sidebar-header">
                <div class="user-profile">
                    <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=4A90E2&color=fff&size=60&font-size=0.4" alt="Profile" class="profile-avatar">
                    <div class="user-info">
                        <h4 class="user-name">Maria Santos</h4>
                        <span class="user-level">Advanced Student</span>
                    </div>
                </div>
            </div>

            <nav class="sidebar-nav">
                <div class="nav-section">
                    <a href="#" class="nav-link active" data-section="overview" data-title="Overview">
                        <i class="fas fa-home"></i>
                        <span>Overview</span>
                    </a>
                </div>

                <div class="nav-section">
                    <a href="#" class="nav-link" data-section="courses" data-title="Courses">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Courses</span>
                    </a>
                </div>

                <div class="nav-section">
                    <a href="#" class="nav-link" data-section="achievements" data-title="Achievements">
                        <i class="fas fa-trophy"></i>
                        <span>Achievements</span>
                    </a>
                </div>

                <div class="nav-section">
                    <a href="#" class="nav-link" data-section="community" data-title="Community">
                        <i class="fas fa-users"></i>
                        <span>Community</span>
                    </a>
                </div>

                <div class="nav-section">
                    <a href="#" class="nav-link" data-section="profile" data-title="Profile">
                        <i class="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                </div>

                <div class="nav-section">
                    <a href="#" class="nav-link" data-section="settings" data-title="Settings">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </div>
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

customElements.define('dashboard-sidebar-simple', DashboardSidebarSimple); 