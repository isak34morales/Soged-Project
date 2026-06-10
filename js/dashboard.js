// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Add event listeners
    setupEventListeners();
    
    // Animate progress bars
    animateProgressBars();
});

// Initialize dashboard functionality
function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Set default active sections
    const defaultSections = ['principal', 'aprendizaje', 'idiomas'];
    defaultSections.forEach(section => {
        const content = document.getElementById(`${section}-content`);
        if (content) {
            content.classList.add('active');
        }
    });
    
    // Set default active nav link
    const defaultNavLink = document.querySelector('.nav-link[onclick="loadSection(\'overview\')"]');
    if (defaultNavLink) {
        defaultNavLink.classList.add('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (window.innerWidth <= 1024 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'b':
                    e.preventDefault();
                    toggleSidebar();
                    break;
                case '1':
                    e.preventDefault();
                    loadSection('overview');
                    break;
                case '2':
                    e.preventDefault();
                    loadSection('lessons');
                    break;
                case '3':
                    e.preventDefault();
                    loadSection('practice');
                    break;
            }
        }
    });
}

// Toggle sidebar collapse
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    
    if (sidebar) {
        const isCollapsing = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        
        // If collapsing, close all section contents
        if (isCollapsing) {
            const sectionContents = document.querySelectorAll('.section-content');
            const sectionHeaders = document.querySelectorAll('.section-header');
            
            sectionContents.forEach(content => {
                content.classList.remove('active');
            });
            
            sectionHeaders.forEach(header => {
                header.classList.remove('active');
                const arrow = header.querySelector('.section-arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        }
        
        // Update toggle button icon
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-right';
                } else {
                    icon.className = 'fas fa-chevron-left';
                }
            }
        }
        
        // Show notification
        showNotification(sidebar.classList.contains('collapsed') ? 'Sidebar colapsado' : 'Sidebar expandido');
    }
}

// Toggle section collapse
function toggleSection(sectionId) {
    const sectionHeader = event.currentTarget;
    const sectionContent = document.getElementById(`${sectionId}-content`);
    
    if (sectionContent) {
        // Toggle active class
        sectionHeader.classList.toggle('active');
        sectionContent.classList.toggle('active');
        
        // Animate arrow
        const arrow = sectionHeader.querySelector('.section-arrow');
        if (arrow) {
            if (sectionContent.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
        
        // Show notification
        const sectionName = sectionHeader.querySelector('span').textContent;
        showNotification(`${sectionName} ${sectionContent.classList.contains('active') ? 'expandido' : 'contraído'}`);
    }
}

// Load section content
function loadSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the clicked nav link
        const clickedLink = event.currentTarget;
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
        
        // Show notification
        const sectionName = getSectionName(sectionId);
        showNotification(`Cargando ${sectionName}`);
        
        // Animate progress bars in the new section
        setTimeout(() => {
            animateProgressBars();
        }, 300);
    }
}

// Get section name for notifications
function getSectionName(sectionId) {
    const sectionNames = {
        'overview': 'Resumen',
        'progress': 'Progreso',
        'calendar': 'Calendario',
        'lessons': 'Lecciones',
        'practice': 'Práctica',
        'quizzes': 'Evaluaciones',
        'ngabe': 'Ngäbe',
        'naso': 'Naso',
        'guna': 'Guna',
        'bribri': 'Bri-Bri',
        'friends': 'Amigos',
        'groups': 'Grupos',
        'chat': 'Chat',
        'profile': 'Perfil',
        'preferences': 'Preferencias',
        'security': 'Seguridad'
    };
    
    return sectionNames[sectionId] || sectionId;
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        if (width) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
    
    // Animate progress circles
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        }, 200);
    });
}

// Show notification
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.dashboard-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'dashboard-notification';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-medium);
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Logout function
function logout() {
    showNotification('Cerrando sesión...');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Start lesson function
function startLesson(language) {
    showNotification(`¡Iniciando lección de ${language}!`);
    // Add your lesson logic here
}

// Show achievement function
function showAchievement(achievementId) {
    showNotification('¡Logro desbloqueado!');
    // Add your achievement logic here
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dashboard-notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`;
document.head.appendChild(style);

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.progress-card, .lang-progress-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Update stats periodically (simulate real-time updates)
function updateStats() {
    const livesElement = document.querySelector('.stat-item .stat-value');
    const pointsElement = document.querySelectorAll('.stat-item .stat-value')[1];
    const achievementsElement = document.querySelectorAll('.stat-item .stat-value')[2];
    
    if (livesElement) {
        // Simulate lives regeneration
        let currentLives = parseInt(livesElement.textContent);
        if (currentLives < 5) {
            setTimeout(() => {
                livesElement.textContent = currentLives + 1;
                showNotification('¡Vida regenerada!');
            }, 30000); // 30 seconds
        }
    }
    
    if (pointsElement) {
        // Simulate points earning
        let currentPoints = parseInt(pointsElement.textContent.replace(',', ''));
        setTimeout(() => {
            pointsElement.textContent = (currentPoints + 10).toLocaleString();
        }, 60000); // 1 minute
    }
}

// Start periodic updates
setInterval(updateStats, 60000); // Check every minute

// Add loading states
function showLoading(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = `
            <div class="loading-state" style="text-align: center; padding: 4rem 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h3>Cargando...</h3>
                <p>Por favor espera mientras cargamos el contenido</p>
            </div>
        `;
    }
}

// Add error handling
function showError(message) {
    showNotification(`Error: ${message}`);
}

// Add success handling
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-medium);
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for global access
window.dashboardFunctions = {
    toggleSidebar,
    loadSection,
    toggleSection,
    logout,
    startLesson,
    showAchievement,
    showNotification,
    showLoading,
    showError,
    showSuccess
}; 