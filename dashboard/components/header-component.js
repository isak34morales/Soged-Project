class DashboardHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    flex-shrink: 0;
                    margin: 0;
                    box-sizing: border-box;
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
                    gap: 1.5rem;
                    align-items: center;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.7rem 1rem;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    min-width: 120px;
                    justify-content: center;
                }

                .stat-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s ease;
                }

                .stat-item:hover::before {
                    left: 100%;
                }

                .stat-item:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    background: rgba(255, 255, 255, 0.95);
                }

                .stat-item i {
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .stat-item:hover i {
                    transform: scale(1.1);
                }

                .stat-item:nth-child(1) i {
                    color: #ff4757;
                }

                .stat-item:nth-child(2) i {
                    color: #ffa502;
                }

                .stat-item:nth-child(3) i {
                    color: #2ed573;
                }

                .stat-item:nth-child(4) i {
                    color: #3742fa;
                }

                .stat-value {
                    font-weight: 800;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .stat-item:hover .stat-value {
                    transform: scale(1.05);
                    color: #4A90E2;
                }

                .stat-label {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .stat-item:hover .stat-label {
                    color: #4A90E2;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .notifications {
                    position: relative;
                    padding: 0.8rem;
                    cursor: pointer;
                    border-radius: 50%;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .notifications:hover {
                    background: rgba(74, 144, 226, 0.2);
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
                }

                .notifications i {
                    font-size: 1.4rem;
                    color: #7f8c8d;
                    transition: all 0.3s ease;
                }

                .notifications:hover i {
                    color: #4A90E2;
                    transform: scale(1.1);
                }

                .notification-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: linear-gradient(135deg, #ff4757, #ff3742);
                    color: white;
                    font-size: 0.7rem;
                    padding: 0.3rem 0.5rem;
                    border-radius: 12px;
                    font-weight: 700;
                    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .user-dropdown {
                    position: relative;
                }

                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.5rem 1rem;
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .user-menu:hover {
                    background: rgba(74, 144, 226, 0.1);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 163, 224, 0.2);
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid #4A90E2;
                    box-shadow: 0 2px 8px rgba(0, 163, 224, 0.3);
                }

                .user-name {
                    font-weight: 600;
                    color: #2c3e50;
                }

                .dropdown-arrow {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                    transition: transform 0.3s ease;
                }

                .user-dropdown.active .dropdown-arrow {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 280px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 1rem 0;
                    margin-top: 0.5rem;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    z-index: 1000;
                }

                .user-dropdown.active .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .dropdown-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 3px solid #4A90E2;
                    box-shadow: 0 2px 8px rgba(0, 163, 224, 0.3);
                }

                .dropdown-user-info h4 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #2c3e50;
                    margin: 0;
                }

                .dropdown-user-info span {
                    font-size: 0.9rem;
                    color: #7f8c8d;
                    font-weight: 500;
                }

                .dropdown-divider {
                    height: 1px;
                    background: rgba(0, 0, 0, 0.1);
                    margin: 0.5rem 0;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    color: #2c3e50;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .dropdown-item:hover {
                    background: rgba(74, 144, 226, 0.1);
                    color: #4A90E2;
                    transform: translateX(5px);
                }

                .dropdown-item i {
                    width: 20px;
                    text-align: center;
                    font-size: 1rem;
                }

                .dropdown-item[data-action="logout"] {
                    color: #ff4757;
                }

                .dropdown-item[data-action="logout"]:hover {
                    background: rgba(255, 71, 87, 0.1);
                    color: #ff4757;
                }

                /* Modal Styles */
                .courses-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .courses-modal.active {
                    opacity: 1;
                    visibility: visible;
                }

                .modal-content {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }

                .courses-modal.active .modal-content {
                    transform: scale(1);
                }

                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .modal-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2c3e50;
                    margin: 0;
                }

                .close-modal {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #7f8c8d;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .close-modal:hover {
                    background: rgba(0, 0, 0, 0.1);
                    color: #2c3e50;
                }

                .languages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .language-card {
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }

                .language-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.1), transparent);
                    transition: left 0.5s ease;
                }

                .language-card:hover::before {
                    left: 100%;
                }

                .language-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.2);
                    border-color: #4A90E2;
                }

                .language-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: white;
                }

                .language-card:nth-child(1) .language-icon {
                    background: linear-gradient(135deg, #00A3E0, #0088C7);
                }

                .language-card:nth-child(2) .language-icon {
                    background: linear-gradient(135deg, #FF6B35, #FF8A65);
                }

                .language-card:nth-child(3) .language-icon {
                    background: linear-gradient(135deg, #2ECC71, #27AE60);
                }

                .language-card:nth-child(4) .language-icon {
                    background: linear-gradient(135deg, #FFD23F, #FFA726);
                }

                .language-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .language-description {
                    font-size: 0.9rem;
                    color: #7f8c8d;
                    margin-bottom: 1rem;
                }

                .language-stats {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: #7f8c8d;
                }

                .language-stats span {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }

                /* Dark theme support for modal */
                [data-theme="dark"] .modal-content {
                    background: rgba(30, 41, 59, 0.95);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .modal-title {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .language-card {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .language-card:hover {
                    background: rgba(30, 41, 59, 0.9);
                    border-color: #4A90E2;
                }

                [data-theme="dark"] .language-name {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .language-description,
                [data-theme="dark"] .language-stats {
                    color: #bdc3c7;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .header-container {
                        padding: 1rem;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .stats-container {
                        gap: 0.8rem;
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .stat-item {
                        min-width: 100px;
                        padding: 0.6rem 0.8rem;
                    }

                    .user-name {
                        display: none;
                    }

                    .dropdown-menu {
                        width: 250px;
                        right: -50px;
                    }

                    .dropdown-header {
                        padding: 0.8rem 1rem;
                    }

                    .dropdown-item {
                        padding: 0.8rem 1rem;
                    }

                    .modal-content {
                        padding: 1.5rem;
                        margin: 1rem;
                    }

                    .languages-grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* Dark theme support */
                [data-theme="dark"] :host {
                    background: rgba(30, 30, 46, 0.9);
                    border-bottom-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .dashboard-title {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .stat-item {
                    background: rgba(30, 30, 46, 0.8);
                }

                [data-theme="dark"] .user-menu:hover,
                [data-theme="dark"] .notifications:hover {
                    background: rgba(74, 144, 226, 0.2);
                }

                [data-theme="dark"] .stat-item {
                    background: rgba(30, 41, 59, 0.9);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .stat-item:hover {
                    background: rgba(30, 41, 59, 0.95);
                    box-shadow: 0 8px 25px rgba(0, 163, 224, 0.2);
                }

                [data-theme="dark"] .stat-item::before {
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                }

                [data-theme="dark"] .notifications {
                    background: rgba(30, 41, 59, 0.1);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .notifications:hover {
                    background: rgba(74, 144, 226, 0.3);
                }

                [data-theme="dark"] .dropdown-menu {
                    background: rgba(30, 41, 59, 0.95);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .dropdown-user-info h4 {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .dropdown-user-info span {
                    color: #bdc3c7;
                }

                [data-theme="dark"] .dropdown-item {
                    color: #ecf0f1;
                }

                [data-theme="dark"] .dropdown-item:hover {
                    background: rgba(74, 144, 226, 0.2);
                }

                [data-theme="dark"] .dropdown-divider {
                    background: rgba(255, 255, 255, 0.1);
                }
            </style>

            <div class="header-container">
                <div class="header-center">
                    <div class="stats-container">
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span class="stat-value">5</span>
                            <span class="stat-label">Lives</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span class="stat-value">1,250</span>
                            <span class="stat-label">Points</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span class="stat-value">8</span>
                            <span class="stat-label">Achievements</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-fire"></i>
                            <span class="stat-value">7</span>
                            <span class="stat-label">Streak</span>
                        </div>
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                    <div class="user-dropdown">
                        <div class="user-menu" id="userMenuBtn">
                            <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=4A90E2&color=fff&size=40&font-size=0.4" alt="User" class="user-avatar">
                            <span class="user-name">Maria Santos</span>
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        <div class="dropdown-menu" id="userDropdown">
                            <div class="dropdown-header">
                                <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=4A90E2&color=fff&size=50&font-size=0.4" alt="User" class="dropdown-avatar">
                                <div class="dropdown-user-info">
                                    <h4>Maria Santos</h4>
                                    <span>Advanced Student</span>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item" data-action="courses">
                                <i class="fas fa-graduation-cap"></i>
                                <span>Courses</span>
                            </a>
                            <a href="#" class="dropdown-item" data-action="profile">
                                <i class="fas fa-user"></i>
                                <span>My Profile</span>
                            </a>
                            <a href="#" class="dropdown-item" data-action="settings">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </a>
                            <a href="#" class="dropdown-item" data-action="help">
                                <i class="fas fa-question-circle"></i>
                                <span>Help</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item" data-action="logout" id="logoutBtn">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Courses Modal -->
            <div class="courses-modal" id="coursesModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Choose Your Language</h2>
                        <button class="close-modal" id="closeModal">&times;</button>
                    </div>
                    <div class="languages-grid">
                        <div class="language-card" data-language="ngabe">
                            <div class="language-icon">🌿</div>
                            <div class="language-name">Ngäbe</div>
                            <div class="language-description">Learn the language of the Ngäbe people, the largest indigenous group in Panama.</div>
                            <div class="language-stats">
                                <span><i class="fas fa-book"></i> 150 Lessons</span>
                                <span><i class="fas fa-star"></i> Beginner</span>
                            </div>
                        </div>
                        <div class="language-card" data-language="naso">
                            <div class="language-icon">🥁</div>
                            <div class="language-name">Naso</div>
                            <div class="language-description">Discover the musical language of the Naso people with its unique rhythms.</div>
                            <div class="language-stats">
                                <span><i class="fas fa-book"></i> 120 Lessons</span>
                                <span><i class="fas fa-star"></i> Intermediate</span>
                            </div>
                        </div>
                        <div class="language-card" data-language="guna">
                            <div class="language-icon">🏔️</div>
                            <div class="language-name">Guna</div>
                            <div class="language-description">Master the language of the Guna people from the beautiful San Blas Islands.</div>
                            <div class="language-stats">
                                <span><i class="fas fa-book"></i> 200 Lessons</span>
                                <span><i class="fas fa-star"></i> Advanced</span>
                            </div>
                        </div>
                        <div class="language-card" data-language="embera">
                            <div class="language-icon">🌱</div>
                            <div class="language-name">Emberá</div>
                            <div class="language-description">Explore the ancient language of the Emberá people and their traditions.</div>
                            <div class="language-stats">
                                <span><i class="fas fa-book"></i> 180 Lessons</span>
                                <span><i class="fas fa-star"></i> Expert</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Switch decorativo igual al del index
        const themeSwitch = document.createElement('div');
        themeSwitch.innerHTML = `
  <div class="theme-toggle" style="display:inline-block; margin-right:1.5rem;">
    <input type="checkbox" id="dashboard-theme-switch" class="theme-switch-input" disabled style="display:none;">
    <label for="dashboard-theme-switch" class="theme-switch" style="width: 65px; height: 35px; background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%); border-radius: 20px; position: relative; cursor: not-allowed; display: flex; align-items: center; padding: 0 8px; border: 2px solid #e2e8f0; overflow: hidden; opacity: 0.7;">
      <i class="fas fa-sun" style="color: #FFD600; opacity: 1; margin-left: 2px; z-index: 2; font-size: 1.2rem; position: relative;"></i>
      <span style="width: 27px; height: 27px; background: linear-gradient(135deg, #FFD600 0%, #FFB300 100%); border-radius: 50%; position: absolute; left: 4px; transition: 0.3s; box-shadow: 0 2px 8px #FFD60033; z-index: 1;"></span>
      <i class="fas fa-moon" style="color: #64748B; opacity: 0.7; margin-left: auto; margin-right: 2px; z-index: 2; font-size: 1.2rem; position: relative;"></i>
    </label>
  </div>
`;
        this.shadowRoot.querySelector('.header-right').prepend(themeSwitch);

        const themeInput = this.shadowRoot.getElementById('dashboard-theme-switch');
        if (themeInput) {
            themeInput.addEventListener('change', () => {
                const html = document.documentElement;
                const isDark = themeInput.checked;
                html.setAttribute('data-theme', isDark ? 'dark' : 'light');
                localStorage.setItem('dashboard_theme', isDark ? 'dark' : 'light');
            });
            // Set initial state from localStorage
            const savedTheme = localStorage.getItem('dashboard_theme');
            if (savedTheme === 'dark') {
                themeInput.checked = true;
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    }

    setupEventListeners() {
        const userMenuBtn = this.shadowRoot.getElementById('userMenuBtn');
        const userDropdown = this.shadowRoot.getElementById('userDropdown');
        const notifications = this.shadowRoot.querySelector('.notifications');
        const dropdownItems = this.shadowRoot.querySelectorAll('.dropdown-item');
        const coursesModal = this.shadowRoot.getElementById('coursesModal');
        const closeModal = this.shadowRoot.getElementById('closeModal');
        const languageCards = this.shadowRoot.querySelectorAll('.language-card');

        // Toggle dropdown
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const userDropdownContainer = this.shadowRoot.querySelector('.user-dropdown');
            userDropdownContainer.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.shadowRoot.contains(e.target)) {
                const userDropdownContainer = this.shadowRoot.querySelector('.user-dropdown');
                userDropdownContainer.classList.remove('active');
            }
        });

        // Handle dropdown item clicks
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const action = item.getAttribute('data-action');
                
                // Close dropdown
                const userDropdownContainer = this.shadowRoot.querySelector('.user-dropdown');
                userDropdownContainer.classList.remove('active');
                
                // Handle courses action
                if (action === 'courses') {
                    coursesModal.classList.add('active');
                    return;
                }
                
                // Dispatch event based on action
                switch (action) {
                    case 'logout':
                        this.dispatchEvent(new CustomEvent('logout'));
                        break;
                    case 'profile':
                        this.dispatchEvent(new CustomEvent('profile'));
                        break;
                    case 'settings':
                        this.dispatchEvent(new CustomEvent('settings'));
                        break;
                    case 'help':
                        this.dispatchEvent(new CustomEvent('help'));
                        break;
                }
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            coursesModal.classList.remove('active');
        });

        // Close modal when clicking outside
        coursesModal.addEventListener('click', (e) => {
            if (e.target === coursesModal) {
                coursesModal.classList.remove('active');
            }
        });

        // Handle language selection
        languageCards.forEach(card => {
            card.addEventListener('click', () => {
                const language = card.getAttribute('data-language');
                coursesModal.classList.remove('active');
                
                // Dispatch event with selected language
                this.dispatchEvent(new CustomEvent('languageSelected', {
                    detail: { language }
                }));
            });
        });

        notifications.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('notifications'));
        });

        // Add event listeners for stat items
        const statItems = this.shadowRoot.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const statTypes = ['lives', 'points', 'achievements'];
                this.dispatchEvent(new CustomEvent('statClick', {
                    detail: { type: statTypes[index] }
                }));
            });
        });
    }

    // Public methods
    updateStats(stats) {
        const statElements = this.shadowRoot.querySelectorAll('.stat-value');
        if (stats.lives !== undefined) statElements[0].textContent = stats.lives;
        if (stats.points !== undefined) statElements[1].textContent = stats.points;
        if (stats.achievements !== undefined) statElements[2].textContent = stats.achievements;
    }

    updateNotifications(count) {
        const badge = this.shadowRoot.querySelector('.notification-badge');
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

customElements.define('dashboard-header', DashboardHeader); 