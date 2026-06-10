/**
 * Learning Section Web Component
 * Modern component for interactive learning section
 */

class LearningSection extends HTMLElement {
    constructor() {
        super();
        this.currentCourse = this.getAttribute('course') || 'ngabe';
        this.userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        this.loadUserProgress();
        this.setupSidebarListener();
    }

    setupSidebarListener() {
        // Listen for sidebar state changes
        document.addEventListener('sidebarStateChanged', (e) => {
            const { collapsed, width } = e.detail;
            this.adjustToSidebar(collapsed, width);
        });
    }

    adjustToSidebar(collapsed, width) {
        const section = this.querySelector('.learning-section');
        if (section) {
            // Adjust padding and spacing when sidebar is collapsed
            if (collapsed) {
                section.style.padding = '1.5rem';
                section.style.maxWidth = '100%';
            } else {
                section.style.padding = '2rem';
                section.style.maxWidth = '1200px';
            }
        }
    }

    render() {
        this.innerHTML = `
            <style>
                /* Component-specific styles */
                .learning-section {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .learning-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    background: linear-gradient(135deg, var(--gradient-primary));
                    color: white;
                    padding: 2rem;
                    border-radius: var(--border-radius-xl);
                    position: relative;
                    overflow: hidden;
                }

                .learning-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23pattern)"/></svg>');
                    opacity: 0.3;
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    position: relative;
                    z-index: 1;
                }

                .section-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    position: relative;
                    z-index: 1;
                }



                .learning-path {
                    position: relative;
                    padding: 2rem 0;
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-md);
                    margin-bottom: 2rem;
                }

                .path-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 0 2rem;
                }

                .lesson-node {
                    display: flex;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--bg-tertiary);
                    border-radius: var(--border-radius);
                    transition: all var(--transition-fast);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .lesson-node::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: var(--text-light);
                    transition: all var(--transition-fast);
                }

                .lesson-node.completed::before {
                    background: var(--gradient-success);
                }

                .lesson-node.current::before {
                    background: var(--gradient-primary);
                }

                .lesson-node.locked::before {
                    background: var(--text-light);
                }

                .lesson-node:hover {
                    transform: translateX(8px);
                    box-shadow: var(--shadow-md);
                }

                .lesson-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    margin-right: 1.5rem;
                    flex-shrink: 0;
                }

                .lesson-node.completed .lesson-icon {
                    background: var(--gradient-success);
                    color: white;
                }

                .lesson-node.current .lesson-icon {
                    background: var(--gradient-primary);
                    color: white;
                    animation: pulse 2s infinite;
                }

                .lesson-node.locked .lesson-icon {
                    background: var(--bg-primary);
                    color: var(--text-light);
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                .lesson-info {
                    flex-grow: 1;
                }

                .lesson-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--text-primary);
                }

                .lesson-description {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-bottom: 0.75rem;
                }

                .lesson-stats {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.85rem;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: var(--text-secondary);
                }

                .lesson-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: flex-end;
                }

                .lesson-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: var(--border-radius);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .btn-primary {
                    background: var(--gradient-primary);
                    color: white;
                }

                .btn-secondary {
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    border: 1px solid var(--text-light);
                }

                .btn-disabled {
                    background: var(--bg-primary);
                    color: var(--text-light);
                    cursor: not-allowed;
                }

                .lesson-btn:hover:not(.btn-disabled) {
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-sm);
                }

                .progress-indicator {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--bg-secondary);
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-sm);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .boss-node {
                    background: linear-gradient(135deg, var(--gradient-accent));
                    color: white;
                    position: relative;
                }

                .boss-node::before {
                    background: var(--accent-color) !important;
                }

                .boss-badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: var(--gradient-accent);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: var(--border-radius);
                    font-size: 0.7rem;
                    font-weight: 700;
                    box-shadow: var(--shadow-md);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .learning-section {
                        padding: 1rem;
                    }

                    .section-title {
                        font-size: 2rem;
                    }



                    .lesson-node {
                        flex-direction: column;
                        text-align: center;
                        padding: 1rem;
                    }

                    .lesson-icon {
                        margin-right: 0;
                        margin-bottom: 1rem;
                    }

                    .lesson-actions {
                        align-items: center;
                        margin-top: 1rem;
                    }
                }
            </style>

            <div class="learning-section">
                <div class="learning-header" data-aos="fade-up">
                    <h2 class="section-title">🎯 Interactive Learning Path</h2>
                    <p class="section-subtitle">Master ${this.getCourseName()} through gamified lessons and cultural immersion</p>
                    

                </div>

                <div class="learning-path" data-aos="fade-up" data-aos-delay="100">
                    <div class="progress-indicator">
                        Progress: <span id="progressText">3/12 Lessons</span>
                    </div>
                    
                    <div class="path-container" id="pathContainer">
                        ${this.generateLessonsForCourse()}
                    </div>
                </div>
            </div>
        `;
    }

