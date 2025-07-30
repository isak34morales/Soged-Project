class OverviewSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.stats = {
            streak: 7,
            totalPoints: 1250,
            level: 8,
            lessonsCompleted: 24,
            accuracy: 87,
            nextLesson: 'Lesson 5: Basic Conversations'
        };
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.startAnimations();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                    overflow-y: auto;
                    padding: 2rem;
                    box-sizing: border-box;
                }

                .overview-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    height: 100%;
                }

                /* Header Section */
                .welcome-header {
                    grid-column: 1 / -1;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    animation: slideInDown 0.8s ease-out;
                }

                .welcome-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .welcome-subtitle {
                    font-size: 1.2rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                    margin-bottom: 1.5rem;
                }

                .streak-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    font-family: 'Poppins', sans-serif;
                    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
                    animation: pulse 2s infinite;
                }

                /* Current Course Section */
                .current-course-section {
                    grid-column: 1 / -1;
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    margin-bottom: 1rem;
                }

                .course-card {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    border-radius: 25px;
                    padding: 2rem;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 15px 35px rgba(74, 144, 226, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .course-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                }

                .course-info {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 2;
                }

                .course-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                }

                .course-details h4 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .course-details p {
                    font-size: 1rem;
                    opacity: 0.9;
                    margin-bottom: 1rem;
                }

                .course-progress {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .progress-bar {
                    width: 200px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                    transition: width 1s ease;
                }

                .progress-text {
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .course-actions {
                    position: relative;
                    z-index: 2;
                }

                .continue-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .continue-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .streak-badge i {
                    font-size: 1.3rem;
                    animation: flame 1s infinite alternate;
                }

                /* Stats Cards */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    grid-column: 1 / -1;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .stat-card:hover::before {
                    left: 100%;
                }

                .stat-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 1.8rem;
                    color: white;
                    position: relative;
                    z-index: 2;
                }

                .stat-card.points .stat-icon {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
                }

                .stat-card.level .stat-icon {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .stat-card.lessons .stat-icon {
                    background: linear-gradient(135deg, #50C878, #32CD32);
                    box-shadow: 0 8px 20px rgba(80, 200, 120, 0.3);
                }

                .stat-card.accuracy .stat-icon {
                    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
                    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .stat-label {
                    font-size: 1rem;
                    color: #666;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* Progress Section */
                .progress-section {
                    grid-column: 1 / -1;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .progress-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                }

                .progress-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .progress-percentage {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #4A90E2;
                }

                .progress-bar {
                    width: 100%;
                    height: 12px;
                    background: rgba(74, 144, 226, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4A90E2, #7B68EE);
                    border-radius: 10px;
                    transition: width 1s ease;
                    position: relative;
                }

                .progress-fill::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: shimmer 2s infinite;
                }

                /* Next Lesson Card */
                .next-lesson-card {
                    grid-column: 1 / -1;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    border-radius: 25px;
                    padding: 2rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.3);
                }

                .next-lesson-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                }

                .next-lesson-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .next-lesson-info h3 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .next-lesson-info p {
                    opacity: 0.9;
                    font-size: 1rem;
                }

                .start-lesson-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .start-lesson-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                /* Animations */
                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes flame {
                    from { transform: scale(1) rotate(-5deg); }
                    to { transform: scale(1.1) rotate(5deg); }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .welcome-title {
                        font-size: 2rem;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .next-lesson-content {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>

            <div class="overview-container">
                <!-- Welcome Header -->
                <div class="welcome-header">
                    <h1 class="welcome-title">Welcome back, Maria!</h1>
                    <p class="welcome-subtitle">Ready to continue your language learning journey?</p>
                    <div class="streak-badge">
                        <i class="fas fa-fire"></i>
                        <span>7 Day Streak</span>
                    </div>
                </div>

                <!-- Current Course Section -->
                <div class="current-course-section">
                    <h3 class="section-title">Your Current Course</h3>
                    <div class="course-card">
                        <div class="course-info">
                            <div class="course-icon">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <div class="course-details">
                                <h4>Ngäbe</h4>
                                <p>Indigenous language of Panama</p>
                                <div class="course-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 75%"></div>
                                    </div>
                                    <span class="progress-text">75% completed</span>
                                </div>
                            </div>
                        </div>
                        <div class="course-actions">
                            <button class="continue-btn">
                                <i class="fas fa-play"></i>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="stats-grid">
                    <div class="stat-card points">
                        <div class="stat-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="stat-value" id="totalPoints">1,250</div>
                        <div class="stat-label">Total Points</div>
                    </div>

                    <div class="stat-card level">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-value" id="currentLevel">8</div>
                        <div class="stat-label">Current Level</div>
                    </div>

                    <div class="stat-card lessons">
                        <div class="stat-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="stat-value" id="lessonsCompleted">24</div>
                        <div class="stat-label">Lessons Completed</div>
                    </div>

                    <div class="stat-card accuracy">
                        <div class="stat-icon">
                            <i class="fas fa-bullseye"></i>
                        </div>
                        <div class="stat-value" id="accuracyRate">87%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                </div>

                <!-- Progress Section -->
                <div class="progress-section">
                    <div class="progress-header">
                        <h3 class="progress-title">Level Progress</h3>
                        <span class="progress-percentage">75%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                    </div>
                </div>

                <!-- Next Lesson Card -->
                <div class="next-lesson-card">
                    <div class="next-lesson-content">
                        <div class="next-lesson-info">
                            <h3>Next Lesson</h3>
                            <p>Lesson 5: Basic Conversations</p>
                        </div>
                        <button class="start-lesson-btn" id="startLessonBtn">
                            <i class="fas fa-play"></i> Start
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const startLessonBtn = this.shadowRoot.getElementById('startLessonBtn');
        
        startLessonBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('startLesson', {
                detail: { lesson: this.stats.nextLesson }
            }));
        });
    }

    startAnimations() {
        // Animate stats cards
        const statCards = this.shadowRoot.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 200);
        });

        // Animate progress bar
        setTimeout(() => {
            const progressFill = this.shadowRoot.querySelector('.progress-fill');
            progressFill.style.width = '75%';
        }, 1000);
    }

    // Public methods
    updateStats(newStats) {
        this.stats = { ...this.stats, ...newStats };
        this.updateDisplay();
    }

    updateDisplay() {
        const totalPointsEl = this.shadowRoot.getElementById('totalPoints');
        const currentLevelEl = this.shadowRoot.getElementById('currentLevel');
        const lessonsCompletedEl = this.shadowRoot.getElementById('lessonsCompleted');
        const accuracyRateEl = this.shadowRoot.getElementById('accuracyRate');

        if (totalPointsEl) totalPointsEl.textContent = this.stats.totalPoints.toLocaleString();
        if (currentLevelEl) currentLevelEl.textContent = this.stats.level;
        if (lessonsCompletedEl) lessonsCompletedEl.textContent = this.stats.lessonsCompleted;
        if (accuracyRateEl) accuracyRateEl.textContent = `${this.stats.accuracy}%`;
    }
}

customElements.define('overview-section', OverviewSection); 