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
                    width: 280px;
                    height: 100vh;
                    background: #1a1a1a;
                    border-right: 4px solid #28A745;
                    transition: width 0.3s ease;
                    overflow: hidden;
                    position: relative;
                    font-family: 'Courier New', monospace;
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
                    background: #28A745;
                    border: 2px solid #FFD600;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1001;
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }

                .sidebar-toggle:hover {
                    background: #FF6B35;
                    transform: scale(1.1);
                }

                .sidebar-toggle i {
                    transition: transform 0.3s ease;
                }

                :host([collapsed]) .sidebar-toggle i {
                    transform: rotate(180deg);
                }

                .sidebar-header {
                    padding: 2rem 1rem 1rem;
                    background: #28A745;
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                    border-bottom: 4px solid #FFD600;
                }

                .logo-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                :host([collapsed]) .logo-container {
                    flex-direction: column;
                    align-items: center;
                }

                .logo-icon {
                    width: 60px;
                    height: 60px;
                    background: #FFD600;
                    border: 3px solid #FF6B35;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #1a1a1a;
                    font-weight: bold;
                    overflow: hidden;
                    border-radius: 0;
                }

                :host([collapsed]) .logo-icon {
                    width: 50px;
                    height: 50px;
                    font-size: 1.5rem;
                }

                .logo-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 0;
                }

                .logo-text {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                    text-shadow: 2px 2px 0px #1a1a1a;
                    letter-spacing: 2px;
                }

                :host([collapsed]) .logo-text {
                    display: none;
                }

                .sidebar-content {
                    flex: 1;
                    padding: 1rem 0;
                    overflow-y: auto;
                }

                .nav-section {
                    margin-bottom: 2rem;
                }

                .nav-title {
                    padding: 0.5rem 1.5rem;
                    font-size: 0.8rem;
                    color: #FFD600;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 2px solid #28A745;
                    margin-bottom: 0.5rem;
                }

                :host([collapsed]) .nav-title {
                    display: none;
                }

                .nav-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .nav-item {
                    margin: 0.25rem 0;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    position: relative;
                    border-left: 4px solid transparent;
                }

                :host([collapsed]) .nav-link {
                    justify-content: center;
                    padding: 1rem 0.5rem;
                    gap: 0;
                }

                .nav-link:hover {
                    background: #28A745;
                    color: #1a1a1a;
                    border-left-color: #FFD600;
                }

                .nav-link.active {
                    background: #FF6B35;
                    color: #1a1a1a;
                    border-left-color: #FFD600;
                }

                .nav-icon {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    background: #333;
                    border: 2px solid #555;
                    color: #FFD600;
                }

                .nav-link:hover .nav-icon {
                    background: #FFD600;
                    color: #1a1a1a;
                    border-color: #FF6B35;
                }

                .nav-link.active .nav-icon {
                    background: #FFD600;
                    color: #1a1a1a;
                    border-color: #28A745;
                }

                .nav-text {
                    font-size: 0.9rem;
                    font-weight: bold;
                }

                :host([collapsed]) .nav-text {
                    display: none;
                }

                .nav-badge {
                    background: #FF6B35;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 0;
                    font-size: 0.7rem;
                    font-weight: bold;
                    margin-left: auto;
                }

                :host([collapsed]) .nav-badge {
                    display: none;
                }

                .sidebar-footer {
                    padding: 1rem;
                    border-top: 2px solid #28A745;
                    text-align: center;
                }

                :host([collapsed]) .sidebar-footer {
                    display: none;
                }

                .footer-text {
                    font-size: 0.7rem;
                    color: #FFD600;
                    font-weight: bold;
                }

                /* Scrollbar styling */
                .sidebar-content::-webkit-scrollbar {
                    width: 8px;
                }

                .sidebar-content::-webkit-scrollbar-track {
                    background: #333;
                }

                .sidebar-content::-webkit-scrollbar-thumb {
                    background: #28A745;
                    border: 1px solid #FFD600;
                }

                .sidebar-content::-webkit-scrollbar-thumb:hover {
                    background: #FF6B35;
                }
            </style>

            <button class="sidebar-toggle" title="Toggle Sidebar">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="sidebar-header">
                <div class="logo-container">
                    <div class="logo-icon">
                        <img src="../Images/logoo.png" alt="Soged Logo" class="logo-image">
                    </div>
                    <div class="logo-text">SOGED</div>
                </div>
            </div>

            <div class="sidebar-content">
                <div class="nav-section">
                    <div class="nav-title">Navegación</div>
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="#" class="nav-link active" data-section="overview">
                                <div class="nav-icon">📊</div>
                                <span class="nav-text">Overview</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-section="courses">
                                <div class="nav-icon">📚</div>
                                <span class="nav-text">Cursos</span>
                                <span class="nav-badge">4</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-section="achievements">
                                <div class="nav-icon">🏆</div>
                                <span class="nav-text">Logros</span>
                                <span class="nav-badge">8</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-section="ai-tutor">
                                <div class="nav-icon">🤖</div>
                                <span class="nav-text">AI Tutor</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="sidebar-footer">
                <div class="footer-text">v1.0.0</div>
            </div>
        `;
    }

    setupEventListeners() {
        const toggleBtn = this.shadowRoot.querySelector('.sidebar-toggle');
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');

        toggleBtn.addEventListener('click', () => {
            this.toggleCollapse();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.handleNavigation(section);
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

        this.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: this.isCollapsed },
            bubbles: true,
            composed: true
        }));
    }

    handleNavigation(section) {
        // Remove active class from all links
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to clicked link
        const activeLink = this.shadowRoot.querySelector(`[data-section="${section}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.dispatchEvent(new CustomEvent('navigation', {
            detail: { section },
            bubbles: true,
            composed: true
        }));
    }

    collapse() {
        if (!this.isCollapsed) {
            this.toggleCollapse();
        }
    }

    expand() {
        if (this.isCollapsed) {
            this.toggleCollapse();
        }
    }
}

customElements.define('dashboard-sidebar', DashboardSidebar); 