    getCourseName() {
        const names = {
            'ngabe': 'Ngäbe',
            'guna': 'Guna',
            'embera': 'Emberá',
            'naso': 'Naso'
        };
        return names[this.currentCourse] || 'Indigenous Language';
    }

    generateLessonsForCourse() {
        const lessons = this.getLessonsData();
        return lessons.map(lesson => `
            <div class="lesson-node ${lesson.status} ${lesson.type === 'boss' ? 'boss-node' : ''}" data-lesson="${lesson.id}">
                ${lesson.type === 'boss' ? '<div class="boss-badge">BOSS</div>' : ''}
                
                <div class="lesson-icon">
                    <i class="fas ${this.getLessonIcon(lesson.status, lesson.type)}"></i>
                </div>
                
                <div class="lesson-info">
                    <h3 class="lesson-title">${lesson.title}</h3>
                    <p class="lesson-description">${lesson.description}</p>
                    
                    <div class="lesson-stats">
                        <span class="stat-item">
                            <i class="fas fa-star"></i>
                            +${lesson.xp} XP
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-clock"></i>
                            ${lesson.duration} min
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-layer-group"></i>
                            ${lesson.exercises} exercises
                        </span>
                    </div>
                </div>
                
                <div class="lesson-actions">
                    ${this.getLessonButton(lesson)}
                </div>
            </div>
        `).join('');
    }

    getLessonsData() {
        // Data específica por curso
        const courseLessons = {
            'ngabe': [
                { id: 1, title: 'Basic Greetings', description: 'Learn essential greetings and polite expressions', status: 'completed', xp: 50, duration: 15, exercises: 8, type: 'normal' },
                { id: 2, title: 'Numbers 1-10', description: 'Master counting and basic numbers', status: 'completed', xp: 75, duration: 20, exercises: 12, type: 'normal' },
                { id: 3, title: 'Family Members', description: 'Identify family relationships and roles', status: 'current', xp: 100, duration: 25, exercises: 15, type: 'normal' },
                { id: 4, title: 'Colors & Nature', description: 'Describe the natural world around you', status: 'locked', xp: 125, duration: 30, exercises: 18, type: 'normal' },
                { id: 5, title: 'Level 1 Assessment', description: 'Test your knowledge with cultural scenarios', status: 'locked', xp: 200, duration: 45, exercises: 25, type: 'boss' }
            ],
            'guna': [
                { id: 1, title: 'Island Greetings', description: 'Traditional Guna welcome expressions', status: 'completed', xp: 50, duration: 15, exercises: 8, type: 'normal' },
                { id: 2, title: 'Ocean Numbers', description: 'Counting like the sea people', status: 'current', xp: 75, duration: 20, exercises: 12, type: 'normal' },
                { id: 3, title: 'Mola Patterns', description: 'Learn textile-related vocabulary', status: 'locked', xp: 100, duration: 25, exercises: 15, type: 'normal' },
                { id: 4, title: 'Sea Creatures', description: 'Marine life and fishing terms', status: 'locked', xp: 125, duration: 30, exercises: 18, type: 'normal' },
                { id: 5, title: 'Cultural Wisdom', description: 'Traditional stories and values', status: 'locked', xp: 200, duration: 45, exercises: 25, type: 'boss' }
            ],
            'embera': [
                { id: 1, title: 'River Greetings', description: 'Welcome expressions from the rainforest', status: 'completed', xp: 50, duration: 15, exercises: 8, type: 'normal' },
                { id: 2, title: 'Jungle Numbers', description: 'Counting in the forest way', status: 'current', xp: 75, duration: 20, exercises: 12, type: 'normal' },
                { id: 3, title: 'Craft Vocabulary', description: 'Basket weaving and traditional arts', status: 'locked', xp: 100, duration: 25, exercises: 15, type: 'normal' },
                { id: 4, title: 'Rainforest Life', description: 'Plants, animals, and survival', status: 'locked', xp: 125, duration: 30, exercises: 18, type: 'normal' },
                { id: 5, title: 'Shamanic Stories', description: 'Spiritual traditions and healing', status: 'locked', xp: 200, duration: 45, exercises: 25, type: 'boss' }
            ],
            'naso': [
                { id: 1, title: 'Royal Greetings', description: 'Formal expressions of the kingdom', status: 'completed', xp: 50, duration: 15, exercises: 8, type: 'normal' },
                { id: 2, title: 'Sacred Numbers', description: 'Counting in the traditional way', status: 'current', xp: 75, duration: 20, exercises: 12, type: 'normal' },
                { id: 3, title: 'Royal Family', description: 'Titles and hierarchy vocabulary', status: 'locked', xp: 100, duration: 25, exercises: 15, type: 'normal' },
                { id: 4, title: 'Mountain Spirits', description: 'Spiritual and nature vocabulary', status: 'locked', xp: 125, duration: 30, exercises: 18, type: 'normal' },
                { id: 5, title: 'Kingdom Legends', description: 'Historical stories and traditions', status: 'locked', xp: 200, duration: 45, exercises: 25, type: 'boss' }
            ]
        };

        return courseLessons[this.currentCourse] || courseLessons['ngabe'];
    }

