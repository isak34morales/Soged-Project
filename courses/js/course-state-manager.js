// Modern State Management for Course Platform
class CourseStateManager {
    constructor() {
        this.state = {
            currentCourse: null,
            userProgress: {},
            courseData: {},
            ui: {
                sidebarOpen: false,
                currentSection: 'overview',
                loading: false
            }
        };
        
        this.subscribers = [];
        this.init();
    }
    
    init() {
        // Load saved state from localStorage
        this.loadState();
        
        // Setup state persistence
        this.setupPersistence();
        
        // Initialize with default values
        if (!this.state.currentCourse) {
            this.setState({ currentCourse: 'ngabe' });
        }
    }
    
    // Subscribe to state changes
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }
    
    // Notify all subscribers
    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }
    
    // Set state with immutability
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
        this.saveState();
    }
    
    // Get current state
    getState() {
        return { ...this.state };
    }
    
    // Course-specific actions
    setCurrentCourse(courseId) {
        this.setState({ 
            currentCourse: courseId,
            ui: { ...this.state.ui, currentSection: 'overview' }
        });
    }
    
    updateUserProgress(courseId, progress) {
        const userProgress = { ...this.state.userProgress };
        userProgress[courseId] = { ...userProgress[courseId], ...progress };
        this.setState({ userProgress });
    }
    
    setUISection(section) {
        this.setState({
            ui: { ...this.state.ui, currentSection: section }
        });
    }
    
    toggleSidebar() {
        this.setState({
            ui: { ...this.state.ui, sidebarOpen: !this.state.ui.sidebarOpen }
        });
    }
    
    setLoading(loading) {
        this.setState({
            ui: { ...this.state.ui, loading }
        });
    }
    
    // Load course data
    async loadCourseData(courseId) {
        this.setLoading(true);
        
        try {
            // Simulate API call
            const courseData = await this.fetchCourseData(courseId);
            this.setState({
                courseData: { ...this.state.courseData, [courseId]: courseData }
            });
        } catch (error) {
            console.error('Error loading course data:', error);
        } finally {
            this.setLoading(false);
        }
    }
    
    // Simulate API call for course data
    async fetchCourseData(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const courseData = {
                    ngabe: {
                        title: 'Ngäbe',
                        description: 'The largest indigenous group in Panama',
                        lessons: [
                            { id: 1, title: 'Basic Greetings', completed: false, xp: 50 },
                            { id: 2, title: 'Numbers 1-10', completed: false, xp: 75 },
                            { id: 3, title: 'Family Members', completed: false, xp: 100 },
                            { id: 4, title: 'Colors', completed: false, xp: 125 }
                        ],
                        totalXP: 350,
                        difficulty: 'beginner'
                    },
                    naso: {
                        title: 'Naso',
                        description: 'Musical language with unique rhythms',
                        lessons: [
                            { id: 1, title: 'Introduction to Naso', completed: false, xp: 50 },
                            { id: 2, title: 'Basic Phrases', completed: false, xp: 75 },
                            { id: 3, title: 'Cultural Context', completed: false, xp: 100 }
                        ],
                        totalXP: 225,
                        difficulty: 'intermediate'
                    },
                    guna: {
                        title: 'Guna',
                        description: 'Rich maritime culture from San Blas Islands',
                        lessons: [
                            { id: 1, title: 'Guna Basics', completed: false, xp: 50 },
                            { id: 2, title: 'Maritime Terms', completed: false, xp: 75 },
                            { id: 3, title: 'Traditional Stories', completed: false, xp: 100 }
                        ],
                        totalXP: 225,
                        difficulty: 'intermediate'
                    },
                    embera: {
                        title: 'Emberá',
                        description: 'Ancient language with deep-rooted traditions',
                        lessons: [
                            { id: 1, title: 'Emberá Fundamentals', completed: false, xp: 50 },
                            { id: 2, title: 'Traditional Wisdom', completed: false, xp: 75 },
                            { id: 3, title: 'Advanced Concepts', completed: false, xp: 100 }
                        ],
                        totalXP: 225,
                        difficulty: 'advanced'
                    }
                };
                
                resolve(courseData[courseId] || courseData.ngabe);
            }, 500);
        });
    }
    
    // Persistence methods
    saveState() {
        try {
            localStorage.setItem('courseState', JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }
    
    loadState() {
        try {
            const savedState = localStorage.getItem('courseState');
            if (savedState) {
                this.state = { ...this.state, ...JSON.parse(savedState) };
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
    
    setupPersistence() {
        // Auto-save on state changes
        this.subscribe(() => {
            this.saveState();
        });
    }
    
    // Reset state
    reset() {
        this.setState({
            currentCourse: null,
            userProgress: {},
            courseData: {},
            ui: {
                sidebarOpen: false,
                currentSection: 'overview',
                loading: false
            }
        });
    }
}

// Export for use in other modules
window.CourseStateManager = CourseStateManager;
