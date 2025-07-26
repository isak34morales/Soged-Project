class DashboardApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentSection = 'overview';
        this.isSidebarCollapsed = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.loadSection('overview');
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                    font-family: 'Fredoka', sans-serif;
                }

                .dashboard-container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    overflow-x: hidden;
                    margin: 0;
                    padding: 0;
                }

                .sidebar-container {
                    flex-shrink: 0;
                    transition: width 0.3s ease;
                }

                .sidebar-container.collapsed {
                    width: 80px;
                }

                .sidebar-container:not(.collapsed) {
                    width: 320px;
                }

                .content-area {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    height: 100vh;
                    transition: all 0.3s ease;
                    margin: 0;
                    padding: 0;
                    width: calc(100% - 320px);
                    overflow-x: hidden;
                }

                .sidebar-container.collapsed + .content-area {
                    width: calc(100% - 80px);
                }

                .main-content {
                    flex: 1;
                    min-height: 0;
                    height: 100%;
                    overflow-y: auto;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    max-height: calc(100vh - 80px - 60px);
                }

                .content-wrapper {
                    padding: 2rem;
                    width: 100%;
                    max-width: 100%;
                    margin: 0;
                    box-sizing: border-box;
                }

                .content-section {
                    display: none;
                    animation: fadeIn 0.3s ease;
                    width: 100%;
                    max-width: 100%;
                    margin: 0;
                    padding: 0;
                }

                .content-section.active {
                    display: block;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .dashboard-container {
                        position: relative;
                    }

                    .sidebar-container {
                        position: fixed;
                        left: 0;
                        top: 0;
                        z-index: 1000;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }

                    .sidebar-container.active {
                        transform: translateX(0);
                    }

                    .content-area {
                        margin-left: 0;
                        width: 100%;
                    }
                }

                /* Dark theme support */
                [data-theme="dark"] :host {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                }
            </style>

            <div class="dashboard-container">
                <div class="sidebar-container" id="sidebarContainer">
                    <dashboard-sidebar id="sidebar"></dashboard-sidebar>
                </div>
                
                <div class="content-area" id="contentArea">
                    <dashboard-header id="header"></dashboard-header>
                    
                    <main class="main-content" id="mainContent">
                        <div class="content-wrapper" id="contentWrapper">
                            <!-- Content sections will be loaded here -->
                        </div>
                    </main>
                    
                    <!-- Footer will be included in each section instead of being fixed -->
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const sidebar = this.shadowRoot.getElementById('sidebar');
        const header = this.shadowRoot.getElementById('header');

        // Sidebar events
        sidebar.addEventListener('sidebarToggle', (e) => {
            this.handleSidebarToggle(e.detail.collapsed);
        });

        sidebar.addEventListener('sectionChange', (e) => {
            this.loadSection(e.detail.section);
        });

        // Header events
        header.addEventListener('logout', () => {
            this.handleLogout();
        });

        header.addEventListener('notifications', () => {
            this.handleNotifications();
        });

        header.addEventListener('profile', () => {
            this.loadSection('profile');
        });

        header.addEventListener('settings', () => {
            this.loadSection('settings');
        });

        header.addEventListener('help', () => {
            this.handleHelp();
        });

        header.addEventListener('statClick', (e) => {
            this.handleStatClick(e.detail.type);
        });

        // Footer events will be handled by individual sections
    }

    handleSidebarToggle(collapsed) {
        this.isSidebarCollapsed = collapsed;
        const sidebarContainer = this.shadowRoot.getElementById('sidebarContainer');
        const contentArea = this.shadowRoot.getElementById('contentArea');

        if (collapsed) {
            sidebarContainer.classList.add('collapsed');
        } else {
            sidebarContainer.classList.remove('collapsed');
        }

        // Dispatch event for external components
        this.dispatchEvent(new CustomEvent('dashboardSidebarToggle', {
            detail: { collapsed }
        }));
    }

    loadSection(section) {
        this.currentSection = section;
        const contentWrapper = this.shadowRoot.getElementById('contentWrapper');
        
        // Clear current content
        contentWrapper.innerHTML = '';
        
        // Load section content
        const sectionContent = this.createSectionContent(section);
        contentWrapper.appendChild(sectionContent);

        // Dispatch event
        this.dispatchEvent(new CustomEvent('sectionLoaded', {
            detail: { section }
        }));
    }

    createSectionContent(section) {
        const container = document.createElement('div');
        container.className = 'content-section active';

        switch (section) {
            case 'overview':
                const overviewSection = document.createElement('overview-section');
                this.setupOverviewEvents(overviewSection);
                container.appendChild(overviewSection);
                break;
            case 'courses':
                const coursesSection = document.createElement('courses-section');
                this.setupCoursesEvents(coursesSection);
                container.appendChild(coursesSection);
                break;
            case 'achievements':
                const achievementsSection = document.createElement('achievements-section');
                this.setupAchievementsEvents(achievementsSection);
                container.appendChild(achievementsSection);
                break;
            case 'community':
                const communitySection = document.createElement('community-section');
                this.setupCommunityEvents(communitySection);
                container.appendChild(communitySection);
                break;
            case 'profile':
                const profileSection = document.createElement('profile-section');
                this.setupProfileEvents(profileSection);
                container.appendChild(profileSection);
                break;
            case 'settings':
                const settingsSection = document.createElement('settings-section');
                this.setupSettingsEvents(settingsSection);
                container.appendChild(settingsSection);
                break;
            default:
                const defaultOverviewSection = document.createElement('overview-section');
                this.setupOverviewEvents(defaultOverviewSection);
                container.appendChild(defaultOverviewSection);
        }

        return container;
    }

    getWelcomeContent() {
        return `
            <div class="welcome-section" style="background: #fffbe6; border-radius: 18px; box-shadow: 0 2px 12px #ffd60033; padding: 2rem 2.5rem; margin-bottom: 2.5rem;">
                <h2 style="color: #FFD600; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Welcome!</h2>
                <p style="font-size: 1.1rem; color: #333; margin-bottom: 0.7rem;">
                    Once you log in as a student, you will see your profile and your lesson progress.<br><br>
                    On the left side, you’ll find the Dashboard. This shows your class hours, days in progress, completed lessons, and your activity history.<br><br>
                    At the top of the screen, you can switch between dark and light mode or log out of your account.<br><br>
                    <span style="font-weight: 600; color: #888;">Nayeli/Isaac</span>
                </p>
            </div>
        `;
    }

    getOverviewContent() {
        return `
            <div class="section-header">
                <h2>Overview</h2>
                <p>Your overall progress and statistics</p>
            </div>
            
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <div class="progress-card">
                        <div class="card-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="card-content">
                            <h3>Total Progress</h3>
                            <div class="progress-circle">
                                <div class="progress-value">65%</div>
                            </div>
                            <p>All lessons completed</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="progress-card">
                        <div class="card-icon">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="card-content">
                            <h3>Current Streak</h3>
                            <div class="streak-value">12 days</div>
                            <p>Keep your streak!</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="progress-card">
                        <div class="card-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="card-content">
                            <h3>Achievements</h3>
                            <div class="achievements-count">8/15</div>
                            <p>Achievements unlocked</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="progress-card">
                        <div class="card-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="card-content">
                            <h3>Study Time</h3>
                            <div class="study-time">2h 30m</div>
                            <p>This week</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getCoursesContent() {
        return `
            <div class="section-header">
                <h2>Your Current Course</h2>
                <p>Continue your learning journey</p>
            </div>
            
            <div class="courses-grid">
                <div class="course-card current">
                    <div class="course-header">
                        <span class="course-icon">🌿</span>
                        <h3>Ngäbe</h3>
                        <span class="course-desc">Indigenous language of Panama</span>
                        <span class="status-badge">In Progress</span>
                    </div>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%"></div>
                        </div>
                        <span class="progress-text">75% completed</span>
                    </div>
                    <div class="course-stats">
                        <span>45/60 lessons</span>
                        <span>Level 3</span>
                    </div>
                    <button class="action-btn primary" style="position:absolute;top:50%;right:2.5rem;transform:translateY(-50%);">Continue</button>
                </div>
                
                <div class="course-card">
                    <div class="course-header">
                        <span class="course-icon">🥁</span>
                        <h3>Naso</h3>
                        <span class="course-desc">Indigenous language of Panama</span>
                        <span class="status-badge available">Available</span>
                    </div>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 45%"></div>
                        </div>
                        <span class="progress-text">45% completed</span>
                    </div>
                    <div class="course-stats">
                        <span>27/60 lessons</span>
                        <span>Level 2</span>
                    </div>
                </div>
                
                <div class="course-card">
                    <div class="course-header">
                        <span class="course-icon">🏔️</span>
                        <h3>Guna</h3>
                        <span class="course-desc">Indigenous language of Panama</span>
                        <span class="status-badge available">Available</span>
                    </div>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 30%"></div>
                        </div>
                        <span class="progress-text">30% completed</span>
                    </div>
                    <div class="course-stats">
                        <span>18/60 lessons</span>
                        <span>Level 1</span>
                    </div>
                </div>
            </div>
        `;
    }

    getAchievementsContent() {
        return `
            <div class="section-header">
                <h2>Achievements</h2>
                <p>Your accomplishments and rewards</p>
            </div>
            
            <div class="achievements-grid">
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <h3>7-Day Streak</h3>
                    <p>Complete 7 consecutive study days</p>
                    <span class="achievement-date">Unlocked 2 days ago</span>
                </div>
                
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3>First Course</h3>
                    <p>Complete your first language course</p>
                    <span class="achievement-date">Unlocked 1 week ago</span>
                </div>
                
                <div class="achievement-card locked">
                    <div class="achievement-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h3>Language Master</h3>
                    <p>Complete 5 different courses</p>
                    <span class="achievement-progress">3/5 courses completed</span>
                </div>
            </div>
        `;
    }

    getCommunityContent() {
        return `
            <div class="section-header">
                <h2>Community</h2>
                <p>Connect with other learners</p>
            </div>
            
            <div class="community-content">
                <div class="community-stats">
                    <div class="stat-card">
                        <h3>1,247</h3>
                        <p>Active learners</p>
                    </div>
                    <div class="stat-card">
                        <h3>89</h3>
                        <p>Study groups</p>
                    </div>
                    <div class="stat-card">
                        <h3>15</h3>
                        <p>Events this month</p>
                    </div>
                </div>
                
                <div class="recent-activity">
                    <h3>Recent Activity</h3>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-avatar">
                                <img src="https://ui-avatars.com/api/?name=Juan+Pérez&background=4A90E2&color=fff&size=40" alt="User">
                            </div>
                            <div class="activity-content">
                                <p><strong>Juan Pérez</strong> completed lesson 15 of Ngäbe</p>
                                <span class="activity-time">2 hours ago</span>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-avatar">
                                <img src="https://ui-avatars.com/api/?name=Ana+García&background=4A90E2&color=fff&size=40" alt="User">
                            </div>
                            <div class="activity-content">
                                <p><strong>Ana García</strong> joined the group "Naso Learners"</p>
                                <span class="activity-time">4 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfileContent() {
        return `
            <div class="section-header">
                <h2>Profile</h2>
                <p>Manage your personal information</p>
            </div>
            
            <div class="profile-content">
                <div class="profile-card">
                    <div class="profile-header">
                        <img src="https://ui-avatars.com/api/?name=María+Santos&background=4A90E2&color=fff&size=120" alt="Profile" class="profile-avatar">
                        <div class="profile-info">
                            <h3>Maria Santos</h3>
                            <p>Advanced Student</p>
                            <span class="member-since">Member since January 2024</span>
                        </div>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-number">65%</span>
                            <span class="stat-label">Total Progress</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Streak Days</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">8</span>
                            <span class="stat-label">Achievements</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSettingsContent() {
        return `
            <div class="section-header">
                <h2>Settings</h2>
                <p>Customize your experience</p>
            </div>
            
            <div class="settings-content">
                <div class="settings-section">
                    <h3>Preferences</h3>
                    <div class="setting-item">
                        <label>Notifications</label>
                        <input type="checkbox" checked>
                    </div>
                    <div class="setting-item">
                        <label>Sounds</label>
                        <input type="checkbox" checked>
                    </div>
                    <div class="setting-item">
                        <label>Dark Theme</label>
                        <input type="checkbox">
                    </div>
                </div>
                
                <div class="settings-section">
                    <h3>Privacy</h3>
                    <div class="setting-item">
                        <label>Public Profile</label>
                        <input type="checkbox" checked>
                    </div>
                    <div class="setting-item">
                        <label>Show Progress</label>
                        <input type="checkbox" checked>
                    </div>
                </div>
            </div>
        `;
    }

    handleLogout() {
        // Implementar lógica de logout
        console.log('Logout clicked');
    }

    handleNotifications() {
        // Implementar lógica de notificaciones
        console.log('Notifications clicked');
    }

    handleFooterLink(linkType) {
        // Implementar lógica de enlaces del footer
        console.log('Footer link clicked:', linkType);
    }

    handleHelp() {
        // Implementar lógica de ayuda
        console.log('Help clicked');
        // Aquí podrías mostrar un modal de ayuda o redirigir a una página de ayuda
        alert('¡Centro de Ayuda!\n\nAquí encontrarás:\n• Guías de uso\n• Preguntas frecuentes\n• Contacto de soporte\n• Tutoriales');
    }

    handleStatClick(statType) {
        // Implementar lógica para cada tipo de estadística
        console.log('Stat clicked:', statType);
        
        const messages = {
            lives: '¡Tienes 5 vidas disponibles!\n\nUsa tus vidas sabiamente para completar lecciones y ganar más.',
            points: '¡Has acumulado 1,250 puntos!\n\nLos puntos se ganan completando lecciones y manteniendo rachas.',
            achievements: '¡Has desbloqueado 8 logros!\n\nContinúa aprendiendo para desbloquear más logros.'
        };
        
        alert(messages[statType] || 'Estadística clickeada');
    }

    // Public methods
    updateStats(stats) {
        const header = this.shadowRoot.getElementById('header');
        header.updateStats(stats);
    }

    updateNotifications(count) {
        const header = this.shadowRoot.getElementById('header');
        header.updateNotifications(count);
    }

    collapseSidebar() {
        const sidebar = this.shadowRoot.getElementById('sidebar');
        sidebar.collapse();
    }

    expandSidebar() {
        const sidebar = this.shadowRoot.getElementById('sidebar');
        sidebar.expand();
    }

    // Event setup methods for sections
    setupOverviewEvents(overviewSection) {
        overviewSection.addEventListener('startLesson', (e) => {
            console.log('Starting lesson:', e.detail.lesson);
            // Handle lesson start
        });
    }

    setupCoursesEvents(coursesSection) {
        coursesSection.addEventListener('continueCourse', (e) => {
            console.log('Continuing course:', e.detail.course);
            // Handle course continuation
        });

        coursesSection.addEventListener('reviewCourse', (e) => {
            console.log('Reviewing course:', e.detail.course);
            // Handle course review
        });

        coursesSection.addEventListener('viewCertificate', (e) => {
            console.log('Viewing certificate for:', e.detail.course);
            // Handle certificate view
        });

        coursesSection.addEventListener('viewRequirements', (e) => {
            console.log('Viewing requirements for:', e.detail.course);
            // Handle requirements view
        });
    }

    setupAchievementsEvents(achievementsSection) {
        achievementsSection.addEventListener('achievementClicked', (e) => {
            console.log('Achievement clicked:', e.detail.achievement);
            // Handle achievement click
        });
    }

    setupCommunityEvents(communitySection) {
        communitySection.addEventListener('groupClicked', (e) => {
            console.log('Group clicked:', e.detail.group);
            // Handle group click
        });

        communitySection.addEventListener('eventClicked', (e) => {
            console.log('Event clicked:', e.detail.event);
            // Handle event click
        });
    }

    setupProfileEvents(profileSection) {
        profileSection.addEventListener('avatarChanged', (e) => {
            console.log('Avatar changed:', e.detail.avatar);
            // Handle avatar change
        });

        profileSection.addEventListener('avatarRemoved', () => {
            console.log('Avatar removed');
            // Handle avatar removal
        });

        profileSection.addEventListener('profileFieldChanged', (e) => {
            console.log('Profile field changed:', e.detail.field, e.detail.value);
            // Handle profile field change
        });

        profileSection.addEventListener('preferenceChanged', (e) => {
            console.log('Preference changed:', e.detail.preference, e.detail.enabled);
            // Handle preference change
        });

        profileSection.addEventListener('profileSaved', (e) => {
            console.log('Profile saved:', e.detail.formData);
            // Handle profile save
        });

        profileSection.addEventListener('profileCancelled', () => {
            console.log('Profile changes cancelled');
            // Handle profile cancel
        });
    }

    setupSettingsEvents(settingsSection) {
        settingsSection.addEventListener('settingsSaved', (e) => {
            console.log('Settings saved:', e.detail.settings);
            // Handle settings save
        });
    }
}

customElements.define('dashboard-app', DashboardApp); 