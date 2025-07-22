class CourseSidebar extends HTMLElement {
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
        const courseName = this.getAttribute('course-name') || 'Idioma';
        const currentSection = this.getAttribute('current-section') || 'overview';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    left: 0;
                    top: 0;
                    height: 100vh;
                    width: var(--sidebar-width, 280px);
                    background: linear-gradient(180deg, #ffffff 0%, #F1F5F9 100%);
                    color: #1E293B;
                    z-index: 1000;
                    transition: width 0.3s ease;
                    box-shadow: 2px 0 20px rgba(0,0,0,0.1);
                    overflow: hidden;
                    border-right: 1px solid rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(20px);
                }

                :host(.collapsed) {
                    width: var(--sidebar-collapsed-width, 80px);
                }

                .sidebar-header {
                    padding: 30px 20px 20px 20px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    text-align: center;
                    position: relative;
                    background: rgba(0, 163, 224, 0.1);
                    min-height: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                }

                .toggle-btn {
                    position: absolute;
                    top: 25px;
                    right: 20px;
                    background: rgba(0, 163, 224, 0.2);
                    border: none;
                    color: #00A3E0;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(0, 163, 224, 0.3);
                }

                .toggle-btn:hover {
                    background: rgba(0, 163, 224, 0.3);
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(0, 163, 224, 0.4);
                }

                .sidebar-language {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #00A3E0;
                    margin-top: 40px;
                    margin-bottom: 0;
                    letter-spacing: 0.5px;
                    text-align: center;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                :host(.collapsed) .sidebar-language {
                    font-size: 1.1rem;
                    margin-top: 40px;
                    margin-bottom: 0;
                }

                .nav-menu {
                    padding: 20px 0 20px 0;
                    list-style: none;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    max-height: calc(100vh - 120px);
                    overflow-y: auto;
                    scrollbar-width: thin;
                }

                .nav-item {
                    margin: 0;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 16px 18px;
                    color: rgba(30, 41, 59, 0.8);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border-left: 4px solid transparent;
                    position: relative;
                    font-weight: 600;
                    font-size: 15px;
                    margin: 0 10px;
                    border-radius: 12px;
                    min-height: 48px;
                }

                :host(.collapsed) .nav-link {
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: center;
                    background: none !important;
                    border-left: none !important;
                    box-shadow: none !important;
                }

                .nav-link:hover {
                    background: rgba(0, 163, 224, 0.15);
                    border-left-color: #00A3E0;
                    color: #1E293B;
                    transform: translateX(5px);
                }

                :host(.collapsed) .nav-link:hover,
                :host(.collapsed) .nav-link.active {
                    background: none !important;
                    border-left: none !important;
                    box-shadow: none !important;
                    color: #00A3E0;
                }

                .nav-link.active {
                    background: linear-gradient(135deg, rgba(0, 163, 224, 0.2), rgba(0, 136, 199, 0.1));
                    border-left-color: #00A3E0;
                    color: #1E293B;
                    box-shadow: 0 4px 15px rgba(0, 163, 224, 0.2);
                }

                .nav-icon {
                    width: 28px;
                    margin-right: 18px;
                    text-align: center;
                    font-size: 22px;
                    transition: all 0.3s ease;
                    color: #00A3E0;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :host(.collapsed) .nav-icon {
                    margin-right: 0;
                    margin-left: 0;
                    width: 28px;
                    justify-content: center;
                }

                .nav-link:hover .nav-icon,
                .nav-link.active .nav-icon {
                    color: #00A3E0;
                    transform: scale(1.1);
                }

                .nav-text {
                    flex: 1;
                    transition: opacity 0.3s ease;
                }

                :host(.collapsed) .nav-text {
                    opacity: 0;
                }

                .nav-badge {
                    background: #FF6B35;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 700;
                    margin-left: 10px;
                    transition: opacity 0.3s ease;
                }

                :host(.collapsed) .nav-badge {
                    opacity: 0;
                }

                /* Progress indicator */
                .progress-indicator {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #00A3E0;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .nav-link.active .progress-indicator {
                    opacity: 1;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: translateY(-50%) scale(1); opacity: 1; }
                    50% { transform: translateY(-50%) scale(1.2); opacity: 0.7; }
                    100% { transform: translateY(-50%) scale(1); opacity: 1; }
                }

                /* Hover effects */
                .nav-link::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 0;
                    background: linear-gradient(90deg, rgba(0, 163, 224, 0.1), transparent);
                    transition: width 0.3s ease;
                }

                .nav-link:hover::before {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    :host {
                        width: 100%;
                        transform: translateX(-100%);
                    }

                    :host(.open) {
                        transform: translateX(0);
                    }

                    :host(.collapsed) {
                        width: 100%;
                        transform: translateX(-100%);
                    }

                    .sidebar-header {
                        min-height: 60px;
                        padding: 20px 10px 10px 10px;
                    }

                    .sidebar-language {
                        font-size: 1rem;
                        margin-top: 30px;
                    }

                    .nav-link {
                        min-height: 44px;
                        font-size: 14px;
                        padding: 12px 8px;
                    }
                }
            </style>

            <div class="sidebar-header">
                <button class="toggle-btn" id="toggleBtn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                </button>
                <div class="sidebar-language" id="sidebarLanguage"></div>
            </div>

            <nav class="nav-menu">
                <div class="nav-item">
                    <a href="#overview" class="nav-link ${currentSection === 'overview' ? 'active' : ''}" data-section="overview">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Overview</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#chat" class="nav-link ${currentSection === 'chat' ? 'active' : ''}" data-section="chat">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Chat AI</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#daily-speaking" class="nav-link ${currentSection === 'daily-speaking' ? 'active' : ''}" data-section="daily-speaking">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M9 9v6l5-3-5-3z" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M15 9v6" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Daily Speaking</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#learn" class="nav-link ${currentSection === 'learn' ? 'active' : ''}" data-section="learn">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M6 12v6c3 3 9 3 12 0v-6" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Learn</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#stories" class="nav-link ${currentSection === 'stories' ? 'active' : ''}" data-section="stories">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Stories</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#music" class="nav-link ${currentSection === 'music' ? 'active' : ''}" data-section="music">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" fill="none"/>
                            <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                            <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Music</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#ranking" class="nav-link ${currentSection === 'ranking' ? 'active' : ''}" data-section="ranking">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M14 9h1.5a2.5 2.5 0 0 0 0-5H14" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M4 22v-7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v7" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M14 22v-7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v7" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Ranking</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#player" class="nav-link ${currentSection === 'player' ? 'active' : ''}" data-section="player">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                            <path d="M20 21C20 16.58 16.42 13 12 13s-8 3.58-8 8" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Player</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
                
                <div class="nav-item">
                    <a href="#store" class="nav-link ${currentSection === 'store' ? 'active' : ''}" data-section="store">
                        <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" stroke-width="2" fill="none"/>
                            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
                            <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        <span class="nav-text">Store</span>
                        <div class="progress-indicator"></div>
                    </a>
                </div>
            </nav>
        `;

        // Después de renderizar el HTML, actualiza el nombre del idioma
        setTimeout(() => {
            const langDiv = this.shadowRoot.getElementById('sidebarLanguage');
            if (langDiv) langDiv.textContent = courseName;
        }, 0);
    }

    setupEventListeners() {
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        const toggleBtn = this.shadowRoot.querySelector('#toggleBtn');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.dispatchEvent(new CustomEvent('sectionChange', {
                    detail: { section },
                    bubbles: true
                }));
            });
        });

        toggleBtn.addEventListener('click', () => {
            this.toggleCollapse();
        });
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.classList.add('collapsed');
            this.shadowRoot.querySelector('#toggleBtn svg').innerHTML = `
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/>
            `;
        } else {
            this.classList.remove('collapsed');
            this.shadowRoot.querySelector('#toggleBtn svg').innerHTML = `
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
            `;
        }

        // Dispatch event to update main content
        this.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: this.isCollapsed },
            bubbles: true
        }));
    }

    open() {
        this.classList.add('open');
    }

    close() {
        this.classList.remove('open');
    }
}

customElements.define('course-sidebar', CourseSidebar); 