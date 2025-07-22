class AchievementsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.achievements = [
            {
                id: 1,
                title: 'First Steps',
                description: 'Complete your first lesson',
                icon: 'fas fa-star',
                color: '#FFD23F',
                unlocked: true,
                progress: 100,
                xp: 50
            },
            {
                id: 2,
                title: '7 Day Streak',
                description: 'Maintain a 7-day learning streak',
                icon: 'fas fa-fire',
                color: '#FF6B35',
                unlocked: true,
                progress: 100,
                xp: 100
            },
            {
                id: 3,
                title: 'Vocabulary Master',
                description: 'Learn 100 basic words',
                icon: 'fas fa-book',
                color: '#2ECC71',
                unlocked: false,
                progress: 65,
                xp: 150
            },
            {
                id: 4,
                title: 'Conversation Starter',
                description: 'Complete 10 conversation lessons',
                icon: 'fas fa-comments',
                color: '#3498DB',
                unlocked: false,
                progress: 40,
                xp: 200
            },
            {
                id: 5,
                title: 'Level 10',
                description: 'Reach level 10',
                icon: 'fas fa-trophy',
                color: '#9B59B6',
                unlocked: false,
                progress: 80,
                xp: 300
            },
            {
                id: 6,
                title: 'Dedicated Student',
                description: 'Study for 30 consecutive days',
                icon: 'fas fa-calendar-check',
                color: '#E74C3C',
                unlocked: false,
                progress: 20,
                xp: 500
            },
            {
                id: 7,
                title: 'Perfect Score',
                description: 'Get 100% on any lesson',
                icon: 'fas fa-percentage',
                color: '#1ABC9C',
                unlocked: false,
                progress: 0,
                xp: 100
            },
            {
                id: 8,
                title: 'Language Explorer',
                description: 'Complete lessons in all categories',
                icon: 'fas fa-globe',
                color: '#F39C12',
                unlocked: false,
                progress: 25,
                xp: 400
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

                .achievements-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Header Section */
                .achievements-header {
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

                .achievements-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }

                .achievements-subtitle {
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

                /* Filter Tabs */
                .filter-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }

                .filter-tab {
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 25px;
                    background: rgba(255, 255, 255, 0.9);
                    color: #666;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .filter-tab.active {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .filter-tab:hover {
                    transform: translateY(-2px);
                }

                /* Achievements Grid */
                .achievements-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                }

                .achievement-card {
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

                .achievement-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .achievement-card:hover::before {
                    left: 100%;
                }

                .achievement-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .achievement-card.unlocked {
                    border: 2px solid;
                    animation: glow 2s infinite alternate;
                }

                .achievement-card.unlocked.rare {
                    border-color: #4A90E2;
                    box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
                }

                .achievement-card.unlocked.epic {
                    border-color: #9B59B6;
                    box-shadow: 0 0 20px rgba(155, 89, 182, 0.3);
                }

                .achievement-card.unlocked.legendary {
                    border-color: #F39C12;
                    box-shadow: 0 0 20px rgba(243, 156, 18, 0.3);
                }

                .achievement-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .achievement-icon {
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

                .achievement-info h3 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .achievement-info p {
                    color: #666;
                    font-size: 0.9rem;
                    font-family: 'Poppins', sans-serif;
                    line-height: 1.4;
                }

                .achievement-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .rarity-badge {
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .rarity-badge.common {
                    background: rgba(128, 128, 128, 0.2);
                    color: #666;
                }

                .rarity-badge.uncommon {
                    background: rgba(80, 200, 120, 0.2);
                    color: #50C878;
                }

                .rarity-badge.rare {
                    background: rgba(74, 144, 226, 0.2);
                    color: #4A90E2;
                }

                .rarity-badge.epic {
                    background: rgba(155, 89, 182, 0.2);
                    color: #9B59B6;
                }

                .rarity-badge.legendary {
                    background: rgba(243, 156, 18, 0.2);
                    color: #F39C12;
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

                .achievement-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .status-unlocked {
                    color: #50C878;
                }

                .status-locked {
                    color: #999;
                }

                .unlock-date {
                    font-size: 0.8rem;
                    color: #999;
                    font-style: italic;
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

                @keyframes glow {
                    from { box-shadow: 0 0 20px rgba(74, 144, 226, 0.3); }
                    to { box-shadow: 0 0 30px rgba(74, 144, 226, 0.5); }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .achievements-title {
                        font-size: 2rem;
                    }

                    .achievements-grid {
                        grid-template-columns: 1fr;
                    }

                    .filter-tabs {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            </style>

            <div class="achievements-container">
                <!-- Header Section -->
                <div class="achievements-header">
                    <h1 class="achievements-title">Achievements & Conquests</h1>
                    <div class="achievements-stats">
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span>2 of 8 achievements unlocked</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>150 XP from achievements</span>
                        </div>
                    </div>
                </div>

                <!-- Filter Tabs -->
                <div class="filter-tabs">
                    <button class="filter-tab active" data-filter="all">All</button>
                    <button class="filter-tab" data-filter="unlocked">Unlocked</button>
                    <button class="filter-tab" data-filter="locked">Locked</button>
                    <button class="filter-tab" data-filter="rare">Rare</button>
                    <button class="filter-tab" data-filter="epic">Epic</button>
                </div>

                <!-- Achievements Grid -->
                <div class="achievements-grid">
                    ${this.achievements.map(achievement => this.renderAchievementCard(achievement)).join('')}
                </div>
            </div>
        `;
    }

    renderAchievementCard(achievement) {
        const progressFillStyle = `width: ${achievement.progress}%; background: linear-gradient(90deg, ${achievement.color}, ${this.adjustColor(achievement.color, -20)});`;
        const rarityClass = achievement.rarity;
        const unlockedClass = achievement.unlocked ? 'unlocked' : '';
        
        return `
            <div class="achievement-card ${unlockedClass} ${rarityClass}" data-achievement-id="${achievement.id}" data-rarity="${achievement.rarity}" data-status="${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-header">
                    <div class="achievement-icon" style="background: linear-gradient(135deg, ${achievement.color}, ${this.adjustColor(achievement.color, -20)});">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="achievement-info">
                        <h3>${achievement.title}</h3>
                        <p>${achievement.description}</p>
                    </div>
                </div>

                <div class="achievement-meta">
                    <span class="rarity-badge ${rarityClass}">${this.getRarityText(achievement.rarity)}</span>
                    <div class="xp-badge">
                        <i class="fas fa-star"></i>
                        <span>${achievement.xp} XP</span>
                    </div>
                </div>

                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-text">Progress</span>
                        <span class="progress-percentage">${achievement.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="${progressFillStyle}"></div>
                    </div>
                </div>

                <div class="achievement-status">
                    ${achievement.unlocked ? `
                        <i class="fas fa-check-circle status-unlocked"></i>
                        <span class="status-unlocked">Unlocked</span>
                        <span class="unlock-date">${this.formatDate(achievement.date)}</span>
                    ` : `
                        <i class="fas fa-lock status-locked"></i>
                        <span class="status-locked">Locked</span>
                    `}
                </div>
            </div>
        `;
    }

    getRarityText(rarity) {
        const rarityMap = {
            'common': 'Common',
            'uncommon': 'Uncommon',
            'rare': 'Rare',
            'epic': 'Epic',
            'legendary': 'Legendary'
        };
        return rarityMap[rarity] || rarity;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
        const filterTabs = this.shadowRoot.querySelectorAll('.filter-tab');
        const achievementCards = this.shadowRoot.querySelectorAll('.achievement-card');
        
        // Filter functionality
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.filter;
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter achievements
                achievementCards.forEach(card => {
                    const status = card.dataset.status;
                    const rarity = card.dataset.rarity;
                    
                    let show = false;
                    switch (filter) {
                        case 'all':
                            show = true;
                            break;
                        case 'unlocked':
                            show = status === 'unlocked';
                            break;
                        case 'locked':
                            show = status === 'locked';
                            break;
                        case 'rare':
                            show = rarity === 'rare' || rarity === 'epic' || rarity === 'legendary';
                            break;
                        case 'epic':
                            show = rarity === 'epic' || rarity === 'legendary';
                            break;
                    }
                    
                    card.style.display = show ? 'block' : 'none';
                });
            });
        });

        // Achievement card clicks
        achievementCards.forEach(card => {
            card.addEventListener('click', () => {
                const achievementId = card.dataset.achievementId;
                const achievement = this.achievements.find(a => a.id == achievementId);
                
                this.dispatchEvent(new CustomEvent('achievementClicked', {
                    detail: { achievement }
                }));
            });
        });
    }

    startAnimations() {
        const achievementCards = this.shadowRoot.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
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
    updateAchievementProgress(achievementId, progress) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement) {
            achievement.progress = progress;
            if (progress >= 100 && !achievement.unlocked) {
                achievement.unlocked = true;
                achievement.date = new Date().toISOString().split('T')[0];
            }
            this.render();
        }
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement) {
            achievement.unlocked = true;
            achievement.progress = 100;
            achievement.date = new Date().toISOString().split('T')[0];
            this.render();
        }
    }
}

customElements.define('achievements-section', AchievementsSection); 