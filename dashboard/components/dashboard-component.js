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
                    background: #1a1a1a;
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                    font-family: 'Courier New', monospace;
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
                    width: 280px;
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
                    width: calc(100% - 280px);
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
                    background: #1a1a1a;
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
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* 8-bit style cards */
                .card {
                    background: #333;
                    border: 3px solid #28A745;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #FFD600;
                    font-weight: bold;
                }

                .card-header {
                    border-bottom: 2px solid #28A745;
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    color: #FFD600;
                }

                .card-content {
                    color: #ffffff;
                }

                .btn {
                    background: #28A745;
                    border: 2px solid #FFD600;
                    color: #1a1a1a;
                    padding: 0.8rem 1.5rem;
                    font-weight: bold;
                    font-family: 'Courier New', monospace;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }

                .btn:hover {
                    background: #FF6B35;
                    color: #1a1a1a;
                    transform: scale(1.05);
                }

                .btn-secondary {
                    background: #FF6B35;
                    border-color: #FFD600;
                }

                .btn-secondary:hover {
                    background: #28A745;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .welcome-section {
                    background: #333;
                    border: 4px solid #28A745;
                    padding: 2rem;
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .welcome-title {
                    font-size: 2rem;
                    color: #FFD600;
                    margin-bottom: 1rem;
                    text-shadow: 2px 2px 0px #1a1a1a;
                }

                .welcome-subtitle {
                    color: #ffffff;
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                }

                .streak-button {
                    background: linear-gradient(45deg, #FF6B35, #FFD600);
                    border: 3px solid #28A745;
                    color: #1a1a1a;
                    padding: 1rem 2rem;
                    font-weight: bold;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .streak-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
                }

                .course-card {
                    background: linear-gradient(135deg, #28A745, #00A3E0);
                    border: 3px solid #FFD600;
                    padding: 1.5rem;
                    color: #1a1a1a;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .course-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .course-icon {
                    width: 60px;
                    height: 60px;
                    background: #FFD600;
                    border: 3px solid #FF6B35;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #1a1a1a;
                }

                .course-details h3 {
                    color: #1a1a1a;
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .course-details p {
                    color: #1a1a1a;
                    opacity: 0.8;
                }

                .continue-btn {
                    background: #FF6B35;
                    border: 2px solid #FFD600;
                    color: #1a1a1a;
                    padding: 0.8rem 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .continue-btn:hover {
                    background: #FFD600;
                    color: #1a1a1a;
                    transform: scale(1.05);
                }

                /* Scrollbar styling */
                .main-content::-webkit-scrollbar {
                    width: 12px;
                }

                .main-content::-webkit-scrollbar-track {
                    background: #333;
                }

                .main-content::-webkit-scrollbar-thumb {
                    background: #28A745;
                    border: 2px solid #FFD600;
                }

                .main-content::-webkit-scrollbar-thumb:hover {
                    background: #FF6B35;
                }
            </style>

            <div class="dashboard-container">
                <div class="sidebar-container" id="sidebarContainer">
                    <dashboard-sidebar id="sidebar"></dashboard-sidebar>
                </div>
                
                <div class="content-area">
                    <dashboard-header id="header"></dashboard-header>
                    
                    <main class="main-content">
                        <div class="content-wrapper">
                            <div class="content-section" id="overviewSection">
                                <!-- Overview content will be loaded here -->
                            </div>
                            
                            <div class="content-section" id="coursesSection">
                                <!-- Courses content will be loaded here -->
                            </div>
                            
                            <div class="content-section" id="achievementsSection">
                                <!-- Achievements content will be loaded here -->
                            </div>
                            
                            <div class="content-section" id="aiTutorSection">
                                <!-- AI Tutor content will be loaded here -->
                            </div>
                            
                            <div class="content-section" id="profileSection">
                                <!-- Profile content will be loaded here -->
                            </div>
                            
                            <div class="content-section" id="settingsSection">
                                <!-- Settings content will be loaded here -->
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const sidebar = this.shadowRoot.getElementById('sidebar');
        const header = this.shadowRoot.getElementById('header');
        const sidebarContainer = this.shadowRoot.getElementById('sidebarContainer');

        // Sidebar events
        sidebar.addEventListener('sidebarToggle', (e) => {
            this.isSidebarCollapsed = e.detail.collapsed;
            if (this.isSidebarCollapsed) {
                sidebarContainer.classList.add('collapsed');
            } else {
                sidebarContainer.classList.remove('collapsed');
            }
        });

        sidebar.addEventListener('navigation', (e) => {
            this.loadSection(e.detail.section);
        });

        // Header events
        header.addEventListener('navigation', (e) => {
            this.loadSection(e.detail.section);
        });

        header.addEventListener('logout', () => {
            this.handleLogout();
        });

        header.addEventListener('themeToggle', () => {
            this.handleThemeToggle();
        });

        header.addEventListener('notifications', () => {
            this.handleNotifications();
        });

        header.addEventListener('statClick', (e) => {
            this.handleStatClick(e.detail.statType);
        });
    }

    loadSection(section) {
        // Hide all sections
        const sections = this.shadowRoot.querySelectorAll('.content-section');
        sections.forEach(s => s.classList.remove('active'));

        // Show selected section
        const targetSection = this.shadowRoot.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            this.createSectionContent(section);
        }

        // Update navigation
        this.updateNavigation(section);
    }

    updateNavigation(section) {
        // Update sidebar navigation
        const sidebar = this.shadowRoot.getElementById('sidebar');
        if (sidebar && sidebar.updateActiveSection) {
            sidebar.updateActiveSection(section);
        }
    }

    createSectionContent(section) {
        const targetSection = this.shadowRoot.getElementById(section + 'Section');
        if (!targetSection) return;

        switch (section) {
            case 'overview':
                targetSection.innerHTML = this.getOverviewContent();
                this.setupOverviewEvents(targetSection);
                break;
            case 'courses':
                targetSection.innerHTML = this.getCoursesContent();
                this.setupCoursesEvents(targetSection);
                break;
            case 'achievements':
                targetSection.innerHTML = this.getAchievementsContent();
                this.setupAchievementsEvents(targetSection);
                break;
            case 'aiTutor':
                targetSection.innerHTML = this.getAiTutorContent();
                this.setupAiTutorEvents(targetSection);
                break;
            case 'profile':
                targetSection.innerHTML = this.getProfileContent();
                this.setupProfileEvents(targetSection);
                break;
            case 'settings':
                targetSection.innerHTML = this.getSettingsContent();
                this.setupSettingsEvents(targetSection);
                break;
        }

        this.dispatchEvent(new CustomEvent('sectionLoaded', {
            detail: { section },
            bubbles: true,
            composed: true
        }));
    }

    getOverviewContent() {
        return `
            <div class="welcome-section">
                <h1 class="welcome-title">¡Bienvenido de vuelta, Maria!</h1>
                <p class="welcome-subtitle">¿Lista para continuar tu viaje de aprendizaje de idiomas?</p>
                <button class="streak-button">
                    🔥 Racha de 7 Días
                </button>
            </div>

            <div class="card">
                <div class="card-header">Tu Curso Actual</div>
                <div class="card-content">
                    <div class="course-card">
                        <div class="course-info">
                            <div class="course-icon">
                                <img src="../Images/Ngabe.png" alt="Ngäbe" style="width: 100%; height: 100%; object-fit: contain;">
                            </div>
                            <div class="course-details">
                                <h3>Ngäbe</h3>
                                <p>Lengua indígena de Panamá</p>
                            </div>
                        </div>
                        <button class="continue-btn">Continuar</button>
                    </div>
                </div>
            </div>

            <div class="grid">
                <div class="card">
                    <div class="card-header">Progreso Diario</div>
                    <div class="card-content">
                        <p>✅ Completaste 3 lecciones hoy</p>
                        <p>🎯 Objetivo: 5 lecciones</p>
                        <button class="btn">Ver Progreso</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">Próximos Logros</div>
                    <div class="card-content">
                        <p>🏆 "Maestro Ngäbe" - 80% completado</p>
                        <p>⭐ "Primera Semana" - 5 días más</p>
                        <button class="btn btn-secondary">Ver Logros</button>
                    </div>
                </div>
            </div>
        `;
    }

    getCoursesContent() {
        return `
            <div class="card">
                <div class="card-header">Cursos Disponibles</div>
                <div class="card-content">
                    <div class="grid">
                        <div class="course-card">
                            <div class="course-info">
                                <div class="course-icon">
                                    <img src="../Images/Ngabe.png" alt="Ngäbe" style="width: 100%; height: 100%; object-fit: contain;">
                                </div>
                                <div class="course-details">
                                    <h3>Ngäbe</h3>
                                    <p>Nivel: Intermedio</p>
                                </div>
                            </div>
                            <button class="continue-btn">Continuar</button>
                        </div>

                        <div class="course-card">
                            <div class="course-info">
                                <div class="course-icon">
                                    <img src="../Images/Embera.png" alt="Emberá" style="width: 100%; height: 100%; object-fit: contain;">
                                </div>
                                <div class="course-details">
                                    <h3>Emberá</h3>
                                    <p>Nivel: Principiante</p>
                                </div>
                            </div>
                            <button class="continue-btn">Comenzar</button>
                        </div>

                        <div class="course-card">
                            <div class="course-info">
                                <div class="course-icon">
                                    <img src="../Images/Guna.png" alt="Guna" style="width: 100%; height: 100%; object-fit: contain;">
                                </div>
                                <div class="course-details">
                                    <h3>Guna</h3>
                                    <p>Nivel: Principiante</p>
                                </div>
                            </div>
                            <button class="continue-btn">Comenzar</button>
                        </div>

                        <div class="course-card">
                            <div class="course-info">
                                <div class="course-icon">
                                    <img src="../Images/Naso.gif" alt="Naso" style="width: 100%; height: 100%; object-fit: contain;">
                                </div>
                                <div class="course-details">
                                    <h3>Naso</h3>
                                    <p>Nivel: Principiante</p>
                                </div>
                            </div>
                            <button class="continue-btn">Comenzar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getAchievementsContent() {
        return `
            <div class="card">
                <div class="card-header">Logros Desbloqueados</div>
                <div class="card-content">
                    <div class="grid">
                        <div class="card">
                            <div class="card-header">🏆 Primeros Pasos</div>
                            <div class="card-content">
                                <p>Completaste tu primera lección</p>
                                <p>Desbloqueado: 15/01/2024</p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">🔥 Racha de 7 Días</div>
                            <div class="card-content">
                                <p>Estudiaste 7 días seguidos</p>
                                <p>Desbloqueado: 20/01/2024</p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">⭐ Estudiante Dedicado</div>
                            <div class="card-content">
                                <p>Completaste 50 lecciones</p>
                                <p>Desbloqueado: 25/01/2024</p>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">🎯 Objetivo Cumplido</div>
                            <div class="card-content">
                                <p>Alcanzaste 1000 puntos</p>
                                <p>Desbloqueado: 30/01/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getAiTutorContent() {
        return `
            <div class="card">
                <div class="card-header">🤖 AI Tutor - Tu Asistente Personal</div>
                <div class="card-content">
                    <div class="chat-container" id="chatContainer">
                        <div class="chat-messages" id="chatMessages">
                            <div class="message ai-message">
                                <div class="message-avatar">🤖</div>
                                <div class="message-content">
                                    <div class="message-text">
                                        ¡Hola! Soy tu tutor de AI para las lenguas indígenas de Panamá. 
                                        Puedo ayudarte con:
                                        <br>• Traducciones entre español y lenguas indígenas
                                        <br>• Explicaciones de gramática
                                        <br>• Información cultural
                                        <br>• Ejercicios de práctica
                                        <br><br>¿En qué puedo ayudarte hoy?
                                    </div>
                                    <div class="message-time">Ahora</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chat-input-container">
                            <div class="chat-input-wrapper">
                                <input type="text" id="chatInput" placeholder="Escribe tu pregunta aquí..." class="chat-input">
                                <button id="sendMessage" class="send-button">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                            <div class="quick-actions">
                                <button class="quick-action-btn" data-action="translate">Traducir</button>
                                <button class="quick-action-btn" data-action="grammar">Gramática</button>
                                <button class="quick-action-btn" data-action="culture">Cultura</button>
                                <button class="quick-action-btn" data-action="exercise">Ejercicio</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .chat-container {
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                    background: #333;
                    border: 3px solid #28A745;
                    border-radius: 0;
                }

                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .message {
                    display: flex;
                    gap: 0.5rem;
                    max-width: 80%;
                }

                .message.user-message {
                    align-self: flex-end;
                    flex-direction: row-reverse;
                }

                .message-avatar {
                    width: 40px;
                    height: 40px;
                    background: #FFD600;
                    border: 2px solid #FF6B35;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #1a1a1a;
                }

                .message-content {
                    background: #444;
                    border: 2px solid #28A745;
                    padding: 0.8rem;
                    border-radius: 0;
                    flex: 1;
                }

                .message.user-message .message-content {
                    background: #28A745;
                    color: #1a1a1a;
                    border-color: #FFD600;
                }

                .message-text {
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                .message-time {
                    font-size: 0.7rem;
                    opacity: 0.7;
                    text-align: right;
                }

                .chat-input-container {
                    padding: 1rem;
                    border-top: 2px solid #28A745;
                }

                .chat-input-wrapper {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .chat-input {
                    flex: 1;
                    padding: 0.8rem;
                    background: #444;
                    border: 2px solid #28A745;
                    color: #FFD600;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                }

                .chat-input:focus {
                    outline: none;
                    border-color: #FFD600;
                }

                .send-button {
                    width: 50px;
                    height: 50px;
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

                .send-button:hover {
                    background: #28A745;
                    transform: scale(1.05);
                }

                .quick-actions {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .quick-action-btn {
                    padding: 0.5rem 1rem;
                    background: #333;
                    border: 2px solid #28A745;
                    color: #FFD600;
                    font-family: 'Courier New', monospace;
                    font-size: 0.8rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .quick-action-btn:hover {
                    background: #28A745;
                    color: #1a1a1a;
                    transform: scale(1.05);
                }

                .typing-indicator {
                    display: flex;
                    gap: 0.3rem;
                    padding: 0.5rem;
                    align-items: center;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #FFD600;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                }
            </style>
        `;
    }

    getCommunityContent() {
        return `
            <div class="card">
                <div class="card-header">Comunidad Soged</div>
                <div class="card-content">
                    <div class="grid">
                        <div class="card">
                            <div class="card-header">👥 Estudiantes Activos</div>
                            <div class="card-content">
                                <p>1,247 estudiantes online</p>
                                <p>Únete a la conversación</p>
                                <button class="btn">Ver Chat</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">🏆 Ranking Semanal</div>
                            <div class="card-content">
                                <p>Tu posición: #15</p>
                                <p>Puntos: 1,250</p>
                                <button class="btn btn-secondary">Ver Ranking</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfileContent() {
        return `
            <div class="card">
                <div class="card-header">Perfil de Usuario</div>
                <div class="card-content">
                    <div class="grid">
                        <div class="card">
                            <div class="card-header">👤 Información Personal</div>
                            <div class="card-content">
                                <p><strong>Nombre:</strong> Maria Santos</p>
                                <p><strong>Email:</strong> maria@soged.com</p>
                                <p><strong>Nivel:</strong> Estudiante Avanzado</p>
                                <p><strong>Miembro desde:</strong> Enero 2024</p>
                                <button class="btn">Editar Perfil</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">📊 Estadísticas</div>
                            <div class="card-content">
                                <p><strong>Lecciones Completadas:</strong> 156</p>
                                <p><strong>Puntos Totales:</strong> 12,450</p>
                                <p><strong>Logros:</strong> 8/20</p>
                                <p><strong>Racha Actual:</strong> 7 días</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSettingsContent() {
        return `
            <div class="card">
                <div class="card-header">Configuración</div>
                <div class="card-content">
                    <div class="grid">
                        <div class="card">
                            <div class="card-header">🎨 Apariencia</div>
                            <div class="card-content">
                                <p>Tema: 8-bit (Actual)</p>
                                <p>Idioma: Español</p>
                                <p>Notificaciones: Activadas</p>
                                <button class="btn">Cambiar Tema</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">🔔 Notificaciones</div>
                            <div class="card-content">
                                <p>Recordatorios diarios: Activado</p>
                                <p>Logros: Activado</p>
                                <p>Comunidad: Activado</p>
                                <button class="btn btn-secondary">Configurar</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">🔒 Privacidad</div>
                            <div class="card-content">
                                <p>Perfil público: Activado</p>
                                <p>Compartir progreso: Activado</p>
                                <p>Chat comunitario: Activado</p>
                                <button class="btn">Gestionar</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">💾 Datos</div>
                            <div class="card-content">
                                <p>Exportar datos: Disponible</p>
                                <p>Eliminar cuenta: Disponible</p>
                                <button class="btn btn-secondary">Gestionar Datos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    handleLogout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.removeItem('soged_token');
            localStorage.removeItem('soged_user');
            window.location.href = '../auth/login.html';
        }
    }

    handleThemeToggle() {
        console.log('Theme toggle clicked');
        // Implement theme toggle functionality
    }

    handleNotifications() {
        console.log('Notifications clicked');
        // Implement notifications functionality
    }

    handleStatClick(statType) {
        console.log('Stat clicked:', statType);
        // Implement stat click functionality
    }

    updateStats(stats) {
        const header = this.shadowRoot.getElementById('header');
        if (header && header.updateStats) {
            header.updateStats(stats);
        }
    }

    updateNotifications(count) {
        const header = this.shadowRoot.getElementById('header');
        if (header && header.updateNotifications) {
            header.updateNotifications(count);
        }
    }

    setupOverviewEvents(overviewSection) {
        const continueBtn = overviewSection.querySelector('.continue-btn');
        const progressBtn = overviewSection.querySelector('.btn');
        const achievementsBtn = overviewSection.querySelector('.btn-secondary');
        const streakButton = overviewSection.querySelector('.streak-button');

        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                console.log('Continuar curso Ngäbe');
                this.dispatchEvent(new CustomEvent('courseContinue', {
                    detail: { course: 'ngabe' },
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                console.log('Ver progreso');
                this.dispatchEvent(new CustomEvent('viewProgress', {
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (achievementsBtn) {
            achievementsBtn.addEventListener('click', () => {
                console.log('Ver logros');
                this.loadSection('achievements');
            });
        }

        if (streakButton) {
            streakButton.addEventListener('click', () => {
                console.log('Ver racha');
                this.dispatchEvent(new CustomEvent('viewStreak', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }

    setupCoursesEvents(coursesSection) {
        const courseButtons = coursesSection.querySelectorAll('.continue-btn');
        
        courseButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const courses = ['ngabe', 'embera', 'guna', 'naso'];
                const courseName = courses[index];
                console.log(`Continuar curso ${courseName}`);
                
                this.dispatchEvent(new CustomEvent('courseContinue', {
                    detail: { course: courseName },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    setupAchievementsEvents(achievementsSection) {
        // Los logros ya están mostrados, no necesitan botones adicionales
        console.log('Sección de logros cargada');
    }

    setupAiTutorEvents(aiTutorSection) {
        const chatInput = aiTutorSection.querySelector('#chatInput');
        const sendButton = aiTutorSection.querySelector('#sendMessage');
        const chatMessages = aiTutorSection.querySelector('#chatMessages');
        const quickActionBtns = aiTutorSection.querySelectorAll('.quick-action-btn');

        // Send message function
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            this.showTypingIndicator();

            // Generate AI response
            setTimeout(() => {
                this.hideTypingIndicator();
                const aiResponse = this.generateAIResponse(message);
                this.addMessage(aiResponse, 'ai');
            }, 1000 + Math.random() * 2000); // Random delay to feel more natural
        };

        // Send button click
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }

        // Enter key press
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        // Quick action buttons
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const quickMessage = this.getQuickActionMessage(action);
                this.addMessage(quickMessage, 'user');
                
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    const aiResponse = this.generateAIResponse(quickMessage);
                    this.addMessage(aiResponse, 'ai');
                }, 1000);
            });
        });
    }

    addMessage(text, sender) {
        const chatMessages = this.shadowRoot.querySelector('#chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        content.appendChild(messageText);
        content.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const chatMessages = this.shadowRoot.querySelector('#chatMessages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.shadowRoot.querySelector('#typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getQuickActionMessage(action) {
        const messages = {
            'translate': '¿Puedes ayudarme con traducciones?',
            'grammar': 'Explícame la gramática de las lenguas indígenas',
            'culture': 'Cuéntame sobre la cultura panameña',
            'exercise': 'Dame un ejercicio para practicar'
        };
        return messages[action] || 'Hola';
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Base de conocimiento del AI
        const responses = {
            // Traducciones
            'traducir': '¡Claro! Puedo ayudarte con traducciones. ¿Qué palabra o frase quieres traducir? Por ejemplo, puedo traducir entre español y Ngäbe, Emberá, Guna o Naso.',
            'traducción': '¡Claro! Puedo ayudarte con traducciones. ¿Qué palabra o frase quieres traducir? Por ejemplo, puedo traducir entre español y Ngäbe, Emberá, Guna o Naso.',
            'traduce': '¡Claro! Puedo ayudarte con traducciones. ¿Qué palabra o frase quieres traducir? Por ejemplo, puedo traducir entre español y Ngäbe, Emberá, Guna o Naso.',
            
            // Gramática
            'gramática': '¡Excelente pregunta! La gramática de las lenguas indígenas de Panamá es fascinante. Por ejemplo, en Ngäbe, el orden de las palabras es diferente al español. ¿Te gustaría que te explique algo específico?',
            'grammar': '¡Excelente pregunta! La gramática de las lenguas indígenas de Panamá es fascinante. Por ejemplo, en Ngäbe, el orden de las palabras es diferente al español. ¿Te gustaría que te explique algo específico?',
            
            // Cultura
            'cultura': '¡Me encanta hablar sobre cultura! Los pueblos indígenas de Panamá tienen tradiciones increíbles. Los Ngäbe son conocidos por sus molas, los Emberá por sus artesanías, y los Guna por su autonomía. ¿Qué te interesa más?',
            'culture': '¡Me encanta hablar sobre cultura! Los pueblos indígenas de Panamá tienen tradiciones increíbles. Los Ngäbe son conocidos por sus molas, los Emberá por sus artesanías, y los Guna por su autonomía. ¿Qué te interesa más?',
            
            // Ejercicios
            'ejercicio': '¡Perfecto! Te voy a dar un ejercicio. Traduce al Ngäbe: "Buenos días, ¿cómo estás?" La respuesta sería: "Ngäbere, ¿mä nämene?" ¿Quieres practicar más?',
            'exercise': '¡Perfecto! Te voy a dar un ejercicio. Traduce al Ngäbe: "Buenos días, ¿cómo estás?" La respuesta sería: "Ngäbere, ¿mä nämene?" ¿Quieres practicar más?',
            'practicar': '¡Perfecto! Te voy a dar un ejercicio. Traduce al Ngäbe: "Buenos días, ¿cómo estás?" La respuesta sería: "Ngäbere, ¿mä nämene?" ¿Quieres practicar más?',
            
            // Saludos
            'hola': '¡Hola! ¿Cómo puedo ayudarte hoy con las lenguas indígenas de Panamá?',
            'hello': '¡Hola! ¿Cómo puedo ayudarte hoy con las lenguas indígenas de Panamá?',
            
            // Lenguas específicas
            'ngäbe': '¡Excelente! El Ngäbe es una lengua fascinante. Se habla principalmente en las provincias de Chiriquí, Bocas del Toro y Veraguas. ¿Qué quieres saber sobre el Ngäbe?',
            'emberá': '¡Genial! El Emberá es hablado por el pueblo Emberá en Darién y otras regiones. Es una lengua tonal muy interesante. ¿Qué te gustaría aprender?',
            'guna': '¡Perfecto! El Guna (o Dulegaya) es la lengua del pueblo Guna, principalmente en Guna Yala. Tienen una cultura muy rica. ¿Qué quieres saber?',
            'naso': '¡Interesante! El Naso es hablado por el pueblo Naso en Bocas del Toro. Es una lengua única con características muy especiales. ¿Qué te interesa?',
            
            // Palabras básicas
            'agua': 'En Ngäbe: "ti"<br>En Emberá: "bä"<br>En Guna: "di"<br>En Naso: "dö"',
            'sol': 'En Ngäbe: "nä"<br>En Emberá: "e'da"<br>En Guna: "nusa"<br>En Naso: "nö"',
            'luna': 'En Ngäbe: "nä"<br>En Emberá: "e'da"<br>En Guna: "nusa"<br>En Naso: "nö"',
            
            // Preguntas generales
            'ayuda': '¡Por supuesto! Puedo ayudarte con:<br>• Traducciones entre español y lenguas indígenas<br>• Explicaciones de gramática<br>• Información cultural<br>• Ejercicios de práctica<br><br>¿En qué puedo ayudarte?',
            'help': '¡Por supuesto! Puedo ayudarte con:<br>• Traducciones entre español y lenguas indígenas<br>• Explicaciones de gramática<br>• Información cultural<br>• Ejercicios de práctica<br><br>¿En qué puedo ayudarte?',
            
            // Despedidas
            'adiós': '¡Hasta luego! Ha sido un placer ayudarte con las lenguas indígenas de Panamá. ¡Sigue practicando!',
            'gracias': '¡De nada! Me encanta ayudarte a aprender sobre las lenguas indígenas de Panamá. ¿Hay algo más en lo que pueda ayudarte?',
            'thanks': '¡De nada! Me encanta ayudarte a aprender sobre las lenguas indígenas de Panamá. ¿Hay algo más en lo que pueda ayudarte?'
        };

        // Buscar respuesta específica
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }

        // Respuestas por defecto
        const defaultResponses = [
            '¡Interesante pregunta! Las lenguas indígenas de Panamá son muy ricas. ¿Te gustaría que te ayude con traducciones, gramática, cultura o ejercicios?',
            '¡Me encanta tu curiosidad! ¿Qué lengua indígena te interesa más: Ngäbe, Emberá, Guna o Naso?',
            '¡Excelente! ¿Qué te gustaría aprender hoy? Puedo ayudarte con traducciones, explicaciones gramaticales, información cultural o ejercicios de práctica.',
            '¡Genial pregunta! Las lenguas indígenas de Panamá tienen mucho que ofrecer. ¿En qué puedo ayudarte específicamente?'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    setupCommunityEvents(communitySection) {
        const chatBtn = communitySection.querySelector('.btn');
        const rankingBtn = communitySection.querySelector('.btn-secondary');

        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                console.log('Abrir chat comunitario');
                this.dispatchEvent(new CustomEvent('openChat', {
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (rankingBtn) {
            rankingBtn.addEventListener('click', () => {
                console.log('Ver ranking');
                this.dispatchEvent(new CustomEvent('viewRanking', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }

    setupProfileEvents(profileSection) {
        const editProfileBtn = profileSection.querySelector('.btn');

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                console.log('Editar perfil');
                this.dispatchEvent(new CustomEvent('editProfile', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }

    setupSettingsEvents(settingsSection) {
        const themeBtn = settingsSection.querySelector('.btn');
        const notificationsBtn = settingsSection.querySelector('.btn-secondary');
        const privacyBtn = settingsSection.querySelector('.btn:nth-of-type(3)');
        const dataBtn = settingsSection.querySelector('.btn:nth-of-type(4)');

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                console.log('Cambiar tema');
                this.dispatchEvent(new CustomEvent('changeTheme', {
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => {
                console.log('Configurar notificaciones');
                this.dispatchEvent(new CustomEvent('configureNotifications', {
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (privacyBtn) {
            privacyBtn.addEventListener('click', () => {
                console.log('Gestionar privacidad');
                this.dispatchEvent(new CustomEvent('managePrivacy', {
                    bubbles: true,
                    composed: true
                }));
            });
        }

        if (dataBtn) {
            dataBtn.addEventListener('click', () => {
                console.log('Gestionar datos');
                this.dispatchEvent(new CustomEvent('manageData', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
}

customElements.define('dashboard-app', DashboardApp); 