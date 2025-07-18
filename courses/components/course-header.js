class CourseHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['course-name', 'course-description', 'course-icon', 'streak', 'level', 'xp'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const courseName = this.getAttribute('course-name') || 'Curso';
        const courseDescription = this.getAttribute('course-description') || 'Lengua indígena de Panamá';
        const courseIcon = this.getAttribute('course-icon') || 'fas fa-leaf';
        const streak = this.getAttribute('streak') || '0';
        const level = this.getAttribute('level') || '1';
        const xp = this.getAttribute('xp') || '0';

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .header-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .back-button a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    background: rgba(74, 144, 226, 0.1);
                    border-radius: 50%;
                    color: #4A90E2;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1.2rem;
                }

                .back-button a:hover {
                    background: #4A90E2;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .course-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .course-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .course-details h1 {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #2c3e50;
                    margin-bottom: 0.2rem;
                }

                .course-details p {
                    color: #666;
                    font-size: 1rem;
                }

                .header-center {
                    display: flex;
                    align-items: center;
                }

                .progress-stats {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #666;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .stat-item i {
                    color: #4A90E2;
                    font-size: 1rem;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                }

                .user-menu {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #4A90E2;
                }

                .user-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .dropdown-toggle {
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .dropdown-toggle:hover {
                    background: rgba(0, 0, 0, 0.1);
                    color: #333;
                }

                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 1rem;
                    min-width: 200px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .dropdown-menu.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown-menu a {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1rem;
                    color: #666;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }

                .dropdown-menu a:hover {
                    background: rgba(74, 144, 226, 0.1);
                    color: #4A90E2;
                }

                .dropdown-divider {
                    height: 1px;
                    background: rgba(0, 0, 0, 0.1);
                    margin: 0.5rem 0;
                }

                @media (max-width: 768px) {
                    .header-content {
                        padding: 1rem;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .progress-stats {
                        gap: 1rem;
                    }

                    .course-details h1 {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .progress-stats {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .stat-item {
                        font-size: 0.8rem;
                    }
                }
            </style>

            <header class="header">
                <div class="header-content">
                    <div class="header-left">
                        <div class="back-button">
                            <a href="../dashboard/dashboard-new.html">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                        
                        <div class="course-info">
                            <div class="course-icon">
                                <i class="${courseIcon}"></i>
                            </div>
                            <div class="course-details">
                                <h1>${courseName}</h1>
                                <p>${courseDescription}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="header-center">
                        <div class="progress-stats">
                            <div class="stat-item">
                                <i class="fas fa-fire"></i>
                                <span>${streak} días</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-star"></i>
                                <span>Nivel ${level}</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-coins"></i>
                                <span>${xp} XP</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="header-right">
                        <div class="user-menu">
                            <div class="user-avatar">
                                <img src="../img/avatar.jpg" alt="Usuario" onerror="this.src='https://via.placeholder.com/40x40/4A90E2/FFFFFF?text=U'">
                            </div>
                            <div class="user-dropdown">
                                <button class="dropdown-toggle">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="../dashboard/dashboard-new.html">
                                        <i class="fas fa-home"></i>
                                        Dashboard
                                    </a>
                                    <a href="../dashboard/dashboard-new.html#profile">
                                        <i class="fas fa-user"></i>
                                        Perfil
                                    </a>
                                    <a href="../dashboard/dashboard-new.html#settings">
                                        <i class="fas fa-cog"></i>
                                        Configuración
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a href="../index.html">
                                        <i class="fas fa-sign-out-alt"></i>
                                        Cerrar Sesión
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    setupEventListeners() {
        const dropdownToggle = this.shadowRoot.querySelector('.dropdown-toggle');
        const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', () => {
                dropdownMenu.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.shadowRoot.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });

            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    }

    // Public methods
    updateStats(streak, level, xp) {
        this.setAttribute('streak', streak);
        this.setAttribute('level', level);
        this.setAttribute('xp', xp);
    }

    updateCourseInfo(name, description, icon) {
        this.setAttribute('course-name', name);
        this.setAttribute('course-description', description);
        this.setAttribute('course-icon', icon);
    }
}

customElements.define('course-header', CourseHeader); 