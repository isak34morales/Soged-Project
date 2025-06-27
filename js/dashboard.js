// Dashboard Manager Class
class DashboardManager {
    constructor() {
        this.userName = document.getElementById('userName');
        this.userEmail = document.getElementById('userEmail');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.initializeEventListeners();
        this.loadUserData();
    }

    initializeEventListeners() {
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        // Add click event listeners to course cards
        document.querySelectorAll('.course-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCourseClick(e));
        });
    }

    loadUserData() {
        const userData = JSON.parse(localStorage.getItem('user'));
        
        // Eliminada la redirección al login para permitir acceso sin usuario
        // if (!userData) {
        //     window.location.href = 'login.html';
        //     return;
        // }

        // Update user information in the dashboard
        if (this.userName && userData) {
            this.userName.textContent = `${userData.firstName || userData.name} ${userData.lastName || ''}`;
        }
        if (this.userEmail && userData) {
            this.userEmail.textContent = userData.email;
        }

        // Update course progress based on user's language preference
        if (userData) {
            this.updateCourseProgress(userData.languagePreference);
        }
    }

    updateCourseProgress(languagePreference) {
        // Here you would typically fetch the user's progress from your backend
        // For now, we'll just update the UI to show the preferred language first
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            const courseTitle = card.querySelector('h4').textContent.toLowerCase();
            if (courseTitle.includes(languagePreference)) {
                card.style.order = '-1'; // Move preferred language course to the top
            }
        });
    }

    handleLogout(e) {
        e.preventDefault();
        
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }

    handleCourseClick(e) {
        e.preventDefault();
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('h4').textContent;
        
        // Here you would typically navigate to the course content
        // For now, we'll just show an alert
        alert(`Starting course: ${courseTitle}`);
    }
}

// Initialize Dashboard Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
}); 