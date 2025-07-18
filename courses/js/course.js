// Course Page JavaScript
class CoursePage {
    constructor() {
        this.currentLesson = null;
        this.courseData = {
            id: 'ngabe',
            name: 'Ngäbe',
            progress: 75,
            level: 3,
            streak: 7,
            xp: 750,
            lessons: [
                {
                    id: 'l1_1',
                    title: 'Saludos',
                    level: 1,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-hand-wave'
                },
                {
                    id: 'l1_2',
                    title: 'Presentaciones',
                    level: 1,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-user'
                },
                {
                    id: 'l1_3',
                    title: 'Familia',
                    level: 1,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-home'
                },
                {
                    id: 'l2_1',
                    title: 'Comida',
                    level: 2,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-utensils'
                },
                {
                    id: 'l2_2',
                    title: 'Tiempo',
                    level: 2,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-clock'
                },
                {
                    id: 'l2_3',
                    title: 'Compras',
                    level: 2,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-shopping-bag'
                },
                {
                    id: 'l3_1',
                    title: 'Montañas',
                    level: 3,
                    progress: 100,
                    status: 'completed',
                    icon: 'fas fa-mountain'
                },
                {
                    id: 'l3_2',
                    title: 'Ríos',
                    level: 3,
                    progress: 75,
                    status: 'current',
                    icon: 'fas fa-water'
                },
                {
                    id: 'l3_3',
                    title: 'Plantas',
                    level: 3,
                    progress: 0,
                    status: 'locked',
                    icon: 'fas fa-leaf'
                },
                {
                    id: 'l3_4',
                    title: 'Animales',
                    level: 3,
                    progress: 0,
                    status: 'locked',
                    icon: 'fas fa-paw'
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateProgressRing();
        this.startAnimations();
        this.loadCourseData();
    }

    setupEventListeners() {
        // Lesson card clicks
        const lessonCards = document.querySelectorAll('.lesson-card');
        lessonCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!card.classList.contains('locked')) {
                    this.handleLessonClick(card);
                }
            });
        });

        // Continue button
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.startCurrentLesson();
            });
        }

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                this.handleActionClick(action);
            });
        });

        // Back button
        const backBtn = document.querySelector('.back-button a');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                this.saveProgress();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleLessonClick(card) {
        const lessonTitle = card.querySelector('h4').textContent;
        const lessonStatus = card.classList.contains('completed') ? 'completed' : 
                           card.classList.contains('current') ? 'current' : 'locked';
        
        console.log(`Lesson clicked: ${lessonTitle} (${lessonStatus})`);
        
        if (lessonStatus === 'current') {
            this.startCurrentLesson();
        } else if (lessonStatus === 'completed') {
            this.reviewLesson(lessonTitle);
        }
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    startCurrentLesson() {
        const currentLesson = this.courseData.lessons.find(l => l.status === 'current');
        if (currentLesson) {
            console.log(`Starting lesson: ${currentLesson.title}`);
            
            // Show loading animation
            this.showLoadingAnimation();
            
            // Simulate lesson start
            setTimeout(() => {
                this.hideLoadingAnimation();
                this.openLessonModal(currentLesson);
            }, 1000);
        }
    }

    reviewLesson(lessonTitle) {
        console.log(`Reviewing lesson: ${lessonTitle}`);
        
        // Show review modal
        this.showReviewModal(lessonTitle);
    }

    handleActionClick(action) {
        console.log(`Action clicked: ${action}`);
        
        switch (action) {
            case 'Comenzar':
                this.startReview();
                break;
            case 'Participar':
                this.startChallenge();
                break;
            case 'Unirse':
                this.joinPractice();
                break;
        }
    }

    startReview() {
        console.log('Starting review session...');
        this.showNotification('Repaso iniciado', 'success');
    }

    startChallenge() {
        console.log('Starting challenge...');
        this.showNotification('Desafío iniciado', 'success');
    }

    joinPractice() {
        console.log('Joining practice session...');
        this.showNotification('Sesión de práctica iniciada', 'success');
    }

    openLessonModal(lesson) {
        // Create modal for lesson
        const modal = document.createElement('div');
        modal.className = 'lesson-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${lesson.title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>¿Estás listo para continuar con la lección "${lesson.title}"?</p>
                    <div class="modal-actions">
                        <button class="btn-primary">Comenzar Lección</button>
                        <button class="btn-secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = modal.querySelector('.btn-secondary');
        const startBtn = modal.querySelector('.btn-primary');
        
        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        startBtn.addEventListener('click', () => {
            modal.remove();
            this.navigateToLesson(lesson);
        });
    }

    showReviewModal(lessonTitle) {
        const modal = document.createElement('div');
        modal.className = 'lesson-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Repasar: ${lessonTitle}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>¿Quieres repasar la lección "${lessonTitle}"?</p>
                    <div class="modal-actions">
                        <button class="btn-primary">Repasar</button>
                        <button class="btn-secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = modal.querySelector('.btn-secondary');
        const reviewBtn = modal.querySelector('.btn-primary');
        
        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        reviewBtn.addEventListener('click', () => {
            modal.remove();
            this.startReviewSession(lessonTitle);
        });
    }

    navigateToLesson(lesson) {
        // Navigate to lesson page
        const lessonUrl = `lesson.html?id=${lesson.id}&title=${encodeURIComponent(lesson.title)}`;
        window.location.href = lessonUrl;
    }

    startReviewSession(lessonTitle) {
        console.log(`Starting review session for: ${lessonTitle}`);
        this.showNotification('Repaso iniciado', 'success');
    }

    animateProgressRing() {
        const progressRing = document.querySelector('.progress-ring-fill');
        if (progressRing) {
            const progress = this.courseData.progress;
            const circumference = 2 * Math.PI * 26; // r = 26
            const offset = circumference - (progress / 100) * circumference;
            
            progressRing.style.strokeDasharray = circumference;
            progressRing.style.strokeDashoffset = offset;
        }
    }

    startAnimations() {
        // Animate stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.8s ease-out';
            }, index * 200);
        });

        // Animate level sections
        const levelSections = document.querySelectorAll('.level-section');
        levelSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'slideInUp 0.8s ease-out';
            }, index * 300);
        });

        // Animate action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.8s ease-out';
            }, index * 200);
        });
    }

    showLoadingAnimation() {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Cargando lección...</p>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideLoadingAnimation() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case 'Escape':
                // Close any open modals
                const modals = document.querySelectorAll('.lesson-modal');
                modals.forEach(modal => modal.remove());
                break;
            case 'Enter':
                // Start current lesson if focused on continue button
                if (document.activeElement.classList.contains('continue-btn')) {
                    this.startCurrentLesson();
                }
                break;
        }
    }

    loadCourseData() {
        // Load course data from localStorage or API
        const savedProgress = localStorage.getItem(`course_${this.courseData.id}_progress`);
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.updateProgress(progress);
        }
    }

    saveProgress() {
        // Save progress to localStorage
        localStorage.setItem(`course_${this.courseData.id}_progress`, JSON.stringify({
            progress: this.courseData.progress,
            level: this.courseData.level,
            streak: this.courseData.streak,
            xp: this.courseData.xp,
            lessons: this.courseData.lessons
        }));
    }

    updateProgress(newProgress) {
        this.courseData = { ...this.courseData, ...newProgress };
        this.updateUI();
    }

    updateUI() {
        // Update progress ring
        this.animateProgressRing();
        
        // Update stats
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = this.courseData.streak;
            statValues[1].textContent = this.courseData.level;
            statValues[2].textContent = this.courseData.xp;
        }
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${this.courseData.progress}%`;
        }
    }
}

// Initialize course page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoursePage();
});

// Add CSS for modals and notifications
const additionalStyles = `
    .lesson-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: slideInUp 0.3s ease;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .modal-header h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2c3e50;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .close-btn:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
    }

    .modal-body p {
        color: #666;
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    .btn-primary, .btn-secondary {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-primary {
        background: linear-gradient(135deg, #4A90E2, #7B68EE);
        color: white;
    }

    .btn-secondary {
        background: rgba(0, 0, 0, 0.1);
        color: #666;
    }

    .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .loading-spinner {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .loading-spinner i {
        font-size: 2rem;
        color: #4A90E2;
        margin-bottom: 1rem;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-left: 4px solid #50C878;
    }

    .notification-success i {
        color: #50C878;
    }

    .notification-info {
        border-left: 4px solid #4A90E2;
    }

    .notification-info i {
        color: #4A90E2;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 