    getLessonIcon(status, type) {
        if (type === 'boss') return 'fa-crown';
        
        switch(status) {
            case 'completed': return 'fa-check-circle';
            case 'current': return 'fa-play-circle';
            case 'locked': return 'fa-lock';
            default: return 'fa-circle';
        }
    }

    getLessonButton(lesson) {
        switch(lesson.status) {
            case 'completed':
                return `
                    <button class="lesson-btn btn-secondary" onclick="reviewLesson(${lesson.id})">
                        <i class="fas fa-redo"></i>
                        Review
                    </button>
                `;
            case 'current':
                return `
                    <button class="lesson-btn btn-primary" onclick="startLesson(${lesson.id})">
                        <i class="fas fa-play"></i>
                        Start Lesson
                    </button>
                `;
            case 'locked':
                return `
                    <button class="lesson-btn btn-disabled" disabled>
                        <i class="fas fa-lock"></i>
                        Locked
                    </button>
                `;
            default:
                return '';
        }
    }

    initializeEventListeners() {
        // Lesson nodes
        this.querySelectorAll('.lesson-node').forEach(node => {
            node.addEventListener('click', (e) => {
                if (!node.classList.contains('locked')) {
                    const lessonId = node.getAttribute('data-lesson');
                    this.selectLesson(lessonId);
                }
            });
        });
    }

    switchCourse(course) {
        if (this.currentCourse !== course) {
            this.currentCourse = course;
            this.setAttribute('course', course);
            
            // Update URL
            const url = new URL(window.location);
            url.searchParams.set('course', course);
            window.history.pushState({}, '', url);
            
            // Re-render with new course
            this.render();
            this.initializeEventListeners();
            
            // Trigger custom event
            this.dispatchEvent(new CustomEvent('courseChanged', {
                detail: { course: course },
                bubbles: true
            }));
        }
    }

    selectLesson(lessonId) {
        // Highlight selected lesson
        this.querySelectorAll('.lesson-node').forEach(node => {
            node.classList.remove('selected');
        });
        
        const selectedNode = this.querySelector(`[data-lesson="${lessonId}"]`);
        if (selectedNode) {
            selectedNode.classList.add('selected');
        }

        // Trigger lesson selection event
        this.dispatchEvent(new CustomEvent('lessonSelected', {
            detail: { lessonId: lessonId, course: this.currentCourse },
            bubbles: true
        }));
    }

    loadUserProgress() {
        // Load user progress from localStorage or API
        const progress = JSON.parse(localStorage.getItem(`progress_${this.currentCourse}`) || '{}');
        // Update UI based on progress
    }

    saveUserProgress() {
        // Save progress to localStorage or API
        localStorage.setItem(`progress_${this.currentCourse}`, JSON.stringify(this.userProgress));
    }
}

// Register the custom element
customElements.define('learning-section', LearningSection);

// Global functions for lesson interaction
window.startLesson = function(lessonId) {
    console.log(`Starting lesson ${lessonId}`);
    
    // Check if it's a Guna lesson
    const currentCourse = document.querySelector('learning-section')?.getAttribute('course') || 'ngabe';
    
    if (currentCourse === 'guna') {
        // Load Guna lesson viewer
        const contentContainer = document.getElementById('contentContainer');
        if (contentContainer) {
            contentContainer.innerHTML = `<guna-lesson-viewer lesson-id="${lessonId}"></guna-lesson-viewer>`;
            
            // Listen for lesson completion
            contentContainer.addEventListener('lessonCompleted', (e) => {
                const { lessonId, course } = e.detail;
                showNotification(`🎉 Lesson ${lessonId} completed! Great job!`, 'success');
                
                // Update lesson status in the learning path
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });
        }
    } else {
        // Default lesson start logic for other courses
        showNotification(`Starting lesson ${lessonId}!`, 'success');
    }
};

window.reviewLesson = function(lessonId) {
    console.log(`Reviewing lesson ${lessonId}`);
    
    // Check if it's a Guna lesson
    const currentCourse = document.querySelector('learning-section')?.getAttribute('course') || 'ngabe';
    
    if (currentCourse === 'guna') {
        // Load Guna lesson viewer in review mode
        const contentContainer = document.getElementById('contentContainer');
        if (contentContainer) {
            contentContainer.innerHTML = `<guna-lesson-viewer lesson-id="${lessonId}"></guna-lesson-viewer>`;
        }
    } else {
        // Default lesson review logic for other courses
        showNotification(`Reviewing lesson ${lessonId}!`, 'info');
    }
};

// Utility function for notifications
window.showNotification = function(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#2ECC71' : '#00A3E0',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};
