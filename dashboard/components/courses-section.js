class CoursesSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.courses = [
            {
                id: 1,
                title: 'Ngäbe',
                description: 'Indigenous language of Panama - Learn Ngäbe culture and traditions',
                progress: 75,
                lessons: 60,
                completed: 45,
                difficulty: 'Intermediate',
                color: '#4A90E2',
                icon: 'fas fa-leaf',
                status: 'in-progress',
                xp: 750,
                level: 3
            },
            {
                id: 2,
                title: 'Emberá',
                description: 'Indigenous language of Panama - Discover Emberá cultural richness',
                progress: 45,
                lessons: 60,
                completed: 27,
                difficulty: 'Beginner',
                color: '#50C878',
                icon: 'fas fa-tree',
                status: 'in-progress',
                xp: 500,
                level: 2
            },
            {
                id: 3,
                title: 'Guna',
                description: 'Indigenous language of Panama - Explore Guna culture',
                progress: 30,
                lessons: 60,
                completed: 18,
                difficulty: 'Beginner',
                color: '#FF6B6B',
                icon: 'fas fa-mountain',
                status: 'in-progress',
                xp: 300,
                level: 1
            },
            {
                id: 4,
                title: 'Naso',
                description: 'Indigenous language of Panama - Learn Naso culture',
                progress: 0,
                lessons: 60,
                completed: 0,
                difficulty: 'Beginner',
                color: '#9B59B6',
                icon: 'fas fa-water',
                status: 'locked',
                xp: 0,
                level: 0
            }
        ];
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

                .courses-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Header Section */
                .courses-header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    animation: slideInDown 0.8s ease-out;
                }

                .courses-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }

                .courses-subtitle {
                    font-size: 1.2rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                    margin-bottom: 1.5rem;
                }

                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(74, 144, 226, 0.1);
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    color: #4A90E2;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                }

                .stat-item i {
                    font-size: 1.2rem;
                }

                /* Courses Grid */
                .courses-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2rem;
                }

                .course-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }

                .course-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .course-card:hover::before {
                    left: 100%;
                }

                .course-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .course-card.locked {
                    opacity: 0.6;
                    filter: grayscale(0.3);
                }

                .course-card.locked:hover {
                    transform: none;
                    cursor: not-allowed;
                }

                .course-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .course-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                    position: relative;
                    z-index: 2;
                }

                .course-info h3 {
                    font-size: 1.4rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .course-info p {
                    color: #666;
                    font-size: 0.95rem;
                    font-family: 'Poppins', sans-serif;
                    line-height: 1.4;
                }

                .course-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .difficulty-badge {
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .difficulty-badge.beginner {
                    background: rgba(80, 200, 120, 0.2);
                    color: #50C878;
                }

                .difficulty-badge.intermediate {
                    background: rgba(74, 144, 226, 0.2);
                    color: #4A90E2;
                }

                .difficulty-badge.advanced {
                    background: rgba(255, 107, 107, 0.2);
                    color: #FF6B6B;
                }

                .difficulty-badge.expert {
                    background: rgba(231, 76, 60, 0.2);
                    color: #E74C3C;
                }

                .xp-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: white;
                    padding: 0.4rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .progress-section {
                    margin-bottom: 1.5rem;
                }

                .progress-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .progress-text {
                    font-size: 0.9rem;
                    color: #666;
                    font-weight: 600;
                }

                .progress-percentage {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #4A90E2;
                }

                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(74, 144, 226, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                }

                .progress-fill {
                    height: 100%;
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

                .course-actions {
                    display: flex;
                    gap: 1rem;
                }

                .action-btn {
                    flex: 1;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 15px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .action-btn.primary {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                }

                .action-btn.primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .action-btn.secondary {
                    background: rgba(74, 144, 226, 0.1);
                    color: #4A90E2;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                }

                .action-btn.secondary:hover {
                    background: rgba(74, 144, 226, 0.2);
                }

                .action-btn.locked {
                    background: rgba(128, 128, 128, 0.1);
                    color: #999;
                    cursor: not-allowed;
                }

                .action-btn.locked:hover {
                    transform: none;
                    box-shadow: none;
                }

                /* Status Indicators */
                .status-indicator {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .status-indicator.completed {
                    background: #50C878;
                    box-shadow: 0 0 10px rgba(80, 200, 120, 0.5);
                }

                .status-indicator.in-progress {
                    background: #4A90E2;
                    box-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
                    animation: pulse 2s infinite;
                }

                .status-indicator.locked {
                    background: #999;
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
                    50% { transform: scale(1.2); }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .courses-title {
                        font-size: 2rem;
                    }

                    .courses-grid {
                        grid-template-columns: 1fr;
                    }

                    .stats-row {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            </style>

            <div class="courses-container">
                <!-- Header Section -->
                <div class="courses-header">
                    <h1 class="courses-title">Your Current Course</h1>
                    <p class="courses-subtitle">Continue your learning journey</p>
                    <div class="stats-row">
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <span>2 of 6 courses completed</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>1,250 XP total</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span>Level 8 reached</span>
                        </div>
                    </div>
                </div>

                <!-- Courses Grid -->
                <div class="courses-grid">
                    ${this.courses.map(course => this.renderCourseCard(course)).join('')}
                </div>
            </div>
        `;
    }

    renderCourseCard(course) {
        const progressFillStyle = `width: ${course.progress}%; background: linear-gradient(90deg, ${course.color}, ${this.adjustColor(course.color, -20)});`;
        const difficultyClass = course.difficulty.toLowerCase();
        
        return `
            <div class="course-card ${course.status}" data-course-id="${course.id}">
                <div class="status-indicator ${course.status}"></div>
                
                <div class="course-header">
                    <div class="course-icon" style="background: linear-gradient(135deg, ${course.color}, ${this.adjustColor(course.color, -20)});">
                        <i class="${course.icon}"></i>
                    </div>
                    <div class="course-info">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                    </div>
                </div>

                <div class="course-meta">
                    <span class="difficulty-badge ${difficultyClass}">${course.difficulty}</span>
                    <div class="xp-badge">
                        <i class="fas fa-star"></i>
                        <span>${course.xp} XP</span>
                    </div>
                </div>

                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-text">${course.completed} of ${course.lessons} lessons</span>
                        <span class="progress-percentage">${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="${progressFillStyle}"></div>
                    </div>
                </div>

                <div class="course-actions">
                    ${this.renderActionButtons(course)}
                </div>
            </div>
        `;
    }

    renderActionButtons(course) {
        if (course.status === 'completed') {
            return `
                <button class="action-btn secondary" data-action="review">
                    <i class="fas fa-redo"></i> Review
                </button>
                <button class="action-btn primary" data-action="certificate">
                    <i class="fas fa-certificate"></i> Certificate
                </button>
            `;
        } else if (course.status === 'in-progress') {
            return `
                <button class="action-btn secondary" data-action="review">
                    <i class="fas fa-redo"></i> Review
                </button>
                <button class="action-btn primary" data-action="continue">
                    <i class="fas fa-play"></i> Continue
                </button>
            `;
        } else {
            return `
                <button class="action-btn locked" data-action="locked">
                    <i class="fas fa-lock"></i> Locked
                </button>
                <button class="action-btn locked" data-action="requirements">
                    <i class="fas fa-info-circle"></i> Requirements
                </button>
            `;
        }
    }

    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    setupEventListeners() {
        const courseCards = this.shadowRoot.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.action-btn')) {
                    const button = e.target.closest('.action-btn');
                    const action = button.dataset.action;
                    const courseId = card.dataset.courseId;
                    const course = this.courses.find(c => c.id == courseId);
                    
                    this.handleCourseAction(action, course);
                }
            });
        });
    }

    handleCourseAction(action, course) {
        switch (action) {
            case 'continue':
                // Navigate to specific course page based on course ID
                let courseUrl;
                switch (course.id) {
                    case 'ngabe':
                        courseUrl = '../courses/ngabe-course.html';
                        break;
                    case 'embera':
                        courseUrl = '../courses/embera-course.html';
                        break;
                    case 'kuna':
                        courseUrl = '../courses/kuna-course.html';
                        break;
                    case 'bribri':
                        courseUrl = '../courses/bribri-course.html';
                        break;
                    default:
                        courseUrl = '../courses/ngabe-course.html';
                }
                window.location.href = courseUrl;
                break;
            case 'review':
                this.dispatchEvent(new CustomEvent('reviewCourse', {
                    detail: { course }
                }));
                break;
            case 'certificate':
                this.dispatchEvent(new CustomEvent('viewCertificate', {
                    detail: { course }
                }));
                break;
            case 'requirements':
                this.dispatchEvent(new CustomEvent('viewRequirements', {
                    detail: { course }
                }));
                break;
        }
    }

    startAnimations() {
        const courseCards = this.shadowRoot.querySelectorAll('.course-card');
        courseCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 150);
        });

        // Animate progress bars
        setTimeout(() => {
            const progressFills = this.shadowRoot.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 500);
            });
        }, 1000);
    }

    // Public methods
    updateCourseProgress(courseId, progress) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            course.progress = progress;
            course.completed = Math.floor((progress / 100) * course.lessons);
            this.render();
        }
    }

    unlockCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            course.status = 'in-progress';
            this.render();
        }
    }
}

customElements.define('courses-section', CoursesSection); 