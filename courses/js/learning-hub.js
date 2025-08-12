/**
 * Simple Learning Hub
 * Clean & Focused Learning Experience
 */

class SimpleLearningHub {
    constructor() {
        this.currentSection = 'learn';
        this.currentCourse = this.getCurrentCourse();
        this.sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.currentUser = this.getCurrentUser();
        
        this.init();
    }

    init() {
        // Check authentication first
        if (!this.checkAuthentication()) {
            return;
        }
        
        this.hideLoadingScreen();
        this.setupSidebar();
        this.setupNavigation();
        this.setupCourseSelector();
        this.setupMobileMenu();
        this.setupUserMenu();
        this.setupModals();
        this.loadInitialSection();
        this.setupResponsiveBehavior();
        this.updateUserInfo();
        
        // Apply saved sidebar state
        if (this.sidebarCollapsed) {
            this.collapseSidebar();
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 1500);
    }

    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                // Only allow sidebar toggle on desktop (width > 1024px)
                if (window.innerWidth > 1024) {
                    this.toggleSidebar();
                }
            });
        }
    }

    toggleSidebar() {
        // Only allow sidebar toggle on desktop
        if (window.innerWidth <= 1024) {
            return;
        }
        
        const sidebar = document.getElementById('sidebar');
        const isCollapsed = sidebar.classList.contains('collapsed');
        
        if (isCollapsed) {
            this.expandSidebar();
        } else {
            this.collapseSidebar();
        }
    }

    collapseSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.add('collapsed');
        this.sidebarCollapsed = true;
        localStorage.setItem('sidebarCollapsed', 'true');
        
        // Trigger custom event for components to adjust
        this.dispatchSidebarEvent('collapsed');
    }

    expandSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('collapsed');
        this.sidebarCollapsed = false;
        localStorage.setItem('sidebarCollapsed', 'false');
        
        // Trigger custom event for components to adjust
        this.dispatchSidebarEvent('expanded');
    }

    dispatchSidebarEvent(state) {
        const event = new CustomEvent('sidebarStateChanged', {
            detail: { 
                collapsed: state === 'collapsed',
                width: state === 'collapsed' ? 70 : 280
            }
        });
        document.dispatchEvent(event);
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.loadSection(section);
                }
            });
        });
    }

    setupCourseSelector() {
        const courseDropdownBtn = document.getElementById('courseDropdownBtn');
        const courseDropdown = document.getElementById('courseDropdown');
        const courseOptions = document.querySelectorAll('.course-option');

        // Toggle dropdown
        if (courseDropdownBtn) {
            courseDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                courseDropdown.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.course-selector')) {
                courseDropdown.classList.remove('show');
            }
        });

        // Course selection
        courseOptions.forEach(option => {
            option.addEventListener('click', () => {
                const courseId = option.getAttribute('data-course');
                this.switchCourse(courseId);
            });
        });

        // Keyboard shortcuts for course switching
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1': this.switchCourse('ngabe'); e.preventDefault(); break;
                    case '2': this.switchCourse('guna'); e.preventDefault(); break;
                    case '3': this.switchCourse('embera'); e.preventDefault(); break;
                    case '4': this.switchCourse('naso'); e.preventDefault(); break;
                    case 's': this.toggleSidebar(); e.preventDefault(); break;
                }
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.add('open');
                sidebarOverlay.classList.add('show');
                // Prevent body scroll when mobile menu is open
                document.body.style.overflow = 'hidden';
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close mobile menu when selecting navigation item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.innerWidth <= 1024) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('show');
        }
        // Restore body scroll
        document.body.style.overflow = '';
    }

    setupResponsiveBehavior() {
        // Handle window resize to manage sidebar behavior
        window.addEventListener('resize', () => {
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            
            if (window.innerWidth > 1024) {
                // Desktop: Remove mobile-specific classes and restore desktop behavior
                sidebar.classList.remove('open');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('show');
                }
                // Restore body scroll on desktop
                document.body.style.overflow = '';
                
                // Restore saved sidebar state on desktop
                if (this.sidebarCollapsed) {
                    this.collapseSidebar();
                } else {
                    this.expandSidebar();
                }
            } else {
                // Mobile/Tablet: Ensure sidebar is hidden and remove collapsed state
                sidebar.classList.remove('open');
                sidebar.classList.remove('collapsed');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('show');
                }
                // Restore body scroll on mobile/tablet
                document.body.style.overflow = '';
            }
        });
    }

    loadSection(section) {
        if (section === this.currentSection) return;

        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[data-section="${section}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Update breadcrumb
        this.updateBreadcrumb(section);

        // Load section content
        this.loadSectionContent(section);
        
        this.currentSection = section;
    }

    loadSectionContent(section) {
        const contentContainer = document.getElementById('contentContainer');
        
        // Show loading state
        contentContainer.innerHTML = `
            <div class="section-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; text-align: center; padding: 4rem 2rem;">
                <div class="spinner" style="margin: 0 auto 2rem;"></div>
                                  <h3 style="color: var(--text-secondary); font-weight: 500; margin: 0;">Loading ${this.getSectionTitle(section)}...</h3>
                                        <p style="color: var(--text-light); margin-top: 0.5rem; font-size: 0.9rem;">Preparing your learning experience</p>
            </div>
        `;

        // Load appropriate content
        setTimeout(() => {
            let content = '';
            
            switch(section) {
                case 'overview':
                    content = this.generateOverviewContent();
                    break;
                case 'learn':
                    content = `<learning-section course="${this.currentCourse}"></learning-section>`;
                    break;
                case 'stories':
                    content = `<stories-section course="${this.currentCourse}"></stories-section>`;
                    break;
                case 'chat':
                    content = this.generateChatContent();
                    break;
                case 'leaderboard':
                    content = this.generateLeaderboardContent();
                    break;
                case 'achievements':
                    content = this.generateAchievementsContent();
                    break;
                default:
                    content = `
                        <div style="text-align: center; padding: 4rem 2rem;">
                            <i class="fas fa-construction" style="font-size: 4rem; color: var(--text-light); margin-bottom: 2rem;"></i>
                            <h2 style="color: var(--text-primary); margin-bottom: 1rem;">${this.getSectionTitle(section)}</h2>
                            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto;">This section is being developed. Check back soon for exciting new features!</p>
                        </div>
                    `;
            }
            
            contentContainer.innerHTML = content;
        }, 600);
    }

    generateChatContent() {
        return `
            <div class="chat-section" style="max-width: 1000px; margin: 0 auto;">
                <div class="chat-header" style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #00A3E0, #29B6F6); color: white; border-radius: 16px;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🤖 AI Tutor</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Your personal ${this.getCourseName()} language assistant</p>
                    <div style="margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.2); border-radius: 12px; display: inline-block;">
                        <i class="fas fa-circle" style="color: #2ECC71; margin-right: 0.5rem; animation: pulse 2s infinite;"></i>
                        <span style="font-weight: 500;">Ready to help you learn</span>
                    </div>
                </div>

                <div class="chat-container" style="background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
                    <div class="chat-messages" style="height: 500px; padding: 2rem; overflow-y: auto; background: #FAFBFC;">
                        <div class="ai-message" style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem;">
                            <div class="message-avatar" style="width: 40px; height: 40px; background: linear-gradient(135deg, #00A3E0, #29B6F6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; flex-shrink: 0;">
                                🤖
                            </div>
                            <div class="message-content" style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); max-width: 80%;">
                                <p style="margin-bottom: 1rem; color: var(--text-primary);">Hello! I'm your ${this.getCourseName()} AI tutor. I'm here to help you learn through conversation.</p>
                                <p style="margin-bottom: 1rem; color: var(--text-primary);">I can help you with:</p>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    <li style="padding: 0.5rem 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i>Practice conversations</li>
                                    <li style="padding: 0.5rem 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i>Pronunciation guidance</li>
                                    <li style="padding: 0.5rem 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i>Cultural context</li>
                                    <li style="padding: 0.5rem 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i>Grammar explanations</li>
                                </ul>
                                <p style="margin-top: 1rem; color: var(--text-primary); font-weight: 500;">What would you like to practice today?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input" style="padding: 1.5rem; background: white; border-top: 1px solid #E9ECEF;">
                        <div style="display: flex; gap: 1rem; align-items: flex-end;">
                            <div style="flex: 1; position: relative;">
                                <textarea placeholder="Type your message in ${this.getCourseName()} or English..." style="width: 100%; min-height: 50px; max-height: 120px; padding: 1rem; border: 2px solid #E9ECEF; border-radius: 12px; font-family: inherit; font-size: 1rem; resize: vertical; outline: none; transition: border-color 0.2s;" onFocus="this.style.borderColor='var(--primary-color)'" onBlur="this.style.borderColor='#E9ECEF'"></textarea>
                            </div>
                            <button style="background: linear-gradient(135deg, var(--primary-color), #20C997); color: white; border: none; border-radius: 12px; padding: 1rem 1.5rem; cursor: pointer; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem;" onMouseOver="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(40,167,69,0.3)'" onMouseOut="this.style.transform='none'; this.style.boxShadow='none'">
                                <i class="fas fa-paper-plane"></i>
                                Send
                            </button>
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                            <button class="suggestion-btn" style="padding: 0.5rem 1rem; background: var(--bg-tertiary); border: none; border-radius: 20px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;" onMouseOver="this.style.background='var(--primary-color)'; this.style.color='white'" onMouseOut="this.style.background='var(--bg-tertiary)'; this.style.color='inherit'">How do I say "hello"?</button>
                            <button class="suggestion-btn" style="padding: 0.5rem 1rem; background: var(--bg-tertiary); border: none; border-radius: 20px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;" onMouseOver="this.style.background='var(--primary-color)'; this.style.color='white'" onMouseOut="this.style.background='var(--bg-tertiary)'; this.style.color='inherit'">Tell me about ${this.getCourseName()} culture</button>
                            <button class="suggestion-btn" style="padding: 0.5rem 1rem; background: var(--bg-tertiary); border: none; border-radius: 20px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;" onMouseOver="this.style.background='var(--primary-color)'; this.style.color='white'" onMouseOut="this.style.background='var(--bg-tertiary)'; this.style.color='inherit'">Practice numbers</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLeaderboardContent() {
        return `
            <div class="leaderboard-section" style="max-width: 1000px; margin: 0 auto;">
                <div class="leaderboard-header" style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #FFB300, #FFA726); color: white; border-radius: 16px;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏆 Leaderboard</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Compete with other ${this.getCourseName()} students</p>
                </div>

                <div class="leaderboard-tabs" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
                    <button class="tab-btn active" style="padding: 0.75rem 1.5rem; background: var(--gradient-primary); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">This Week</button>
                    <button class="tab-btn" style="padding: 0.75rem 1.5rem; background: var(--bg-tertiary); color: var(--text-primary); border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">This Month</button>
                    <button class="tab-btn" style="padding: 0.75rem 1.5rem; background: var(--bg-tertiary); color: var(--text-primary); border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">All Time</button>
                </div>

                <div class="leaderboard-list" style="background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
                    ${this.generateLeaderboardItems()}
                </div>
            </div>
        `;
    }

    generateLeaderboardItems() {
        const leaderboardData = [
            { rank: 1, name: 'María González', xp: 2450, streak: 15, avatar: '👩‍🎓', isCurrentUser: false },
            { rank: 2, name: 'Carlos Rivera', xp: 2380, streak: 12, avatar: '👨‍💼', isCurrentUser: false },
            { rank: 3, name: 'Ana Morales', xp: 2210, streak: 18, avatar: '👩‍🏫', isCurrentUser: false },
            { rank: 4, name: 'José Pérez', xp: 2150, streak: 8, avatar: '👨‍🎨', isCurrentUser: false },
            { rank: 5, name: 'Language Explorer', xp: 1250, streak: 7, avatar: '🐢', isCurrentUser: true },
            { rank: 6, name: 'Elena Castro', xp: 1180, streak: 5, avatar: '👩‍💻', isCurrentUser: false },
            { rank: 7, name: 'Miguel Torres', xp: 1050, streak: 3, avatar: '👨‍🔬', isCurrentUser: false },
        ];

        return leaderboardData.map(user => {
            const rankIcon = user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`;
            const userClass = user.isCurrentUser ? 'current-user' : '';
            
            return `
                <div class="leaderboard-item ${userClass}" style="display: flex; align-items: center; padding: 1.5rem; border-bottom: 1px solid #F1F3F4; transition: all 0.3s; ${user.isCurrentUser ? 'background: linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(32, 201, 151, 0.1)); border-left: 4px solid var(--primary-color);' : ''}" onMouseOver="this.style.background='var(--bg-tertiary)'" onMouseOut="this.style.background='${user.isCurrentUser ? 'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(32, 201, 151, 0.1))' : 'transparent'}'">
                    <div class="rank-display" style="width: 60px; text-align: center; font-size: 1.5rem; font-weight: 700;">
                        ${rankIcon}
                    </div>
                    <div class="user-avatar" style="width: 50px; height: 50px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">
                        ${user.avatar}
                    </div>
                    <div class="user-info" style="flex: 1;">
                        <div class="user-name" style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.25rem;">
                            ${user.name} ${user.isCurrentUser ? '(You)' : ''}
                        </div>
                        <div class="user-stats" style="display: flex; gap: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                            <span><i class="fas fa-fire" style="color: var(--accent-color);"></i> ${user.streak} days</span>
                        </div>
                    </div>
                    <div class="user-xp" style="text-align: right;">
                        <div style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">${user.xp}</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">XP</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    generateAchievementsContent() {
        return `
            <div class="achievements-section" style="max-width: 1000px; margin: 0 auto;">
                <div class="achievements-header" style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #8B5CF6, #A78BFA); color: white; border-radius: 16px;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏅 Achievements</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Celebrate your milestones in learning ${this.getCourseName()}</p>
                    <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 2rem;">
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700;">7</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">Unlocked</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700;">13</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">To Unlock</div>
                        </div>
                    </div>
                </div>

                <div class="achievements-categories" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <button class="category-btn active" style="padding: 0.75rem 1.5rem; background: var(--gradient-primary); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">All</button>
                    <button class="category-btn" style="padding: 0.75rem 1.5rem; background: var(--bg-tertiary); color: var(--text-primary); border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Learning</button>
                    <button class="category-btn" style="padding: 0.75rem 1.5rem; background: var(--bg-tertiary); color: var(--text-primary); border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Social</button>
                    <button class="category-btn" style="padding: 0.75rem 1.5rem; background: var(--bg-tertiary); color: var(--text-primary); border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Special</button>
                </div>

                <div class="achievements-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    ${this.generateAchievementItems()}
                </div>
            </div>
        `;
    }

    generateAchievementItems() {
        const achievements = [
            { id: 'first-lesson', title: 'First Step', description: 'Complete your first lesson', icon: '🎯', status: 'unlocked', reward: '+50 XP', unlockedDate: '5 days ago' },
            { id: 'streak-7', title: 'Burning Fire', description: 'Maintain a 7-day streak', icon: '🔥', status: 'unlocked', reward: '+100 XP', unlockedDate: 'Today' },
            { id: 'lessons-10', title: 'Dedicated Student', description: 'Complete 10 lessons', icon: '📚', status: 'unlocked', reward: '+150 XP', unlockedDate: 'Yesterday' },
            { id: 'perfect-lesson', title: 'Perfection', description: 'Get 100% on a lesson', icon: '⭐', status: 'unlocked', reward: '+75 XP', unlockedDate: '3 days ago' },
            { id: 'voice-practice', title: 'Brave Speaker', description: 'Complete 5 pronunciation exercises', icon: '🎤', status: 'in-progress', reward: '+200 XP', progress: '3/5' },
            { id: 'story-reader', title: 'Cultural Explorer', description: 'Read 3 traditional stories', icon: '📖', status: 'in-progress', reward: '+125 XP', progress: '1/3' },
            { id: 'streak-30', title: 'Constant Master', description: 'Maintain a 30-day streak', icon: '👑', status: 'locked', reward: '+500 XP', requirement: 'Current streak: 7/30' },
            { id: 'all-lessons', title: 'Language Master', description: 'Complete all lessons', icon: '🏆', status: 'locked', reward: '+1000 XP', requirement: 'Lessons: 12/50' }
        ];

        return achievements.map(achievement => {
            let statusClass = achievement.status;
            let statusIcon = '';
            let statusText = '';
            let progressBar = '';

            switch(achievement.status) {
                case 'unlocked':
                    statusIcon = '✅';
                    statusText = achievement.unlockedDate;
                    break;
                case 'in-progress':
                    statusIcon = '⏳';
                    statusText = achievement.progress;
                    const [current, total] = achievement.progress.split('/');
                    const progressPercent = (parseInt(current) / parseInt(total)) * 100;
                    progressBar = `
                        <div style="width: 100%; height: 6px; background: var(--bg-tertiary); border-radius: 3px; margin-top: 0.5rem; overflow: hidden;">
                            <div style="height: 100%; background: var(--gradient-info); border-radius: 3px; width: ${progressPercent}%; transition: width 0.3s;"></div>
                        </div>
                    `;
                    break;
                case 'locked':
                    statusIcon = '🔒';
                    statusText = achievement.requirement;
                    break;
            }

            return `
                <div class="achievement-card ${statusClass}" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s; cursor: pointer; border: 2px solid transparent; position: relative; overflow: hidden; ${achievement.status === 'locked' ? 'opacity: 0.6;' : ''}" onMouseOver="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; this.style.borderColor='var(--primary-color)'" onMouseOut="this.style.transform='none'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'; this.style.borderColor='transparent'">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: ${achievement.status === 'unlocked' ? 'var(--gradient-success)' : achievement.status === 'in-progress' ? 'var(--gradient-info)' : 'var(--text-light)'};"></div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; background: ${achievement.status === 'unlocked' ? 'var(--gradient-success)' : achievement.status === 'in-progress' ? 'var(--gradient-info)' : 'var(--text-light)'};">
                            ${achievement.icon}
                        </div>
                        <div style="flex: 1;">
                            <h3 style="font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">${achievement.title}</h3>
                            <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem;">${achievement.description}</p>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 1.2rem;">${statusIcon}</span>
                            <span style="font-weight: 600; color: ${achievement.status === 'unlocked' ? 'var(--success-color)' : achievement.status === 'in-progress' ? 'var(--info-color)' : 'var(--text-light)'};">${statusText}</span>
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">${achievement.reward}</div>
                        ${progressBar}
                    </div>
                </div>
            `;
        }).join('');
    }

    generateProgressContent() {
        return `
            <div class="progress-section" style="max-width: 1000px; margin: 0 auto;">
                <div class="progress-header" style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #8B5CF6, #A78BFA); color: white; border-radius: 16px;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏆 Your Achievements</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Track your ${this.getCourseName()} learning journey</p>
                </div>

                <div class="achievements-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
                    <div class="achievement-card unlocked" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s; cursor: pointer; border: 2px solid transparent; position: relative; overflow: hidden;" onMouseOver="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; this.style.borderColor='var(--success-color)'" onMouseOut="this.style.transform='none'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'; this.style.borderColor='transparent'">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--success-color), #27AE60);"></div>
                        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--success-color), #27AE60); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                🔥
                            </div>
                            <div>
                                <h3 style="font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">Fire Streak</h3>
                                <p style="color: var(--text-secondary); margin: 0;">7-day learning streak</p>
                            </div>
                        </div>
                        <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: 8px; text-align: center;">
                            <span style="color: var(--success-color); font-weight: 600;">Unlocked 2 hours ago</span>
                        </div>
                    </div>

                    <div class="achievement-card unlocked" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s; cursor: pointer; border: 2px solid transparent; position: relative; overflow: hidden;" onMouseOver="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; this.style.borderColor='var(--primary-color)'" onMouseOut="this.style.transform='none'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'; this.style.borderColor='transparent'">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--primary-color), #20C997);"></div>
                        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-color), #20C997); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                📚
                            </div>
                            <div>
                                <h3 style="font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">Student</h3>
                                <p style="color: var(--text-secondary); margin: 0;">Complete 10 lessons</p>
                            </div>
                        </div>
                        <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: 8px; text-align: center;">
                            <span style="color: var(--primary-color); font-weight: 600;">Unlocked yesterday</span>
                        </div>
                    </div>

                    <div class="achievement-card locked" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s; cursor: pointer; border: 2px solid transparent; position: relative; overflow: hidden; opacity: 0.6;" onMouseOver="this.style.opacity='0.8'" onMouseOut="this.style.opacity='0.6'">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--text-light);"></div>
                        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
                            <div style="width: 60px; height: 60px; background: var(--text-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                🏆
                            </div>
                            <div>
                                <h3 style="font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">Master</h3>
                                <p style="color: var(--text-secondary); margin: 0;">Complete all lessons</p>
                            </div>
                        </div>
                        <div style="background: var(--bg-tertiary); padding: 0.75rem 1rem; border-radius: 8px; text-align: center;">
                            <span style="color: var(--text-light); font-weight: 600;">Complete 38 more lessons</span>
                        </div>
                    </div>
                </div>

                <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <h3 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2rem; text-align: center;">Learning Statistics</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                        <div style="text-align: center; padding: 1.5rem; background: var(--bg-tertiary); border-radius: 12px;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">12</div>
                            <div style="color: var(--text-secondary); font-weight: 500;">Lessons Completed</div>
                        </div>
                        <div style="text-align: center; padding: 1.5rem; background: var(--bg-tertiary); border-radius: 12px;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-color); margin-bottom: 0.5rem;">7</div>
                            <div style="color: var(--text-secondary); font-weight: 500;">Day Streak</div>
                        </div>
                        <div style="text-align: center; padding: 1.5rem; background: var(--bg-tertiary); border-radius: 12px;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--secondary-color); margin-bottom: 0.5rem;">1,250</div>
                            <div style="color: var(--text-secondary); font-weight: 500;">Total XP</div>
                        </div>
                        <div style="text-align: center; padding: 1.5rem; background: var(--bg-tertiary); border-radius: 12px;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--info-color); margin-bottom: 0.5rem;">2h 15m</div>
                            <div style="color: var(--text-secondary); font-weight: 500;">Study Time</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateBreadcrumb(section) {
        const breadcrumbItem = document.querySelector('.breadcrumb-item');
        if (breadcrumbItem) {
            breadcrumbItem.textContent = this.getSectionTitle(section);
        }
    }

    generateOverviewContent() {
        const courseData = this.getCourseData();
        const otherCourses = this.getOtherCourses();
        
        return `
            <div class="overview-dashboard">
                <div class="dashboard-header" data-aos="fade-up">
                    <h1 class="welcome-message">Welcome back!</h1>
                    <p class="welcome-subtitle">Continue your indigenous language learning journey</p>
                    
                    <div class="current-language-card">
                        <div class="language-card-flag">${courseData.flag}</div>
                        <div class="language-card-info">
                            <h3>${courseData.name}</h3>
                            <p>${courseData.description}</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-grid" data-aos="fade-up" data-aos-delay="100">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <div class="card-icon progress">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div>
                                <h3 class="card-title">Your Progress</h3>
                            </div>
                        </div>
                        
                        <div class="progress-stats">
                            <div class="progress-stat">
                                <span class="stat-number">12</span>
                                <span class="stat-description">Lessons</span>
                            </div>
                            <div class="progress-stat">
                                <span class="stat-number">1,250</span>
                                <span class="stat-description">Total XP</span>
                            </div>
                        </div>
                        
                        <div class="overall-progress">
                            <div class="progress-label">
                                <span>Overall Progress</span>
                                <span>24%</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill" style="width: 24%"></div>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card">
                        <div class="card-header">
                            <div class="card-icon streak">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div>
                                <h3 class="card-title">Learning Streak</h3>
                            </div>
                        </div>
                        
                        <div class="streak-info">
                            <span class="streak-number">7</span>
                            <span class="streak-label">consecutive days</span>
                        </div>
                        
                        <div class="streak-calendar">
                            <div class="calendar-day completed">L</div>
                            <div class="calendar-day completed">M</div>
                            <div class="calendar-day completed">M</div>
                            <div class="calendar-day completed">J</div>
                            <div class="calendar-day completed">V</div>
                            <div class="calendar-day completed">S</div>
                            <div class="calendar-day today">D</div>
                        </div>
                    </div>
                </div>

                <div class="other-courses" data-aos="fade-up" data-aos-delay="200">
                    <div class="section-header">
                        <h2 class="section-title">Other Languages</h2>
                        <p class="section-subtitle">Explore more indigenous cultures of Panama</p>
                    </div>
                    
                    <div class="courses-grid">
                        ${otherCourses.map(course => `
                            <div class="course-card" onclick="switchCourse('${course.id}')">
                                <div class="course-flag">${course.flag}</div>
                                <h3 class="course-name">${course.name}</h3>
                                <p class="course-description">${course.description}</p>
                                
                                <div class="course-progress">
                                    <div class="course-progress-label">${course.progress.lessons}/50 lessons</div>
                                    <div class="course-progress-bar">
                                        <div class="course-progress-fill" style="width: ${(course.progress.lessons / 50) * 100}%"></div>
                                    </div>
                                </div>
                                
                                <div class="course-stats">
                                    <span>${course.progress.xp} XP</span>
                                    <span>${course.progress.streak} day(s) streak</span>
                                </div>
                                
                                <button class="course-button">
                                    ${course.progress.lessons > 0 ? 'Continue' : 'Start'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getCourseData() {
        const courses = {
            'ngabe': { name: 'Ngäbe', flag: '🏔️', description: 'Mountain People' },
            'guna': { name: 'Guna', flag: '🏝️', description: 'Island Culture' },
            'embera': { name: 'Emberá', flag: '🌊', description: 'River Dwellers' },
            'naso': { name: 'Naso', flag: '🦋', description: 'Ancient Kingdom' }
        };
        return courses[this.currentCourse] || courses['ngabe'];
    }

    getOtherCourses() {
        const allCourses = [
            { id: 'ngabe', name: 'Ngäbe', flag: '🏔️', description: 'Mountain People', progress: { lessons: 12, xp: 1250, streak: 7 } },
            { id: 'guna', name: 'Guna', flag: '🏝️', description: 'Island Culture', progress: { lessons: 8, xp: 890, streak: 3 } },
            { id: 'embera', name: 'Emberá', flag: '🌊', description: 'River Dwellers', progress: { lessons: 5, xp: 450, streak: 1 } },
            { id: 'naso', name: 'Naso', flag: '🦋', description: 'Ancient Kingdom', progress: { lessons: 3, xp: 220, streak: 0 } }
        ];
        
        return allCourses.filter(course => course.id !== this.currentCourse);
    }

    getSectionTitle(section) {
        const titles = {
            overview: 'Dashboard',
            learn: 'Learning Path',
            stories: 'Cultural Stories',
            chat: 'AI Tutor',
            leaderboard: 'Leaderboard',
            achievements: 'Achievements'
        };
        return titles[section] || section.charAt(0).toUpperCase() + section.slice(1);
    }

    getCurrentCourse() {
        const urlParams = new URLSearchParams(window.location.search);
        const courseFromUrl = urlParams.get('course');
        
        if (courseFromUrl) {
            localStorage.setItem('currentCourse', courseFromUrl);
            return courseFromUrl;
        }
        
        return localStorage.getItem('currentCourse') || 'ngabe';
    }

    getCurrentUser() {
        // First try to get data in Soged format
        const token = localStorage.getItem('soged_token');
        const userData = localStorage.getItem('soged_user');
        
        if (token && userData) {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        
        // Fallback to legacy format if Soged format not found
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        const username = localStorage.getItem('username');
        
        if (isLoggedIn === 'true' && userEmail && userName) {
            // Convert legacy format to Soged format and save it
            const userData = {
                name: userName,
                email: userEmail,
                username: username || userEmail.split('@')[0] || 'usuario',
                role: 'user',
                subscription: 'basic'
            };
            
            // Save in Soged format for future use
            localStorage.setItem('soged_token', 'dummy_token_' + Date.now());
            localStorage.setItem('soged_user', JSON.stringify(userData));
            
            return userData;
        }
        
        return null;
    }

    checkAuthentication() {
        if (!this.currentUser) {
            // User not authenticated, redirect to login
            alert('Por favor inicia sesión para acceder al dashboard.');
            window.location.href = '../auth/login.html';
            return false;
        }
        return true;
    }

    updateUserInfo() {
        if (this.currentUser) {
            // Update username in sidebar
            const usernameElement = document.querySelector('.username');
            if (usernameElement) {
                usernameElement.textContent = this.currentUser.name || 'Usuario';
            }

            // Update username in dropdown
            const dropdownUsername = document.querySelector('.dropdown-username');
            if (dropdownUsername) {
                dropdownUsername.textContent = this.currentUser.name || 'Usuario';
            }

            // Update username in profile modal
            const profileUsername = document.querySelector('.profile-username');
            if (profileUsername) {
                profileUsername.textContent = this.currentUser.name || 'Usuario';
            }

            // Update username input in profile modal
            const usernameInput = document.getElementById('username');
            if (usernameInput) {
                usernameInput.value = this.currentUser.name || 'Usuario';
            }

            // Update email if available
            const emailElement = document.querySelector('.profile-email');
            if (emailElement && this.currentUser.email) {
                emailElement.textContent = this.currentUser.email;
            }
        }
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

    switchCourse(courseId) {
        if (courseId === this.currentCourse) return;

        const courses = {
            'ngabe': { name: 'Ngäbe', flag: '🏔️', desc: 'Mountain People' },
            'guna': { name: 'Guna', flag: '🏝️', desc: 'Island Culture' },
            'embera': { name: 'Emberá', flag: '🌊', desc: 'River Dwellers' },
            'naso': { name: 'Naso', flag: '🦋', desc: 'Royal Kingdom' }
        };

        const course = courses[courseId];
        if (!course) return;

        // Update current course
        this.currentCourse = courseId;
        localStorage.setItem('currentCourse', courseId);

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('course', courseId);
        window.history.pushState({}, '', url);

        // Update course display
        this.updateCourseDisplay(course);

        // Close dropdown
        document.getElementById('courseDropdown').classList.remove('show');

        // Reload current section with new course
        if (['learn', 'stories'].includes(this.currentSection)) {
            this.loadSection(this.currentSection);
        }

        // Show notification
        this.showNotification(`Switched to ${course.name}! 🎯`, 'success');
    }

    updateCourseDisplay(course) {
        // Update current course display
        document.querySelector('.course-flag').textContent = course.flag;
        document.querySelector('.course-name').textContent = course.name;
        document.querySelector('.course-desc').textContent = course.desc;

        // Update active option
        document.querySelectorAll('.course-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-course') === this.currentCourse) {
                option.classList.add('active');
            }
        });
    }

    setupUserMenu() {
        const userAvatarBtn = document.getElementById('userAvatarBtn');
        const userDropdown = document.getElementById('userDropdown');

        if (userAvatarBtn) {
            userAvatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu-container')) {
                userDropdown.classList.remove('show');
            }
        });

        // Handle dropdown actions
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                this.handleUserAction(action);
                userDropdown.classList.remove('show');
            });
        });
    }

    setupModals() {
        // Setup modal close buttons
        document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                if (modalId) {
                    this.closeModal(modalId);
                }
            });
        });

        // Close modal when clicking overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('show');
                }
            });
        });
    }

    handleUserAction(action) {
        switch(action) {
            case 'dashboard':
                this.loadSection('overview');
                break;
            case 'profile':
                this.openModal('profileModal');
                break;
            case 'settings':
                this.openModal('settingsModal');
                break;
            case 'logout':
                this.logout();
                break;
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    logout() {
        // Clear user data
        localStorage.removeItem('currentCourse');
        localStorage.removeItem('sidebarCollapsed');
        localStorage.removeItem('userProgress');
        
        // Clear Soged authentication data
        localStorage.removeItem('soged_token');
        localStorage.removeItem('soged_user');
        
        // Show confirmation
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            // Redirect to main page
            window.location.href = '../index.html';
        }
    }

    loadInitialSection() {
        // Load the default section (overview)
        this.loadSection('overview');
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
            transition: 'transform 0.3s ease',
            fontSize: '0.9rem',
            fontWeight: '500'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global function for switching courses from overview
window.switchCourse = function(courseId) {
    if (window.learningHub) {
        window.learningHub.switchCourse(courseId);
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.learningHub = new SimpleLearningHub();
});

// Make it globally accessible
window.SimpleLearningHub = SimpleLearningHub;
