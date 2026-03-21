/**
 * Stories Section Web Component
 * Component for interactive cultural stories
 */

class StoriesSection extends HTMLElement {
    constructor() {
        super();
        this.currentCourse = this.getAttribute('course') || 'ngabe';
        this.selectedStory = null;
        this.readingProgress = JSON.parse(localStorage.getItem('storyProgress') || '{}');
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        this.loadStoryProgress();
    }

    render() {
        this.innerHTML = `
            <style>
                /* Stories Section Styles */
                .stories-section {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .stories-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
                    color: white;
                    padding: 3rem 2rem;
                    border-radius: var(--border-radius-xl);
                    position: relative;
                    overflow: hidden;
                }

                .stories-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="0.5" fill="rgba(255,255,255,0.3)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
                    opacity: 0.4;
                }

                .section-title {
                    font-size: 2.8rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    position: relative;
                    z-index: 1;
                }

                .section-subtitle {
                    font-size: 1.3rem;
                    opacity: 0.9;
                    position: relative;
                    z-index: 1;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .cultural-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--border-radius-lg);
                    margin-top: 1.5rem;
                    backdrop-filter: blur(10px);
                    position: relative;
                    z-index: 1;
                    font-weight: 600;
                }

                .stories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .story-card {
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-fast);
                    cursor: pointer;
                    position: relative;
                    border: 2px solid transparent;
                }

                .story-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-xl);
                    border-color: var(--primary-color);
                }

                .story-image {
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(135deg, var(--gradient-primary));
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    color: white;
                    overflow: hidden;
                }

                .story-image::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 20%, transparent 70%);
                }

                .story-content {
                    padding: 2rem;
                }

                .story-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                    line-height: 1.3;
                }

                .story-description {
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .story-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: var(--bg-tertiary);
                    border-radius: var(--border-radius);
                }

                .story-difficulty {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .difficulty-dots {
                    display: flex;
                    gap: 0.25rem;
                }

                .difficulty-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--text-light);
                }

                .difficulty-dot.active {
                    background: var(--primary-color);
                }

                .story-duration {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .story-progress {
                    width: 100%;
                    height: 4px;
                    background: var(--bg-primary);
                    border-radius: 2px;
                    margin-bottom: 1rem;
                    overflow: hidden;
                }

                .story-progress-bar {
                    height: 100%;
                    background: var(--gradient-primary);
                    border-radius: 2px;
                    transition: width var(--transition-slow);
                }

                .story-actions {
                    display: flex;
                    gap: 1rem;
                }

                .story-button {
                    flex: 1;
                    padding: 1rem;
                    border: none;
                    border-radius: var(--border-radius);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
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

                .story-button:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-sm);
                }

                .story-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .story-tag {
                    padding: 0.25rem 0.75rem;
                    background: var(--gradient-secondary);
                    color: white;
                    border-radius: var(--border-radius);
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .featured-story {
                    grid-column: 1 / -1;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.1));
                    border: 2px solid rgba(139, 92, 246, 0.2);
                }

                .featured-story .story-image {
                    height: 300px;
                    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
                }

                .reading-stats {
                    background: var(--bg-secondary);
                    border-radius: var(--border-radius-lg);
                    padding: 2rem;
                    box-shadow: var(--shadow-md);
                    margin-bottom: 2rem;
                }

                .stats-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                }

                .stats-title {
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                }

                .stat-item {
                    text-align: center;
                    padding: 1.5rem;
                    background: var(--bg-tertiary);
                    border-radius: var(--border-radius);
                    transition: all var(--transition-fast);
                }

                .stat-item:hover {
                    background: var(--bg-primary);
                    transform: translateY(-4px);
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--primary-color);
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .story-categories {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }

                .category-filter {
                    padding: 0.75rem 1.5rem;
                    border: 2px solid var(--text-light);
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    border-radius: var(--border-radius-lg);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .category-filter:hover {
                    border-color: var(--primary-color);
                    background: var(--primary-color);
                    color: white;
                }

                .category-filter.active {
                    background: var(--gradient-primary);
                    border-color: var(--primary-color);
                    color: white;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .stories-section {
                        padding: 1rem;
                    }

                    .section-title {
                        font-size: 2.2rem;
                    }

                    .stories-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .featured-story {
                        grid-template-columns: 1fr;
                    }

                    .story-content {
                        padding: 1.5rem;
                    }

                    .story-actions {
                        flex-direction: column;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    .story-categories {
                        gap: 0.5rem;
                    }

                    .category-filter {
                        padding: 0.5rem 1rem;
                        font-size: 0.9rem;
                    }
                }
            </style>

            <div class="stories-section">
                <div class="stories-header" data-aos="fade-up">
                    <h2 class="section-title">📖 Cultural Stories</h2>
                    <p class="section-subtitle">Immerse yourself in the rich traditions and wisdom of ${this.getCourseName()} culture through interactive storytelling</p>
                    
                    <div class="cultural-badge">
                        <i class="fas fa-mountain"></i>
                        <span>Authentic ${this.getCourseName()} Heritage</span>
                    </div>
                </div>

                <div class="story-categories" data-aos="fade-up" data-aos-delay="100">
                    <button class="category-filter active" data-category="all">
                        <i class="fas fa-globe"></i>
                        All Stories
                    </button>
                    <button class="category-filter" data-category="legends">
                        <i class="fas fa-dragon"></i>
                        Legends
                    </button>
                    <button class="category-filter" data-category="wisdom">
                        <i class="fas fa-lightbulb"></i>
                        Wisdom
                    </button>
                    <button class="category-filter" data-category="nature">
                        <i class="fas fa-leaf"></i>
                        Nature
                    </button>
                    <button class="category-filter" data-category="family">
                        <i class="fas fa-heart"></i>
                        Family
                    </button>
                </div>

                <div class="reading-stats" data-aos="fade-up" data-aos-delay="150">
                    <div class="stats-header">
                        <h3 class="stats-title">
                            <i class="fas fa-chart-line"></i>
                            Your Reading Journey
                        </h3>
                    </div>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">7</span>
                            <span class="stat-label">Stories Completed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">45</span>
                            <span class="stat-label">Minutes Reading</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">156</span>
                            <span class="stat-label">New Words Learned</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">89%</span>
                            <span class="stat-label">Comprehension Rate</span>
                        </div>
                    </div>
                </div>

                <div class="stories-grid" data-aos="fade-up" data-aos-delay="200">
                    ${this.generateStoriesForCourse()}
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
        return names[this.currentCourse] || 'Indigenous';
    }

    generateStoriesForCourse() {
        const stories = this.getStoriesData();
        
        return stories.map((story, index) => {
            const isFeatured = index === 0;
            const progressPercent = this.readingProgress[story.id] || 0;
            
            return `
                <div class="story-card ${isFeatured ? 'featured-story' : ''}" data-story="${story.id}">
                    <div class="story-image">
                        <i class="fas ${story.icon}"></i>
                    </div>
                    
                    <div class="story-content">
                        <h3 class="story-title">${story.title}</h3>
                        <p class="story-description">${story.description}</p>
                        
                        <div class="story-meta">
                            <div class="story-difficulty">
                                <span>Difficulty:</span>
                                <div class="difficulty-dots">
                                    ${this.generateDifficultyDots(story.difficulty)}
                                </div>
                            </div>
                            <div class="story-duration">
                                <i class="fas fa-clock"></i>
                                <span>${story.duration} min</span>
                            </div>
                        </div>
                        
                        <div class="story-progress">
                            <div class="story-progress-bar" style="width: ${progressPercent}%"></div>
                        </div>
                        
                        <div class="story-actions">
                            <button class="story-button btn-primary" onclick="readStory('${story.id}')">
                                <i class="fas ${progressPercent > 0 ? 'fa-play' : 'fa-book-open'}"></i>
                                ${progressPercent > 0 ? 'Continue' : 'Start Reading'}
                            </button>
                            ${progressPercent > 0 ? `
                                <button class="story-button btn-secondary" onclick="reviewStory('${story.id}')">
                                    <i class="fas fa-redo"></i>
                                    Review
                                </button>
                            ` : ''}
                        </div>
                        
                        <div class="story-tags">
                            ${story.tags.map(tag => `<span class="story-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getStoriesData() {
        const courseStories = {
            'ngabe': [
                {
                    id: 'river-of-life',
                    title: 'The River of Life',
                    description: 'A sacred story about the origins of the Ngäbe people and their connection to the mountain rivers.',
                    icon: 'fa-water',
                    difficulty: 2,
                    duration: 15,
                    tags: ['Origin', 'Sacred', 'Nature'],
                    category: 'legends'
                },
                {
                    id: 'wise-grandmother',
                    title: 'The Wise Grandmother',
                    description: 'Traditional teachings about respect for elders and the wisdom they carry.',
                    icon: 'fa-female',
                    difficulty: 1,
                    duration: 10,
                    tags: ['Family', 'Wisdom', 'Tradition'],
                    category: 'wisdom'
                },
                {
                    id: 'mountain-spirits',
                    title: 'Mountain Spirits',
                    description: 'Learn about the spiritual guardians of the Ngäbe territory.',
                    icon: 'fa-mountain',
                    difficulty: 3,
                    duration: 20,
                    tags: ['Spiritual', 'Mountains', 'Guardians'],
                    category: 'legends'
                },
                {
                    id: 'corn-ceremony',
                    title: 'The Sacred Corn Ceremony',
                    description: 'Understanding the importance of corn in Ngäbe culture and rituals.',
                    icon: 'fa-seedling',
                    difficulty: 2,
                    duration: 12,
                    tags: ['Ceremony', 'Agriculture', 'Sacred'],
                    category: 'nature'
                }
            ],
            'guna': [
                {
                    id: 'golden-islands',
                    title: 'The Golden Islands',
                    description: 'The creation story of the San Blas Islands and the Guna people.',
                    icon: 'fa-island-tropical',
                    difficulty: 2,
                    duration: 18,
                    tags: ['Creation', 'Islands', 'Ocean'],
                    category: 'legends'
                },
                {
                    id: 'mola-patterns',
                    title: 'Sacred Mola Patterns',
                    description: 'The spiritual significance behind traditional Guna textile designs.',
                    icon: 'fa-palette',
                    difficulty: 1,
                    duration: 8,
                    tags: ['Art', 'Textiles', 'Symbols'],
                    category: 'wisdom'
                },
                {
                    id: 'sea-turtle',
                    title: 'The Great Sea Turtle',
                    description: 'A legend about the turtle that carries the islands on its shell.',
                    icon: 'fa-turtle',
                    difficulty: 2,
                    duration: 14,
                    tags: ['Legend', 'Sea', 'Protection'],
                    category: 'legends'
                },
                {
                    id: 'coconut-wisdom',
                    title: 'Wisdom of the Coconut',
                    description: 'How the coconut palm teaches us about resilience and giving.',
                    icon: 'fa-tree',
                    difficulty: 1,
                    duration: 10,
                    tags: ['Nature', 'Wisdom', 'Trees'],
                    category: 'nature'
                }
            ],
            'embera': [
                {
                    id: 'jaguar-spirit',
                    title: 'The Jaguar Spirit',
                    description: 'Ancient story of the jaguar as protector and guide of the Emberá people.',
                    icon: 'fa-cat',
                    difficulty: 3,
                    duration: 22,
                    tags: ['Spiritual', 'Animals', 'Protection'],
                    category: 'legends'
                },
                {
                    id: 'basket-weaving',
                    title: 'The Art of Basket Weaving',
                    description: 'Traditional techniques and the cultural significance of Emberá baskets.',
                    icon: 'fa-shopping-basket',
                    difficulty: 2,
                    duration: 16,
                    tags: ['Crafts', 'Tradition', 'Art'],
                    category: 'wisdom'
                },
                {
                    id: 'rainforest-medicine',
                    title: 'Rainforest Medicine',
                    description: 'Ancient healing practices using plants from the Amazon rainforest.',
                    icon: 'fa-leaf',
                    difficulty: 3,
                    duration: 25,
                    tags: ['Healing', 'Plants', 'Medicine'],
                    category: 'nature'
                },
                {
                    id: 'river-children',
                    title: 'Children of the River',
                    description: 'How Emberá families teach children to respect and live with nature.',
                    icon: 'fa-child',
                    difficulty: 1,
                    duration: 12,
                    tags: ['Family', 'Nature', 'Teaching'],
                    category: 'family'
                }
            ],
            'naso': [
                {
                    id: 'royal-crown',
                    title: 'The Royal Crown',
                    description: 'The story of the Naso kingdom and the significance of their royal traditions.',
                    icon: 'fa-crown',
                    difficulty: 2,
                    duration: 20,
                    tags: ['Royalty', 'Tradition', 'Kingdom'],
                    category: 'legends'
                },
                {
                    id: 'butterfly-messenger',
                    title: 'The Butterfly Messenger',
                    description: 'A beautiful tale about butterflies carrying messages between worlds.',
                    icon: 'fa-butterfly',
                    difficulty: 1,
                    duration: 14,
                    tags: ['Nature', 'Spiritual', 'Messages'],
                    category: 'legends'
                },
                {
                    id: 'forest-council',
                    title: 'The Forest Council',
                    description: 'Traditional governance and decision-making in Naso communities.',
                    icon: 'fa-users',
                    difficulty: 2,
                    duration: 18,
                    tags: ['Governance', 'Community', 'Tradition'],
                    category: 'wisdom'
                },
                {
                    id: 'sacred-cecropia',
                    title: 'The Sacred Cecropia Tree',
                    description: 'The spiritual importance of the Cecropia tree in Naso culture.',
                    icon: 'fa-tree',
                    difficulty: 2,
                    duration: 16,
                    tags: ['Sacred', 'Trees', 'Spiritual'],
                    category: 'nature'
                }
            ]
        };

        return courseStories[this.currentCourse] || courseStories['ngabe'];
    }

    generateDifficultyDots(difficulty) {
        const dots = [];
        for (let i = 1; i <= 3; i++) {
            dots.push(`<div class="difficulty-dot ${i <= difficulty ? 'active' : ''}"></div>`);
        }
        return dots.join('');
    }

    initializeEventListeners() {
        // Category filters
        this.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterStories(e.currentTarget.getAttribute('data-category'));
            });
        });

        // Story cards
        this.querySelectorAll('.story-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.story-button')) {
                    const storyId = card.getAttribute('data-story');
                    this.selectStory(storyId);
                }
            });
        });
    }

    filterStories(category) {
        // Update active filter
        this.querySelectorAll('.category-filter').forEach(filter => {
            filter.classList.remove('active');
        });
        this.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Filter story cards
        this.querySelectorAll('.story-card').forEach(card => {
            const storyId = card.getAttribute('data-story');
            const story = this.getStoriesData().find(s => s.id === storyId);
            
            if (category === 'all' || story.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    selectStory(storyId) {
        this.selectedStory = storyId;
        
        // Trigger story selection event
        this.dispatchEvent(new CustomEvent('storySelected', {
            detail: { storyId: storyId, course: this.currentCourse },
            bubbles: true
        }));
    }

    loadStoryProgress() {
        this.readingProgress = JSON.parse(localStorage.getItem(`stories_${this.currentCourse}`) || '{}');
    }

    saveStoryProgress(storyId, progress) {
        this.readingProgress[storyId] = progress;
        localStorage.setItem(`stories_${this.currentCourse}`, JSON.stringify(this.readingProgress));
    }
}

// Register the custom element
customElements.define('stories-section', StoriesSection);

// Global functions for story interaction
window.readStory = function(storyId) {
    console.log(`Reading story: ${storyId}`);
    showNotification(`Opening story: ${storyId}`, 'info');
    
    // Here you would implement the story reader
    // For now, simulate progress
    setTimeout(() => {
        showNotification('Story loaded! Enjoy reading! 📖', 'success');
    }, 1000);
};

window.reviewStory = function(storyId) {
    console.log(`Reviewing story: ${storyId}`);
    showNotification(`Reviewing story: ${storyId}`, 'info');
};
