/**
 * Guna Lesson Viewer Web Component
 * Interactive lesson viewer for Guna language lessons
 */

class GunaLessonViewer extends HTMLElement {
    constructor() {
        super();
        this.currentLessonId = parseInt(this.getAttribute('lesson-id')) || 1;
        this.currentSectionIndex = 0;
        this.gunaLessons = new GunaLessons();
        this.lessonContent = null;
        this.userAnswers = {};
        this.quizCompleted = false;
    }

    connectedCallback() {
        this.loadLesson();
        this.render();
        this.initializeEventListeners();
    }

    loadLesson() {
        this.lessonContent = this.gunaLessons.getLessonContent(this.currentLessonId);
    }

    render() {
        if (!this.lessonContent) {
            this.innerHTML = '<p>Loading lesson...</p>';
            return;
        }

        this.innerHTML = `
            <style>
                .lesson-viewer {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 2rem;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .lesson-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    padding: 2rem;
                    background: linear-gradient(135deg, #00A3E0, #29B6F6);
                    color: white;
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                }

                .lesson-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23pattern)"/></svg>');
                    opacity: 0.3;
                }

                .lesson-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    position: relative;
                    z-index: 1;
                }

                .lesson-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    position: relative;
                    z-index: 1;
                }

                .lesson-stats {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: block;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }

                .section-navigation {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }

                .section-tab {
                    padding: 0.75rem 1.5rem;
                    background: var(--bg-tertiary);
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .section-tab.active {
                    background: linear-gradient(135deg, #00A3E0, #29B6F6);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 160, 224, 0.3);
                }

                .section-tab:hover:not(.active) {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-1px);
                }

                .section-content {
                    min-height: 400px;
                    padding: 2rem;
                    background: var(--bg-secondary);
                    border-radius: 16px;
                    margin-bottom: 2rem;
                }

                .lesson-intro {
                    text-align: center;
                }

                .intro-header h2 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }

                .cultural-context {
                    margin-top: 2rem;
                    text-align: left;
                }

                .cultural-highlights {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }

                .highlight-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .highlight-item i {
                    color: var(--primary-color);
                    font-size: 1.2rem;
                }

                .vocabulary-section {
                    text-align: left;
                }

                .vocabulary-table {
                    margin: 2rem 0;
                    overflow-x: auto;
                }

                .vocabulary-table table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .vocabulary-table th,
                .vocabulary-table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--bg-tertiary);
                }

                .vocabulary-table th {
                    background: var(--primary-color);
                    color: white;
                    font-weight: 600;
                }

                .vocabulary-table tr:hover {
                    background: var(--bg-tertiary);
                }

                .pronunciation-tips {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-top: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .pronunciation-tips ul {
                    list-style: none;
                    padding: 0;
                }

                .pronunciation-tips li {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--bg-tertiary);
                }

                .pronunciation-tips li:last-child {
                    border-bottom: none;
                }

                .interactive-section {
                    text-align: left;
                }

                .quiz-container {
                    margin: 2rem 0;
                }

                .quiz-question {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .quiz-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .quiz-option {
                    padding: 1rem;
                    background: var(--bg-tertiary);
                    border: 2px solid transparent;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .quiz-option:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-2px);
                }

                .quiz-option.selected {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }

                .quiz-option.correct {
                    background: var(--success-color);
                    color: white;
                    border-color: var(--success-color);
                }

                .quiz-option.incorrect {
                    background: var(--danger-color);
                    color: white;
                    border-color: var(--danger-color);
                }

                .quiz-feedback {
                    margin-top: 1rem;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 500;
                }

                .quiz-feedback.correct {
                    background: rgba(46, 204, 113, 0.1);
                    color: var(--success-color);
                    border: 1px solid var(--success-color);
                }

                .quiz-feedback.incorrect {
                    background: rgba(231, 76, 60, 0.1);
                    color: var(--danger-color);
                    border: 1px solid var(--danger-color);
                }

                .matching-exercise {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-top: 1rem;
                }

                .matching-pairs {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .matching-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--bg-tertiary);
                    border-radius: 8px;
                }

                .guna-text {
                    font-weight: 600;
                    color: var(--primary-color);
                    min-width: 120px;
                }

                .matching-select {
                    padding: 0.5rem;
                    border: 2px solid var(--bg-tertiary);
                    border-radius: 8px;
                    background: white;
                    font-size: 1rem;
                }

                .check-matching-btn {
                    padding: 0.75rem 1.5rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                }

                .quiz-results {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    margin-top: 2rem;
                }

                .progress-bar {
                    width: 100%;
                    height: 20px;
                    background: var(--bg-tertiary);
                    border-radius: 10px;
                    overflow: hidden;
                    margin: 1rem 0;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(135deg, var(--success-color), #27AE60);
                    transition: width 0.5s ease;
                }

                .conversation-section {
                    text-align: left;
                }

                .conversation-scenarios {
                    margin: 2rem 0;
                }

                .scenario {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .scenario-options {
                    display: flex;
                    gap: 1rem;
                    margin: 1rem 0;
                    flex-wrap: wrap;
                }

                .scenario-option {
                    padding: 0.75rem 1rem;
                    background: var(--bg-tertiary);
                    border: 2px solid transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .scenario-option:hover {
                    background: var(--primary-color);
                    color: white;
                }

                .scenario-option.selected {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }

                .lesson-summary {
                    text-align: left;
                }

                .summary-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                }

                .learned-greetings,
                .cultural-notes,
                .next-steps {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .lesson-completion {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .complete-lesson-btn,
                .review-lesson-btn {
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .complete-lesson-btn {
                    background: linear-gradient(135deg, var(--success-color), #27AE60);
                    color: white;
                }

                .review-lesson-btn {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                }

                .complete-lesson-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
                }

                .review-lesson-btn:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-2px);
                }

                .navigation-buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                }

                .nav-btn {
                    padding: 0.75rem 1.5rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .nav-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 160, 224, 0.3);
                }

                .nav-btn:disabled {
                    background: var(--bg-tertiary);
                    color: var(--text-light);
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                @media (max-width: 768px) {
                    .lesson-viewer {
                        padding: 1rem;
                    }

                    .lesson-title {
                        font-size: 2rem;
                    }

                    .lesson-stats {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .section-navigation {
                        flex-direction: column;
                    }

                    .quiz-options {
                        grid-template-columns: 1fr;
                    }

                    .scenario-options {
                        flex-direction: column;
                    }

                    .summary-content {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <div class="lesson-viewer">
                <div class="lesson-header">
                    <h1 class="lesson-title">${this.lessonContent.title}</h1>
                    <p class="lesson-subtitle">${this.lessonContent.subtitle}</p>
                    
                    <div class="lesson-stats">
                        <div class="stat-item">
                            <span class="stat-value">${this.lessonContent.duration}</span>
                            <span class="stat-label">minutes</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.lessonContent.xp}</span>
                            <span class="stat-label">XP</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.lessonContent.sections.length}</span>
                            <span class="stat-label">sections</span>
                        </div>
                    </div>
                </div>

                <div class="section-navigation">
                    ${this.lessonContent.sections.map((section, index) => `
                        <button class="section-tab ${index === this.currentSectionIndex ? 'active' : ''}" 
                                data-section="${index}">
                            ${this.getSectionIcon(section.type)} ${section.title}
                        </button>
                    `).join('')}
                </div>

                <div class="section-content">
                    ${this.lessonContent.sections[this.currentSectionIndex].content}
                </div>

                <div class="navigation-buttons">
                    <button class="nav-btn" id="prevBtn" ${this.currentSectionIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                    <button class="nav-btn" id="nextBtn" ${this.currentSectionIndex === this.lessonContent.sections.length - 1 ? 'disabled' : ''}>
                        Next <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getSectionIcon(type) {
        const icons = {
            'introduction': '📚',
            'vocabulary': '📖',
            'interactive': '🎯',
            'conversation': '💬',
            'summary': '📝'
        };
        return icons[type] || '📄';
    }

    initializeEventListeners() {
        // Section navigation
        this.querySelectorAll('.section-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const sectionIndex = parseInt(e.target.dataset.section);
                this.navigateToSection(sectionIndex);
            });
        });

        // Navigation buttons
        this.querySelector('#prevBtn').addEventListener('click', () => {
            this.navigateToSection(this.currentSectionIndex - 1);
        });

        this.querySelector('#nextBtn').addEventListener('click', () => {
            this.navigateToSection(this.currentSectionIndex + 1);
        });

        // Quiz interactions
        this.setupQuizInteractions();

        // Conversation scenarios
        this.setupConversationInteractions();

        // Lesson completion
        this.setupCompletionInteractions();
    }

    navigateToSection(sectionIndex) {
        if (sectionIndex >= 0 && sectionIndex < this.lessonContent.sections.length) {
            this.currentSectionIndex = sectionIndex;
            this.render();
            this.initializeEventListeners();
        }
    }

    setupQuizInteractions() {
        // Quiz options
        this.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const question = e.target.closest('.quiz-question');
                const questionId = question.dataset.question;
                
                // Remove previous selections
                question.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Select current option
                e.target.classList.add('selected');
                
                // Store answer
                this.userAnswers[questionId] = e.target.dataset.answer;
                
                // Show feedback
                this.showQuizFeedback(questionId, e.target.dataset.answer);
            });
        });

        // Matching exercise
        const checkMatchingBtn = this.querySelector('.check-matching-btn');
        if (checkMatchingBtn) {
            checkMatchingBtn.addEventListener('click', () => {
                this.checkMatchingAnswers();
            });
        }

        // Quiz results
        const retryQuizBtn = this.querySelector('.retry-quiz-btn');
        if (retryQuizBtn) {
            retryQuizBtn.addEventListener('click', () => {
                this.retryQuiz();
            });
        }

        const continueLessonBtn = this.querySelector('.continue-lesson-btn');
        if (continueLessonBtn) {
            continueLessonBtn.addEventListener('click', () => {
                this.navigateToSection(this.currentSectionIndex + 1);
            });
        }
    }

    setupConversationInteractions() {
        this.querySelectorAll('.scenario-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const scenario = e.target.closest('.scenario');
                const scenarioId = scenario.dataset.scenario;
                
                // Remove previous selections
                scenario.querySelectorAll('.scenario-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Select current option
                e.target.classList.add('selected');
                
                // Show response
                const response = scenario.querySelector('.scenario-response');
                if (response) {
                    response.style.display = 'block';
                }
            });
        });
    }

    setupCompletionInteractions() {
        const completeLessonBtn = this.querySelector('.complete-lesson-btn');
        if (completeLessonBtn) {
            completeLessonBtn.addEventListener('click', () => {
                this.completeLesson();
            });
        }

        const reviewLessonBtn = this.querySelector('.review-lesson-btn');
        if (reviewLessonBtn) {
            reviewLessonBtn.addEventListener('click', () => {
                this.navigateToSection(0);
            });
        }
    }

    showQuizFeedback(questionId, userAnswer) {
        const question = this.querySelector(`[data-question="${questionId}"]`);
        const feedback = question.querySelector('.quiz-feedback');
        const correctAnswers = this.gunaLessons.getQuizAnswers();
        
        if (questionId <= 3) {
            // Multiple choice questions
            const isCorrect = userAnswer === correctAnswers[questionId];
            const selectedOption = question.querySelector(`[data-answer="${userAnswer}"]`);
            
            if (isCorrect) {
                selectedOption.classList.add('correct');
                feedback.textContent = "¡Correcto! Well done!";
                feedback.className = 'quiz-feedback correct';
            } else {
                selectedOption.classList.add('incorrect');
                feedback.textContent = `Incorrect. The correct answer is: ${correctAnswers[questionId]}`;
                feedback.className = 'quiz-feedback incorrect';
            }
        }
        
        feedback.style.display = 'block';
        
        // Check if all questions are answered
        this.checkQuizCompletion();
    }

    checkMatchingAnswers() {
        const matchingExercise = this.querySelector('.matching-exercise');
        const feedback = matchingExercise.querySelector('.matching-feedback');
        const correctAnswers = this.gunaLessons.getQuizAnswers()[4];
        
        let allCorrect = true;
        const userAnswers = {};
        
        matchingExercise.querySelectorAll('.matching-item').forEach(item => {
            const pairId = item.dataset.pair;
            const select = item.querySelector('.matching-select');
            const userAnswer = select.value;
            userAnswers[pairId] = userAnswer;
            
            if (userAnswer === correctAnswers[pairId]) {
                select.style.borderColor = 'var(--success-color)';
                select.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            } else {
                select.style.borderColor = 'var(--danger-color)';
                select.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
                allCorrect = false;
            }
        });
        
        this.userAnswers[4] = userAnswers;
        
        if (allCorrect) {
            feedback.textContent = "¡Perfecto! All matches are correct!";
            feedback.className = 'matching-feedback correct';
        } else {
            feedback.textContent = "Some matches are incorrect. Try again!";
            feedback.className = 'matching-feedback incorrect';
        }
        
        feedback.style.display = 'block';
        this.checkQuizCompletion();
    }

    checkQuizCompletion() {
        const totalQuestions = 4;
        const answeredQuestions = Object.keys(this.userAnswers).length;
        
        if (answeredQuestions === totalQuestions) {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const results = this.gunaLessons.validateQuiz(this.userAnswers);
        const resultsDiv = this.querySelector('.quiz-results');
        const correctAnswersSpan = resultsDiv.querySelector('.correct-answers');
        const progressFill = resultsDiv.querySelector('.progress-fill');
        
        correctAnswersSpan.textContent = results.score;
        progressFill.style.width = `${results.percentage}%`;
        
        resultsDiv.style.display = 'block';
        this.quizCompleted = true;
        
        // Save progress
        this.gunaLessons.saveProgress(this.currentLessonId, {
            quizScore: results.score,
            quizPercentage: results.percentage,
            completed: true
        });
    }

    retryQuiz() {
        this.userAnswers = {};
        this.quizCompleted = false;
        
        // Reset quiz state
        this.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        this.querySelectorAll('.quiz-feedback').forEach(feedback => {
            feedback.style.display = 'none';
        });
        
        this.querySelectorAll('.matching-select').forEach(select => {
            select.value = '';
            select.style.borderColor = '';
            select.style.backgroundColor = '';
        });
        
        this.querySelector('.matching-feedback').style.display = 'none';
        this.querySelector('.quiz-results').style.display = 'none';
    }

    completeLesson() {
        // Save final progress
        this.gunaLessons.saveProgress(this.currentLessonId, {
            completed: true,
            completedAt: new Date().toISOString()
        });
        
        // Show completion notification
        this.showNotification('🎉 Lesson completed! Great job!', 'success');
        
        // Trigger lesson completion event
        this.dispatchEvent(new CustomEvent('lessonCompleted', {
            detail: {
                lessonId: this.currentLessonId,
                course: 'guna'
            },
            bubbles: true
        }));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#2ECC71' : '#00A3E0',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Register the custom element
customElements.define('guna-lesson-viewer', GunaLessonViewer);
