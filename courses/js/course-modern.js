// Course Modern JavaScript
class CourseManager {
    constructor() {
        this.currentSection = 'overview';
        this.currentLevel = null;
        this.currentLesson = null;
        this.quizData = null;
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupSidebar();
        this.setupHeader();
        this.setupEventListeners();
        this.loadSection(this.currentSection);
    }

    setupSidebar() {
        const sidebar = document.querySelector('course-sidebar');
        if (sidebar) {
            sidebar.addEventListener('sectionChange', (e) => {
                this.loadSection(e.detail.section);
            });

            sidebar.addEventListener('sidebarToggle', (e) => {
                this.handleSidebarToggle(e.detail.collapsed);
            });
        }
    }

    setupHeader() {
        const userAvatar = document.getElementById('userAvatar');
        const userDropdown = document.getElementById('userDropdown');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        // Toggle user dropdown
        if (userAvatar) {
            userAvatar.addEventListener('click', () => {
                userAvatar.classList.toggle('active');
                userDropdown.classList.toggle('active');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-profile')) {
                if (userAvatar) userAvatar.classList.remove('active');
                if (userDropdown) userDropdown.classList.remove('active');
            }
        });

        // Handle dropdown items
        if (userDropdown) {
            userDropdown.addEventListener('click', (e) => {
                const dropdownItem = e.target.closest('.dropdown-item');
                if (dropdownItem) {
                    const modalType = dropdownItem.dataset.modal;
                    
                    if (dropdownItem.classList.contains('logout')) {
                        this.handleLogout();
                    } else if (modalType) {
                        this.showModal(modalType);
                    }
                    
                    // Close dropdown
                    if (userAvatar) userAvatar.classList.remove('active');
                    if (userDropdown) userDropdown.classList.remove('active');
                }
            });
        }

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideModal();
            });
        }

        // Close modal when clicking overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.hideModal();
                }
            });
        }
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Lesson clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lesson-step')) {
                const lessonStep = e.target.closest('.lesson-step');
                if (!lessonStep.classList.contains('locked')) {
                    this.startLesson(lessonStep);
                }
            }
        });

        // Quiz interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option-btn')) {
                const optionBtn = e.target.closest('.option-btn');
                this.selectOption(optionBtn);
            }
        });
    }

    loadSection(section) {
        this.currentSection = section;
        const mainContent = document.querySelector('.main-content');
        
        if (!mainContent) return;

        // Update sidebar active state
        const sidebar = document.querySelector('course-sidebar');
        if (sidebar) {
            sidebar.setAttribute('current-section', section);
        }

        switch (section) {
            case 'overview':
                this.loadOverview();
                break;
            case 'learn':
                this.loadLearn();
                break;
            case 'stories':
                this.loadStories();
                break;
            case 'music':
                this.loadMusic();
                break;
            case 'ranking':
                this.loadRanking();
                break;
            case 'player':
                this.loadPlayer();
                break;
            case 'store':
                this.loadStore();
                break;
            case 'chat':
                this.loadChat();
                break;
            case 'daily-speaking':
                this.loadDailySpeaking();
                break;
        }
    }

    loadOverview() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="dashboard-container">
                <h1 class="section-title">Your Learning Dashboard</h1>
                
                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Learning Streak</h3>
                            <div class="stat-value">7 days</div>
                            <div class="stat-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 70%"></div>
                                </div>
                                <span>70% to next milestone</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Current Level</h3>
                            <div class="stat-value">Level 3</div>
                            <div class="stat-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 65%"></div>
                                </div>
                                <span>65% complete</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-gem"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total XP</h3>
                            <div class="stat-value">750 XP</div>
                            <div class="stat-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 45%"></div>
                                </div>
                                <span>45% to next level</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Global Ranking</h3>
                            <div class="stat-value">#42</div>
                            <div class="stat-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 85%"></div>
                                </div>
                                <span>Top 15% of learners</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="activity-section">
                    <h2>Recent Activity</h2>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon completed">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="activity-content">
                                <h4>Completed "Greetings" lesson</h4>
                                <p>Earned 25 XP • 2 hours ago</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon streak">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="activity-content">
                                <h4>Maintained 7-day streak</h4>
                                <p>Bonus 50 XP • Yesterday</p>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon achievement">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="activity-content">
                                <h4>Unlocked "First Steps" achievement</h4>
                                <p>Completed 5 lessons • 3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions">
                    <h2>Quick Actions</h2>
                    <div class="actions-grid">
                        <button class="action-btn primary" onclick="courseManager.loadLearn()">
                            <i class="fas fa-play"></i>
                            <span>Continue Learning</span>
                        </button>
                        <button class="action-btn secondary" onclick="courseManager.loadStories()">
                            <i class="fas fa-book"></i>
                            <span>Read Stories</span>
                        </button>
                        <button class="action-btn accent" onclick="courseManager.loadMusic()">
                            <i class="fas fa-music"></i>
                            <span>Listen to Music</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    loadLearn() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="learning-path-container">
                <div class="path-header">
                    <h1 class="section-title">Learning Path</h1>
                    <p class="section-subtitle">Follow the path to master ${this.getCourseName()}</p>
                </div>
                
                <div class="learning-path">
                    ${this.generateLearningPathHTML()}
                </div>
            </div>
        `;
    }

    loadStories() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="stories-container">
                <h2 class="section-title">Cuentos Indígenas</h2>
                <p class="section-subtitle">Descubre las historias y leyendas de las comunidades indígenas</p>
                <div class="stories-grid">
                    <div class="story-card">
                        <h3>La Tortuga y el Conejo</h3>
                        <p>Una historia tradicional ngäbe sobre la sabiduría y la paciencia.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                    <div class="story-card">
                        <h3>El Árbol Sagrado</h3>
                        <p>Leyenda sobre la conexión entre la naturaleza y el espíritu.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                    <div class="story-card">
                        <h3>Los Guardianes del Bosque</h3>
                        <p>Historia sobre los protectores ancestrales de la selva.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                    <div class="story-card">
                        <h3>El Río de la Vida</h3>
                        <p>Cuento sobre el ciclo de la vida y la importancia del agua.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                    <div class="story-card">
                        <h3>La Danza de la Luna</h3>
                        <p>Historia sobre los rituales y celebraciones tradicionales.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                    <div class="story-card">
                        <h3>El Mensajero del Viento</h3>
                        <p>Leyenda sobre la comunicación entre comunidades.</p>
                        <button class="btn btn-primary">Leer Historia</button>
                    </div>
                </div>
            </div>
        `;
    }

    loadMusic() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="music-container">
                <h2 class="section-title">Música Indígena</h2>
                <p class="section-subtitle">Escucha y aprende las melodías tradicionales</p>
                <div class="music-grid">
                    <div class="song-card">
                        <h3>Canto de Bienvenida</h3>
                        <p>Melodía tradicional para recibir visitantes.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                    <div class="song-card">
                        <h3>Danza del Sol</h3>
                        <p>Ritmo ceremonial para celebrar el amanecer.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                    <div class="song-card">
                        <h3>Canción de la Lluvia</h3>
                        <p>Melodía para invocar las bendiciones del agua.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                    <div class="song-card">
                        <h3>Ritmo de la Tierra</h3>
                        <p>Tambores tradicionales para conectar con la madre tierra.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                    <div class="song-card">
                        <h3>Canto de Curación</h3>
                        <p>Melodía sagrada para el bienestar espiritual.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                    <div class="song-card">
                        <h3>Himno de Gratitud</h3>
                        <p>Canción de agradecimiento a los ancestros.</p>
                        <button class="btn btn-primary">Escuchar</button>
                    </div>
                </div>
            </div>
        `;
    }

    loadRanking() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="ranking-container">
                <h2 class="section-title">Global Ranking</h2>
                <p class="section-subtitle">See how you compare with other learners</p>
                
                <div class="ranking-list">
                    <div class="ranking-item current">
                        <div class="rank-number">#42</div>
                        <div class="player-info">
                            <div class="player-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="player-details">
                                <h4>You</h4>
                                <p>750 XP • Level 3</p>
                            </div>
                        </div>
                        <div class="player-score">750</div>
                    </div>
                    
                    <div class="ranking-item">
                        <div class="rank-number">#41</div>
                        <div class="player-info">
                            <div class="player-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="player-details">
                                <h4>Maria G.</h4>
                                <p>760 XP • Level 3</p>
                            </div>
                        </div>
                        <div class="player-score">760</div>
                    </div>
                    
                    <div class="ranking-item">
                        <div class="rank-number">#40</div>
                        <div class="player-info">
                            <div class="player-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="player-details">
                                <h4>Carlos L.</h4>
                                <p>780 XP • Level 3</p>
                            </div>
                        </div>
                        <div class="player-score">780</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadPlayer() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="player-container">
                <h2 class="section-title">Personalización del Jugador</h2>
                <p class="section-subtitle">Personaliza tu avatar y configuración</p>
                <div class="player-customization">
                    <div class="player-preview">
                        <div class="player-avatar-large">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="5" fill="currentColor"/>
                                <path d="M20 21C20 16.58 16.42 13 12 13s-8 3.58-8 8" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <h3>Mi Avatar</h3>
                        <p>Nivel 15 - Explorador</p>
                    </div>
                    <div class="customization-options">
                        <h3>Opciones de Personalización</h3>
                        <div class="option-group">
                            <label>Color de Pelo</label>
                            <select>
                                <option>Negro</option>
                                <option>Marrón</option>
                                <option>Rubio</option>
                                <option>Rojo</option>
                            </select>
                        </div>
                        <div class="option-group">
                            <label>Color de Ojos</label>
                            <select>
                                <option>Marrón</option>
                                <option>Azul</option>
                                <option>Verde</option>
                                <option>Gris</option>
                            </select>
                        </div>
                        <div class="option-group">
                            <label>Color de Piel</label>
                            <div class="color-options">
                                <div class="color-option" style="background: #FFDBB4;"></div>
                                <div class="color-option" style="background: #EDB98A;"></div>
                                <div class="color-option" style="background: #D08B5B;"></div>
                                <div class="color-option" style="background: #AE5D29;"></div>
                                <div class="color-option" style="background: #8D4A43;"></div>
                            </div>
                        </div>
                        <div class="option-group">
                            <label>Accesorios</label>
                            <select>
                                <option>Ninguno</option>
                                <option>Gafas</option>
                                <option>Sombrero</option>
                                <option>Collares</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadStore() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="store-container">
                <h2 class="section-title">Tienda de SOGED</h2>
                <p class="section-subtitle">Compra elementos especiales para tu avatar</p>
                <div class="store-items">
                    <div class="store-item">
                        <h3>Traje Tradicional</h3>
                        <p>Vestimenta auténtica de las comunidades indígenas.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">500 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                    <div class="store-item">
                        <h3>Collares Sagrados</h3>
                        <p>Accesorios con significado espiritual y cultural.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">300 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                    <div class="store-item">
                        <h3>Sombrero de Paja</h3>
                        <p>Sombrero tradicional tejido a mano.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">200 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                    <div class="store-item">
                        <h3>Pintura Corporal</h3>
                        <p>Diseños tradicionales para el avatar.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">400 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                    <div class="store-item">
                        <h3>Mochila Artesanal</h3>
                        <p>Bolso tejido con técnicas ancestrales.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">350 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                    <div class="store-item">
                        <h3>Instrumento Musical</h3>
                        <p>Instrumento tradicional para tu colección.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--accent-color); font-weight: 600;">600 XP</span>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLearningPathHTML() {
        const pathData = [
            {
                id: 'world1',
                name: 'World 1: Basics',
                description: 'Essential greetings and introductions',
                color: '#ff6b6b',
                steps: [
                    { id: 'step1', name: 'Greetings', status: 'completed', xp: 25 },
                    { id: 'step2', name: 'Introductions', status: 'completed', xp: 25 },
                    { id: 'step3', name: 'Family', status: 'completed', xp: 25 },
                    { id: 'step4', name: 'Numbers', status: 'current', xp: 25 },
                    { id: 'step5', name: 'Colors', status: 'locked', xp: 25 }
                ]
            },
            {
                id: 'world2',
                name: 'World 2: Daily Life',
                description: 'Everyday activities and routines',
                color: '#4ecdc4',
                steps: [
                    { id: 'step6', name: 'Food', status: 'completed', xp: 30 },
                    { id: 'step7', name: 'Time', status: 'completed', xp: 30 },
                    { id: 'step8', name: 'Shopping', status: 'current', xp: 30 },
                    { id: 'step9', name: 'Weather', status: 'locked', xp: 30 },
                    { id: 'step10', name: 'Transport', status: 'locked', xp: 30 }
                ]
            },
            {
                id: 'world3',
                name: 'World 3: Nature',
                description: 'Natural environment vocabulary',
                color: '#45b7d1',
                steps: [
                    { id: 'step11', name: 'Mountains', status: 'locked', xp: 35 },
                    { id: 'step12', name: 'Rivers', status: 'locked', xp: 35 },
                    { id: 'step13', name: 'Plants', status: 'locked', xp: 35 },
                    { id: 'step14', name: 'Animals', status: 'locked', xp: 35 },
                    { id: 'step15', name: 'Seasons', status: 'locked', xp: 35 }
                ]
            },
            {
                id: 'world4',
                name: 'World 4: Community',
                description: 'Social relationships and traditions',
                color: '#a55eea',
                steps: [
                    { id: 'step16', name: 'Cooperation', status: 'locked', xp: 40 },
                    { id: 'step17', name: 'Celebrations', status: 'locked', xp: 40 },
                    { id: 'step18', name: 'Stories', status: 'locked', xp: 40 },
                    { id: 'step19', name: 'Traditions', status: 'locked', xp: 40 },
                    { id: 'step20', name: 'Leadership', status: 'locked', xp: 40 }
                ]
            }
        ];

        return pathData.map((world, worldIndex) => `
            <div class="world-section" data-world="${world.id}">
                <div class="world-header" style="border-left: 4px solid ${world.color}">
                    <div class="world-info">
                        <h3>${world.name}</h3>
                        <p>${world.description}</p>
                    </div>
                    <div class="world-progress">
                        <div class="progress-circle" style="--progress: ${this.calculateWorldProgress(world.steps)}">
                            <span>${this.calculateWorldProgress(world.steps)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="steps-container">
                    ${world.steps.map((step, stepIndex) => `
                        <div class="lesson-step ${step.status}" data-step="${step.id}" data-world="${world.id}">
                            <div class="step-icon">
                                ${this.getStepIcon(step.status)}
                            </div>
                            <div class="step-info">
                                <h4>${step.name}</h4>
                                <span class="step-xp">${step.xp} XP</span>
                            </div>
                            ${step.status === 'current' ? '<div class="current-indicator">Current</div>' : ''}
                            ${step.status === 'locked' ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ''}
                        </div>
                        
                        ${stepIndex < world.steps.length - 1 ? `
                            <div class="step-connector ${step.status === 'completed' ? 'completed' : ''}"></div>
                        ` : ''}
                    `).join('')}
                </div>
                
                ${worldIndex < pathData.length - 1 ? `
                    <div class="world-connector ${this.isWorldCompleted(world.steps) ? 'completed' : ''}"></div>
                ` : ''}
            </div>
        `).join('');
    }

    calculateWorldProgress(steps) {
        const completed = steps.filter(step => step.status === 'completed').length;
        return Math.round((completed / steps.length) * 100);
    }

    isWorldCompleted(steps) {
        return steps.every(step => step.status === 'completed');
    }

    getStepIcon(status) {
        switch (status) {
            case 'completed':
                return '<i class="fas fa-check-circle"></i>';
            case 'current':
                return '<i class="fas fa-play-circle"></i>';
            case 'locked':
                return '<i class="fas fa-circle"></i>';
            default:
                return '<i class="fas fa-circle"></i>';
        }
    }

    showModal(modalType) {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        if (!modalOverlay || !modalTitle || !modalContent) return;

        let title = '';
        let content = '';

        switch (modalType) {
            case 'profile':
                title = 'User Profile';
                content = `
                    <div class="profile-info">
                        <div class="profile-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="profile-details">
                            <h4>Usuario SOGED</h4>
                            <p>Level 3 • 750 XP • 7 day streak</p>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Learning Statistics</h3>
                        <p>Total lessons completed: 13</p>
                        <p>Current streak: 7 days</p>
                        <p>Total XP earned: 750</p>
                        <p>Global ranking: #42</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Achievements</h3>
                        <p>✅ First Steps - Completed 5 lessons</p>
                        <p>✅ 7-Day Streak - Maintained learning streak</p>
                        <p>🔄 Perfect Score - Get 100% on a lesson</p>
                    </div>
                `;
                break;

            case 'settings':
                title = 'Settings';
                content = `
                    <div class="modal-section">
                        <h3>Notifications</h3>
                        <div class="settings-item">
                            <label>Daily reminders</label>
                            <input type="checkbox" checked>
                        </div>
                        <div class="settings-item">
                            <label>Achievement notifications</label>
                            <input type="checkbox" checked>
                        </div>
                        <div class="settings-item">
                            <label>Weekly progress reports</label>
                            <input type="checkbox">
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Sound</h3>
                        <div class="settings-item">
                            <label>Effects volume</label>
                            <input type="range" min="0" max="100" value="80">
                        </div>
                        <div class="settings-item">
                            <label>Music volume</label>
                            <input type="range" min="0" max="100" value="60">
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Interface</h3>
                        <div class="settings-item">
                            <label>Language</label>
                            <select>
                                <option>English</option>
                                <option>Español</option>
                            </select>
                        </div>
                        <div class="settings-item">
                            <label>Theme</label>
                            <select>
                                <option>Light</option>
                                <option>Dark</option>
                            </select>
                        </div>
                    </div>
                `;
                break;

            case 'notifications':
                title = 'Notifications';
                content = `
                    <div class="notification-item">
                        <div class="notification-icon success">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Lesson Completed!</h4>
                            <p>You completed "Greetings" lesson</p>
                            <div class="notification-time">2 hours ago</div>
                        </div>
                    </div>
                    
                    <div class="notification-item">
                        <div class="notification-icon info">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Streak Maintained!</h4>
                            <p>You maintained your 7-day learning streak</p>
                            <div class="notification-time">Yesterday</div>
                        </div>
                    </div>
                    
                    <div class="notification-item">
                        <div class="notification-icon warning">
                            <i class="fas fa-medal"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Achievement Unlocked!</h4>
                            <p>You unlocked "First Steps" achievement</p>
                            <div class="notification-time">3 days ago</div>
                        </div>
                    </div>
                `;
                break;
        }

        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
    }

    hideModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    startLesson(lessonStep) {
        const stepId = lessonStep.dataset.step;
        const worldId = lessonStep.dataset.world;
        
        this.currentLesson = stepId;
        this.currentLevel = worldId;
        
        this.loadQuiz();
    }

    loadQuiz() {
        const quizData = this.getQuizData(this.currentLesson);
        this.quizData = quizData;
        
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2 class="quiz-title">${quizData.title}</h2>
                    <p class="quiz-subtitle">Lesson • ${quizData.description}</p>
                    
                    <div class="progress-container">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>
                
                <div class="question-container">
                    <div class="question-text">${quizData.question}</div>
                    
                    <div class="options-grid">
                        ${quizData.options.map((option, index) => `
                            <button class="option-btn" data-option="${index}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="quiz-actions">
                    <button class="btn btn-secondary" onclick="courseManager.skipQuestion()">
                        <i class="fas fa-forward"></i> Skip
                    </button>
                    <button class="btn btn-primary" onclick="courseManager.checkAnswer()" disabled>
                        <i class="fas fa-check"></i> Check
                    </button>
                </div>
            </div>
        `;
    }

    getQuizData(lesson) {
        const quizzes = {
            step1: {
                title: 'Basic Greetings',
                description: 'Learn to greet in Ngäbe',
                question: 'How do you say "Hello" in Ngäbe?',
                options: ['Nä', 'Bä', 'Dä', 'Kä'],
                correct: 0
            },
            step2: {
                title: 'Introductions',
                description: 'Learn to introduce yourself',
                question: 'How do you say "My name is..." in Ngäbe?',
                options: ['Nä kri...', 'Bä kri...', 'Dä kri...', 'Kä kri...'],
                correct: 0
            },
            step4: {
                title: 'Numbers',
                description: 'Learn numbers in Ngäbe',
                question: 'How do you say "one" in Ngäbe?',
                options: ['Krö', 'Brö', 'Drö', 'Krë'],
                correct: 0
            }
        };

        return quizzes[lesson] || {
            title: 'Lesson',
            description: 'Learn something new',
            question: 'What is the correct answer?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0
        };
    }

    selectOption(optionBtn) {
        // Remove previous selections
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current option
        optionBtn.classList.add('selected');
        
        // Enable check button
        const checkBtn = document.querySelector('.quiz-actions .btn-primary');
        if (checkBtn) {
            checkBtn.disabled = false;
        }
    }

    checkAnswer() {
        const selectedBtn = document.querySelector('.option-btn.selected');
        if (!selectedBtn) return;

        const selectedOption = parseInt(selectedBtn.dataset.option);
        const correctOption = this.quizData.correct;

        // Show correct/incorrect
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (index === correctOption) {
                btn.classList.add('correct');
            } else if (index === selectedOption && selectedOption !== correctOption) {
                btn.classList.add('incorrect');
            }
        });

        // Disable all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });

        // Update progress
        this.updateProgress();

        // Show result
        setTimeout(() => {
            this.showResult(selectedOption === correctOption);
        }, 1000);
    }

    showResult(isCorrect) {
        const resultHTML = `
            <div class="result-container">
                <div class="result-icon ${isCorrect ? 'correct' : 'incorrect'}">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                </div>
                <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                <p>${isCorrect ? 'Excellent work!' : 'Keep practicing'}</p>
                
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="courseManager.nextQuestion()">
                        <i class="fas fa-arrow-right"></i> Next
                    </button>
                    <button class="btn btn-secondary" onclick="courseManager.loadLearn()">
                        <i class="fas fa-home"></i> Back
                    </button>
                </div>
            </div>
        `;

        document.querySelector('.quiz-container').innerHTML = resultHTML;
    }

    nextQuestion() {
        // For now, just go back to learn section
        this.loadLearn();
    }

    skipQuestion() {
        this.showResult(false);
    }

    updateProgress() {
        // Update user progress
        if (!this.userProgress[this.currentLevel]) {
            this.userProgress[this.currentLevel] = {};
        }
        
        this.userProgress[this.currentLevel][this.currentLesson] = true;
        this.saveProgress();
    }

    handleSidebarToggle(collapsed) {
        const mainContent = document.querySelector('.main-content');
        const header = document.querySelector('.course-header');
        
        if (collapsed) {
            mainContent.classList.add('sidebar-collapsed');
            header.classList.add('sidebar-collapsed');
        } else {
            mainContent.classList.remove('sidebar-collapsed');
            header.classList.remove('sidebar-collapsed');
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('course-sidebar');
        if (sidebar) {
            sidebar.toggleCollapse();
        }
    }

    getCourseName() {
        const courseName = document.querySelector('course-sidebar')?.getAttribute('course-name') || 'Ngäbe';
        return courseName;
    }

    loadProgress() {
        const saved = localStorage.getItem('courseProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('courseProgress', JSON.stringify(this.userProgress));
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '../index.html';
        }
    }

    loadChat() {
        const mainContent = document.querySelector('.main-content');
        const courseName = this.getCurrentCourseName();
        mainContent.innerHTML = `
            <div class="chat-ia-container">
                <h2 class="section-title">Chat IA - Práctica de Speaking (${courseName})</h2>
                <p class="section-subtitle">Habla con la IA y mejora tu pronunciación en <b>${courseName}</b>. Elige un tema o empieza a conversar.</p>
                <div class="chat-window">
                    <div class="chat-messages" id="chatMessages"></div>
                    <div class="chat-input-row">
                        <input type="text" id="chatInput" placeholder="Escribe tu mensaje o usa el micrófono..." />
                        <button id="sendChatBtn" class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>
                        <button id="micChatBtn" class="btn btn-secondary"><i class="fas fa-microphone"></i></button>
                    </div>
                </div>
            </div>
        `;
        // Aquí puedes agregar lógica para IA y reconocimiento de voz
    }

    loadDailySpeaking() {
        const mainContent = document.querySelector('.main-content');
        const courseName = this.getCurrentCourseName();
        mainContent.innerHTML = `
            <div class="daily-speaking-container">
                <h2 class="section-title">Lección Diaria de Speaking (${courseName})</h2>
                <p class="section-subtitle">Practica tu pronunciación con la IA. Recibe un reto diario y feedback instantáneo.</p>
                <div class="daily-speaking-card">
                    <div class="speaking-prompt">
                        <i class="fas fa-volume-up"></i>
                        <span>Repite la siguiente frase en <b>${courseName}</b>:</span>
                        <div class="prompt-text">"[Frase del día aquí]"</div>
                    </div>
                    <button class="btn btn-primary" id="startSpeakingBtn"><i class="fas fa-microphone"></i> Grabar</button>
                    <div class="speaking-feedback" id="speakingFeedback"></div>
                </div>
            </div>
        `;
        // Aquí puedes agregar lógica para IA y reconocimiento de voz
    }

    getCurrentCourseName() {
        // Puedes mejorar esto para obtener el nombre real del curso según el contexto
        const sidebar = document.querySelector('course-sidebar');
        return sidebar?.getAttribute('course-name') || 'Idioma';
    }
}

// Initialize course manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.courseManager = new CourseManager();
}); 