// Modern Component System for Course Platform
class CourseComponents {
    constructor() {
        this.components = {};
        this.init();
    }
    
    init() {
        this.registerComponents();
    }
    
    // Register all components
    registerComponents() {
        this.registerComponent('lesson-card', this.createLessonCard);
        this.registerComponent('progress-bar', this.createProgressBar);
        this.registerComponent('achievement-badge', this.createAchievementBadge);
        this.registerComponent('course-header', this.createCourseHeader);
        this.registerComponent('sidebar-menu', this.createSidebarMenu);
    }
    
    // Register a component
    registerComponent(name, factory) {
        this.components[name] = factory;
    }
    
    // Create a component instance
    createComponent(name, props = {}) {
        const factory = this.components[name];
        if (!factory) {
            console.error(`Component ${name} not found`);
            return null;
        }
        return factory(props);
    }
    
    // Lesson Card Component
    createLessonCard(props) {
        const { lesson, onStart, onComplete } = props;
        
        return `
            <div class="lesson-card ${lesson.completed ? 'completed' : ''}" data-lesson-id="${lesson.id}">
                <div class="lesson-header">
                    <div class="lesson-icon">
                        <i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                    </div>
                    <div class="lesson-info">
                        <h3 class="lesson-title">${lesson.title}</h3>
                        <div class="lesson-meta">
                            <span class="lesson-xp">
                                <i class="fas fa-star"></i>
                                ${lesson.xp} XP
                            </span>
                            <span class="lesson-duration">
                                <i class="fas fa-clock"></i>
                                10 min
                            </span>
                        </div>
                    </div>
                    <div class="lesson-actions">
                        ${lesson.completed ? 
                            '<button class="btn btn-success btn-sm"><i class="fas fa-check"></i> Completed</button>' :
                            '<button class="btn btn-primary btn-sm" onclick="startLesson(' + lesson.id + ')"><i class="fas fa-play"></i> Start</button>'
                        }
                    </div>
                </div>
                ${lesson.completed ? 
                    '<div class="lesson-progress"><div class="progress-fill" style="width: 100%"></div></div>' : 
                    '<div class="lesson-progress"><div class="progress-fill" style="width: 0%"></div></div>'
                }
            </div>
        `;
    }
    
    // Progress Bar Component
    createProgressBar(props) {
        const { current, total, label = 'Progress' } = props;
        const percentage = Math.round((current / total) * 100);
        
        return `
            <div class="progress-container">
                <div class="progress-header">
                    <span class="progress-label">${label}</span>
                    <span class="progress-percentage">${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-stats">
                    <span class="progress-current">${current}</span>
                    <span class="progress-separator">/</span>
                    <span class="progress-total">${total}</span>
                </div>
            </div>
        `;
    }
    
    // Achievement Badge Component
    createAchievementBadge(props) {
        const { achievement } = props;
        
        return `
            <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}" data-achievement-id="${achievement.id}">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h4 class="achievement-title">${achievement.title}</h4>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
                <div class="achievement-status">
                    ${achievement.unlocked ? 
                        '<i class="fas fa-unlock"></i>' : 
                        '<i class="fas fa-lock"></i>'
                    }
                </div>
            </div>
        `;
    }
    
    // Course Header Component
    createCourseHeader(props) {
        const { course, stats } = props;
        
        return `
            <header class="course-header">
                <div class="header-content">
                    <div class="header-left">
                        <div class="course-icon">
                            <img src="${course.icon}" alt="${course.title}" class="course-icon-img">
                        </div>
                        <div class="course-info">
                            <h1 class="course-title">${course.title}</h1>
                            <p class="course-description">${course.description}</p>
                        </div>
                    </div>
                    
                    <div class="header-center">
                        <div class="course-stats">
                            ${stats.map(stat => `
                                <div class="stat-item">
                                    <i class="fas ${stat.icon}"></i>
                                    <span class="stat-value">${stat.value}</span>
                                    <span class="stat-label">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="header-right">
                        <div class="user-profile">
                            <div class="user-avatar">
                                <i class="fas fa-user"></i>
                                <span class="user-name">User</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
    
    // Sidebar Menu Component
    createSidebarMenu(props) {
        const { sections, currentSection, onSectionChange } = props;
        
        return `
            <nav class="sidebar-menu">
                <div class="menu-header">
                    <h3>Course Menu</h3>
                </div>
                <ul class="menu-list">
                    ${sections.map(section => `
                        <li class="menu-item ${section.id === currentSection ? 'active' : ''}">
                            <a href="#" class="menu-link" data-section="${section.id}" onclick="changeSection('${section.id}')">
                                <i class="fas ${section.icon}"></i>
                                <span class="menu-text">${section.title}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;
    }
    
    // Utility method to render components
    render(container, componentName, props = {}) {
        const html = this.createComponent(componentName, props);
        if (html && container) {
            container.innerHTML = html;
        }
        return html;
    }
    
    // Batch render multiple components
    renderBatch(container, components) {
        const html = components.map(comp => {
            return this.createComponent(comp.name, comp.props);
        }).join('');
        
        if (html && container) {
            container.innerHTML = html;
        }
        return html;
    }
}

// Global component instance
window.courseComponents = new CourseComponents();

// Utility functions for component interactions
window.startLesson = function(lessonId) {
    console.log('Starting lesson:', lessonId);
    // Implement lesson start logic
};

window.changeSection = function(sectionId) {
    console.log('Changing to section:', sectionId);
    // Implement section change logic
    if (window.courseStateManager) {
        window.courseStateManager.setUISection(sectionId);
    }
};
