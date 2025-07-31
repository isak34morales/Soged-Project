class DashboardHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.showProfileMenu = false;
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
                    width: 100%;
                    background: #1a1a1a;
                    border-bottom: 4px solid #28A745;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    flex-shrink: 0;
                    margin: 0;
                    box-sizing: border-box;
                    font-family: 'Courier New', monospace;
                }

                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    width: 100%;
                    box-sizing: border-box;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .header-center {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .stats-container {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #333;
                    border: 2px solid #28A745;
                    color: #FFD600;
                    font-weight: bold;
                    font-size: 0.8rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    min-width: 100px;
                    justify-content: center;
                }

                .stat-item:hover {
                    background: #28A745;
                    color: #1a1a1a;
                    border-color: #FFD600;
                    transform: scale(1.05);
                }

                .stat-item i {
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .stat-value {
                    font-weight: bold;
                    font-size: 0.9rem;
                }

                .stat-label {
                    font-size: 0.7rem;
                    opacity: 0.8;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .theme-toggle {
                    width: 40px;
                    height: 40px;
                    background: #FFD600;
                    border: 2px solid #FF6B35;
                    color: #1a1a1a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.2rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }

                .theme-toggle:hover {
                    background: #FF6B35;
                    color: #1a1a1a;
                    transform: scale(1.1);
                }

                .notifications {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    background: #FF6B35;
                    border: 2px solid #FFD600;
                    color: #1a1a1a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.2rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }

                .notifications:hover {
                    background: #28A745;
                    color: #1a1a1a;
                    transform: scale(1.1);
                }

                .notification-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #FFD600;
                    color: #1a1a1a;
                    border: 2px solid #FF6B35;
                    border-radius: 0;
                    padding: 0.2rem 0.4rem;
                    font-size: 0.7rem;
                    font-weight: bold;
                    min-width: 20px;
                    text-align: center;
                }

                .profile-container {
                    position: relative;
                }

                .profile-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #333;
                    border: 2px solid #28A745;
                    color: #FFD600;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }

                .profile-button:hover {
                    background: #28A745;
                    color: #1a1a1a;
                    border-color: #FFD600;
                }

                .profile-avatar {
                    width: 32px;
                    height: 32px;
                    background: #FFD600;
                    border: 2px solid #FF6B35;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #1a1a1a;
                    font-size: 0.8rem;
                }

                .profile-name {
                    font-weight: bold;
                }

                .profile-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: #1a1a1a;
                    border: 3px solid #28A745;
                    min-width: 200px;
                    z-index: 1000;
                    margin-top: 0.5rem;
                    display: none;
                }

                .profile-menu.show {
                    display: block;
                }

                .profile-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    color: #FFD600;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid #333;
                }

                .profile-menu-item:last-child {
                    border-bottom: none;
                }

                .profile-menu-item:hover {
                    background: #28A745;
                    color: #1a1a1a;
                }

                .profile-menu-item i {
                    width: 20px;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .header-container {
                        padding: 1rem;
                    }

                    .stats-container {
                        gap: 0.5rem;
                    }

                    .stat-item {
                        min-width: 80px;
                        padding: 0.4rem 0.8rem;
                        font-size: 0.7rem;
                    }

                    .stat-label {
                        display: none;
                    }
                }
            </style>

            <div class="header-container">
                <div class="header-left">
                    <div class="stats-container">
                        <div class="stat-item" data-stat="lives">
                            <i class="fas fa-heart"></i>
                            <span class="stat-value">5</span>
                            <span class="stat-label">Vidas</span>
                        </div>
                        <div class="stat-item" data-stat="points">
                            <i class="fas fa-star"></i>
                            <span class="stat-value">1,250</span>
                            <span class="stat-label">Puntos</span>
                        </div>
                        <div class="stat-item" data-stat="achievements">
                            <i class="fas fa-trophy"></i>
                            <span class="stat-value">8</span>
                            <span class="stat-label">Logros</span>
                        </div>
                        <div class="stat-item" data-stat="streak">
                            <i class="fas fa-fire"></i>
                            <span class="stat-value">7</span>
                            <span class="stat-label">Racha</span>
                        </div>
                    </div>
                </div>

                <div class="header-center">
                    <!-- Center content if needed -->
                </div>

                <div class="header-right">
                    <button class="theme-toggle" title="Cambiar Tema">
                        <i class="fas fa-moon"></i>
                    </button>
                    
                    <div class="notifications" title="Notificaciones">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>

                    <div class="profile-container">
                        <button class="profile-button" id="profileButton">
                            <div class="profile-avatar">MS</div>
                            <span class="profile-name">Maria Santos</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        
                        <div class="profile-menu" id="profileMenu">
                            <a href="#" class="profile-menu-item" data-section="profile">
                                <i class="fas fa-user"></i>
                                <span>Perfil</span>
                            </a>
                            <a href="#" class="profile-menu-item" data-section="settings">
                                <i class="fas fa-cog"></i>
                                <span>Configuración</span>
                            </a>
                            <a href="#" class="profile-menu-item" id="logoutBtn">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Cerrar Sesión</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const profileButton = this.shadowRoot.getElementById('profileButton');
        const profileMenu = this.shadowRoot.getElementById('profileMenu');
        const logoutBtn = this.shadowRoot.getElementById('logoutBtn');
        const themeToggle = this.shadowRoot.querySelector('.theme-toggle');
        const notifications = this.shadowRoot.querySelector('.notifications');
        const statItems = this.shadowRoot.querySelectorAll('.stat-item');

        // Profile menu toggle
        profileButton.addEventListener('click', () => {
            this.showProfileMenu = !this.showProfileMenu;
            if (this.showProfileMenu) {
                profileMenu.classList.add('show');
            } else {
                profileMenu.classList.remove('show');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.shadowRoot.contains(e.target)) {
                this.showProfileMenu = false;
                profileMenu.classList.remove('show');
            }
        });

        // Profile menu items
        profileMenu.addEventListener('click', (e) => {
            if (e.target.closest('.profile-menu-item')) {
                const menuItem = e.target.closest('.profile-menu-item');
                const section = menuItem.getAttribute('data-section');
                
                if (section) {
                    this.dispatchEvent(new CustomEvent('navigation', {
                        detail: { section },
                        bubbles: true,
                        composed: true
                    }));
                }
                
                this.showProfileMenu = false;
                profileMenu.classList.remove('show');
            }
        });

        // Logout
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('logout', {
                bubbles: true,
                composed: true
            }));
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('themeToggle', {
                bubbles: true,
                composed: true
            }));
        });

        // Notifications
        notifications.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('notifications', {
                bubbles: true,
                composed: true
            }));
        });

        // Stats click
        statItems.forEach(item => {
            item.addEventListener('click', () => {
                const statType = item.getAttribute('data-stat');
                this.dispatchEvent(new CustomEvent('statClick', {
                    detail: { statType },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    updateStats(stats) {
        if (stats.lives !== undefined) {
            const livesStat = this.shadowRoot.querySelector('[data-stat="lives"] .stat-value');
            if (livesStat) livesStat.textContent = stats.lives;
        }
        
        if (stats.points !== undefined) {
            const pointsStat = this.shadowRoot.querySelector('[data-stat="points"] .stat-value');
            if (pointsStat) pointsStat.textContent = stats.points;
        }
        
        if (stats.achievements !== undefined) {
            const achievementsStat = this.shadowRoot.querySelector('[data-stat="achievements"] .stat-value');
            if (achievementsStat) achievementsStat.textContent = stats.achievements;
        }
        
        if (stats.streak !== undefined) {
            const streakStat = this.shadowRoot.querySelector('[data-stat="streak"] .stat-value');
            if (streakStat) streakStat.textContent = stats.streak;
        }
    }

    updateNotifications(count) {
        const badge = this.shadowRoot.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }
}

customElements.define('dashboard-header', DashboardHeader); 