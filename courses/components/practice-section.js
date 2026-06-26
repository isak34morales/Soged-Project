/**
 * Practice Section Web Component
 * Modern component for interactive practice modes
 */

class PracticeSection extends HTMLElement {
    constructor() {
        super();
        this.currentCourse = this.getAttribute('course') || 'ngabe';
        this.activeMode = null;
        this.userStats = JSON.parse(localStorage.getItem('practiceStats') || '{}');
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        this.loadPracticeData();
    }

    render() {
        this.innerHTML = `
            <style>
                /* Practice Section Styles */
                .practice-section {
                    padding: 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .practice-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    background: linear-gradient(135deg, var(--gradient-info));
                    color: white;
                    padding: 2.5rem;
                    border-radius: var(--border-radius-xl);
                    position: relative;
                    overflow: hidden;
                }

                .practice-header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                    animation: float 20s linear infinite;
                }

                @keyframes float {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
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

                .practice-stats {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius);
                    backdrop-filter: blur(10px);
                    text-align: center;
                }

                .stat-number {
                    font-size: 2rem;
                    font-weight: 700;
                    display: block;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }

                .practice-modes {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .mode-card {
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius-lg);
                    padding: 2rem;
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-fast);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid transparent;
                }

                .mode-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--gradient-primary);
                    transform: scaleX(0);
                    transition: transform var(--transition-fast);
                }

                .mode-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--primary-color);
                }

                .mode-card:hover::before {
                    transform: scaleX(1);
                }

                .mode-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto 1.5rem;
                    color: white;
                    position: relative;
                }

                .mode-card.flashcards .mode-icon {
                    background: var(--gradient-primary);
                }

                .mode-card.pronunciation .mode-icon {
                    background: var(--gradient-accent);
                }

                .mode-card.listening .mode-icon {
                    background: var(--gradient-info);
                }

                .mode-card.games .mode-icon {
                    background: var(--gradient-secondary);
                }

                .mode-card.cultural .mode-icon {
                    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
                }

                .mode-card.speaking .mode-icon {
                    background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%);
                }

                .mode-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }

                .mode-description {
                    text-align: center;
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .mode-stats {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: var(--bg-tertiary);
                    border-radius: var(--border-radius);
                }

                .mode-stat {
                    text-align: center;
                    flex: 1;
                }

                .mode-stat-value {
                    font-weight: 600;
                    color: var(--primary-color);
                    display: block;
                    font-size: 1.1rem;
                }

                .mode-stat-label {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin-top: 0.25rem;
                }

                .mode-button {
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    border-radius: var(--border-radius);
                    font-weight: 600;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .mode-card.flashcards .mode-button {
                    background: var(--gradient-primary);
                    color: white;
                }

                .mode-card.pronunciation .mode-button {
                    background: var(--gradient-accent);
                    color: white;
                }

                .mode-card.listening .mode-button {
                    background: var(--gradient-info);
                    color: white;
                }

                .mode-card.games .mode-button {
                    background: var(--gradient-secondary);
                    color: white;
                }

                .mode-card.cultural .mode-button {
                    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
                    color: white;
                }

                .mode-card.speaking .mode-button {
                    background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%);
                    color: white;
                }

                .mode-button:hover {
                    transform: scale(1.02);
                    box-shadow: var(--shadow-md);
                }

                .difficulty-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    padding: 0.25rem 0.75rem;
                    border-radius: var(--border-radius);
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .difficulty-beginner {
                    background: var(--gradient-success);
                    color: white;
                }

                .difficulty-intermediate {
                    background: var(--gradient-secondary);
                    color: white;
                }

                .difficulty-advanced {
                    background: var(--gradient-accent);
                    color: white;
                }

                .daily-challenges {
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius-lg);
                    padding: 2rem;
                    box-shadow: var(--shadow-md);
                    margin-bottom: 2rem;
                }

                .challenges-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                }

                .challenges-title {
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .challenges-streak {
                    background: var(--gradient-accent);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius);
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .challenge-item {
                    display: flex;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--bg-tertiary);
                    border-radius: var(--border-radius);
                    margin-bottom: 1rem;
                    transition: all var(--transition-fast);
                    cursor: pointer;
                }

                .challenge-item:hover {
                    background: var(--bg-primary);
                    transform: translateX(8px);
                }

                .challenge-item.completed {
                    background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1));
                    border-left: 4px solid var(--success-color);
                }

                .challenge-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    margin-right: 1.5rem;
                    background: var(--gradient-primary);
                    color: white;
                }

                .challenge-info {
                    flex-grow: 1;
                }

                .challenge-title {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--text-primary);
                }

                .challenge-description {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .challenge-reward {
                    text-align: right;
                    color: var(--primary-color);
                    font-weight: 600;
                }

                .challenge-progress {
                    width: 100%;
                    height: 6px;
                    background: var(--bg-primary);
                    border-radius: 3px;
                    margin-top: 0.5rem;
                    overflow: hidden;
                }

                .challenge-progress-bar {
                    height: 100%;
                    background: var(--gradient-primary);
                    border-radius: 3px;
                    transition: width var(--transition-slow);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .practice-section {
                        padding: 1rem;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .practice-stats {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .practice-modes {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .mode-card {
                        padding: 1.5rem;
                    }

                    .challenges-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .challenge-item {
                        flex-direction: column;
                        text-align: center;
                        padding: 1rem;
                    }

                    .challenge-icon {
                        margin-right: 0;
                        margin-bottom: 1rem;
                    }
                }
            </style>

            <div class="practice-section">
                <div class="practice-header" data-aos="fade-up">
                    <h2 class="section-title">🎯 Practice Hub</h2>
                    <p class="section-subtitle">Reinforce your ${this.getCourseName()} skills with interactive exercises</p>
                    
                    <div class="practice-stats">
                        <div class="stat-card">
                            <span class="stat-number">47</span>
                            <span class="stat-label">Sessions</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Day Streak</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">89%</span>
                            <span class="stat-label">Accuracy</span>
                        </div>
                    </div>
                </div>

                <div class="practice-modes" data-aos="fade-up" data-aos-delay="100">
                    <div class="mode-card flashcards">
                        <div class="difficulty-badge difficulty-beginner">Beginner</div>
                        <div class="mode-icon">
                            <i class="fas fa-layer-group"></i>
                        </div>
                        <h3 class="mode-title">Smart Flashcards</h3>
                        <p class="mode-description">Adaptive vocabulary review with spaced repetition algorithm</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">23</span>
                                <span class="mode-stat-label">Cards Due</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">5</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+50</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('flashcards')">
                            <i class="fas fa-play"></i>
                            Start Review
                        </button>
                    </div>

                    <div class="mode-card pronunciation">
                        <div class="difficulty-badge difficulty-intermediate">Intermediate</div>
                        <div class="mode-icon">
                            <i class="fas fa-microphone"></i>
                        </div>
                        <h3 class="mode-title">Pronunciation Coach</h3>
                        <p class="mode-description">AI-powered speech recognition with instant feedback</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">15</span>
                                <span class="mode-stat-label">Words</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">10</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+75</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('pronunciation')">
                            <i class="fas fa-microphone"></i>
                            Start Speaking
                        </button>
                    </div>

                    <div class="mode-card listening">
                        <div class="difficulty-badge difficulty-intermediate">Intermediate</div>
                        <div class="mode-icon">
                            <i class="fas fa-headphones"></i>
                        </div>
                        <h3 class="mode-title">Listening Comprehension</h3>
                        <p class="mode-description">Native speaker audio with progressive difficulty</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">8</span>
                                <span class="mode-stat-label">Exercises</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">15</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+100</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('listening')">
                            <i class="fas fa-headphones"></i>
                            Start Listening
                        </button>
                    </div>

                    <div class="mode-card games">
                        <div class="difficulty-badge difficulty-beginner">Beginner</div>
                        <div class="mode-icon">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <h3 class="mode-title">Language Games</h3>
                        <p class="mode-description">Fun mini-games to reinforce vocabulary and grammar</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">6</span>
                                <span class="mode-stat-label">Games</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">20</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+125</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('games')">
                            <i class="fas fa-gamepad"></i>
                            Play Games
                        </button>
                    </div>

                    <div class="mode-card cultural">
                        <div class="difficulty-badge difficulty-advanced">Advanced</div>
                        <div class="mode-icon">
                            <i class="fas fa-mountain"></i>
                        </div>
                        <h3 class="mode-title">Cultural Immersion</h3>
                        <p class="mode-description">Learn through traditional stories and cultural contexts</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">4</span>
                                <span class="mode-stat-label">Stories</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">25</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+150</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('cultural')">
                            <i class="fas fa-book-open"></i>
                            Explore Culture
                        </button>
                    </div>

                    <div class="mode-card speaking">
                        <div class="difficulty-badge difficulty-advanced">Advanced</div>
                        <div class="mode-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <h3 class="mode-title">Conversation Practice</h3>
                        <p class="mode-description">AI chat partner for realistic conversation practice</p>
                        
                        <div class="mode-stats">
                            <div class="mode-stat">
                                <span class="mode-stat-value">∞</span>
                                <span class="mode-stat-label">Topics</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">30</span>
                                <span class="mode-stat-label">Minutes</span>
                            </div>
                            <div class="mode-stat">
                                <span class="mode-stat-value">+200</span>
                                <span class="mode-stat-label">XP</span>
                            </div>
                        </div>
                        
                        <button class="mode-button" onclick="startPracticeMode('speaking')">
                            <i class="fas fa-comments"></i>
                            Start Chat
                        </button>
                    </div>
                </div>

                <div class="daily-challenges" data-aos="fade-up" data-aos-delay="200">
                    <div class="challenges-header">
                        <h3 class="challenges-title">
                            <i class="fas fa-calendar-day"></i>
                            Daily Challenges
                        </h3>
                        <div class="challenges-streak">
                            <i class="fas fa-fire"></i>
                            <span>12 Day Streak</span>
                        </div>
                    </div>
                    
                    <div class="challenges-list">
                        ${this.generateDailyChallenges()}
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

    generateDailyChallenges() {
        const challenges = [
            {
                id: 'vocab',
                title: 'Vocabulary Sprint',
                description: 'Learn 10 new words in 5 minutes',
                icon: 'fa-bolt',
                reward: '+100 XP',
                progress: 70,
                completed: false
            },
            {
                id: 'pronunciation',
                title: 'Perfect Pronunciation',
                description: 'Score 90%+ on pronunciation test',
                icon: 'fa-microphone',
                reward: '+150 XP',
                progress: 100,
                completed: true
            },
            {
                id: 'streak',
                title: 'Keep the Streak',
                description: 'Complete any lesson today',
                icon: 'fa-fire',
                reward: '+75 XP',
                progress: 0,
                completed: false
            },
            {
                id: 'cultural',
                title: 'Cultural Explorer',
                description: 'Read one traditional story',
                icon: 'fa-book',
                reward: '+125 XP',
                progress: 40,
                completed: false
            }
        ];

        return challenges.map(challenge => `
            <div class="challenge-item ${challenge.completed ? 'completed' : ''}" data-challenge="${challenge.id}">
                <div class="challenge-icon">
                    <i class="fas ${challenge.icon}"></i>
                </div>
                
                <div class="challenge-info">
                    <div class="challenge-title">${challenge.title}</div>
                    <div class="challenge-description">${challenge.description}</div>
                    <div class="challenge-progress">
                        <div class="challenge-progress-bar" style="width: ${challenge.progress}%"></div>
                    </div>
                </div>
                
                <div class="challenge-reward">
                    ${challenge.completed ? '✅' : challenge.reward}
                </div>
            </div>
        `).join('');
    }

    initializeEventListeners() {
        // Mode cards
        this.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.mode-button')) {
                    const button = card.querySelector('.mode-button');
                    if (button) button.click();
                }
            });
        });

        // Challenge items
        this.querySelectorAll('.challenge-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const challengeId = item.getAttribute('data-challenge');
                this.startChallenge(challengeId);
            });
        });
    }

    startChallenge(challengeId) {
        console.log(`Starting challenge: ${challengeId}`);
        showNotification(`Starting ${challengeId} challenge!`, 'info');
        
        // Trigger challenge event
        this.dispatchEvent(new CustomEvent('challengeStarted', {
            detail: { challengeId: challengeId, course: this.currentCourse },
            bubbles: true
        }));
    }

    loadPracticeData() {
        // Load practice statistics and progress
        const stats = JSON.parse(localStorage.getItem(`practice_${this.currentCourse}`) || '{}');
        // Update UI with loaded data
    }

    savePracticeData() {
        // Save practice progress
        localStorage.setItem(`practice_${this.currentCourse}`, JSON.stringify(this.userStats));
    }
}

// Register the custom element
customElements.define('practice-section', PracticeSection);

// Global function for starting practice modes
window.startPracticeMode = function(mode) {
    console.log(`Starting practice mode: ${mode}`);
    
    const messages = {
        'flashcards': 'Starting flashcard review! 📚',
        'pronunciation': 'Ready to practice speaking! 🎤',
        'listening': 'Time for listening practice! 🎧',
        'games': 'Let\'s play some language games! 🎮',
        'cultural': 'Exploring cultural stories! 🏔️',
        'speaking': 'Starting AI conversation! 💬'
    };
    
    showNotification(messages[mode] || 'Starting practice!', 'success');
    
    // Here you would implement the actual practice mode logic
    // For now, we'll simulate starting the mode
    setTimeout(() => {
        showNotification(`${mode} mode loaded successfully!`, 'info');
    }, 1000);
};
