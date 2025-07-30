class CommunitySection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.communityData = {
            totalMembers: 1247,
            activeGroups: 89,
            eventsThisMonth: 15,
            recentActivity: [
                {
                    id: 1,
                                user: 'Juan Perez',
            action: 'completed lesson 15 of Ngäbe',
                    time: 'Hace 2 horas',
                    avatar: 'https://ui-avatars.com/api/?name=Juan+Pérez&background=4A90E2&color=fff&size=40',
                    course: 'Ngäbe',
                    xp: 50
                },
                {
                    id: 2,
                                user: 'Ana Garcia',
            action: 'joined the group "Emberá Students"',
                    time: 'Hace 4 horas',
                    avatar: 'https://ui-avatars.com/api/?name=Ana+García&background=50C878&color=fff&size=40',
                    course: 'Emberá',
                    xp: 25
                },
                {
                    id: 3,
                                user: 'Carlos Lopez',
            action: 'reached level 5 in Guna',
                    time: 'Hace 6 horas',
                    avatar: 'https://ui-avatars.com/api/?name=Carlos+López&background=FF6B6B&color=fff&size=40',
                    course: 'Guna',
                    xp: 100
                },
                {
                    id: 4,
                                user: 'Maria Rodriguez',
            action: 'completed 7 day streak',
                    time: 'Hace 8 horas',
                    avatar: 'https://ui-avatars.com/api/?name=María+Rodríguez&background=9B59B6&color=fff&size=40',
                    course: 'Ngäbe',
                    xp: 75
                }
            ],
            studyGroups: [
                {
                    id: 1,
                    name: 'Estudiantes de Ngäbe',
                    members: 156,
                    course: 'Ngäbe',
                    color: '#4A90E2',
                    icon: 'fas fa-leaf',
                    description: 'Grupo para practicar y aprender Ngäbe juntos'
                },
                {
                    id: 2,
                    name: 'Emberá Beginners',
                    members: 89,
                    course: 'Emberá',
                    color: '#50C878',
                    icon: 'fas fa-tree',
                    description: 'Group for Emberá beginners'
                },
                {
                    id: 3,
                    name: 'Guna Culture',
                    members: 67,
                    course: 'Guna',
                    color: '#FF6B6B',
                    icon: 'fas fa-mountain',
                    description: 'Explorando la cultura Guna'
                },
                {
                    id: 4,
                    name: 'Naso Explorers',
                    members: 34,
                    course: 'Naso',
                    color: '#9B59B6',
                    icon: 'fas fa-water',
                    description: 'Descubriendo la lengua Naso'
                }
            ],
            upcomingEvents: [
                {
                    id: 1,
                    title: 'Ngäbe Conversation',
                    date: '2024-01-25',
                    time: '19:00',
                    participants: 23,
                    type: 'conversation',
                    course: 'Ngäbe'
                },
                {
                    id: 2,
                    title: 'Emberá Culture Workshop',
                    date: '2024-01-28',
                    time: '15:00',
                    participants: 45,
                    type: 'workshop',
                    course: 'Emberá'
                },
                {
                    id: 3,
                    title: 'Guna Practice',
                    date: '2024-01-30',
                    time: '18:00',
                    participants: 18,
                    type: 'practice',
                    course: 'Guna'
                }
            ]
        };
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

                .community-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Header Section */
                .community-header {
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

                .community-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }

                .community-subtitle {
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

                /* Content Grid */
                .content-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 2rem;
                }

                /* Activity Section */
                .activity-section {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .activity-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .activity-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .activity-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .activity-content {
                    flex: 1;
                }

                .activity-content p {
                    margin: 0;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                }

                .activity-content strong {
                    color: #4A90E2;
                }

                .activity-time {
                    font-size: 0.8rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                    margin-top: 0.2rem;
                }

                .activity-xp {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                }

                /* Sidebar */
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                /* Study Groups */
                .groups-section {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .group-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .group-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .group-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: white;
                    flex-shrink: 0;
                }

                .group-info h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                }

                .group-info p {
                    margin: 0.2rem 0 0 0;
                    font-size: 0.8rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                }

                .group-members {
                    font-size: 0.8rem;
                    color: #4A90E2;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                }

                /* Events Section */
                .events-section {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .event-card {
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .event-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .event-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .event-title {
                    font-weight: 700;
                    color: #2c3e50;
                    margin: 0;
                }

                .event-type {
                    padding: 0.2rem 0.6rem;
                    border-radius: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .event-type.conversation {
                    background: rgba(74, 144, 226, 0.2);
                    color: #4A90E2;
                }

                .event-type.workshop {
                    background: rgba(80, 200, 120, 0.2);
                    color: #50C878;
                }

                .event-type.practice {
                    background: rgba(255, 107, 107, 0.2);
                    color: #FF6B6B;
                }

                .event-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                    color: #666;
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

                /* Responsive */
                @media (max-width: 1024px) {
                    .content-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .community-title {
                        font-size: 2rem;
                    }

                    .stats-row {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            </style>

            <div class="community-container">
                <!-- Header Section -->
                <div class="community-header">
                    <h1 class="community-title">Comunidad</h1>
                    <p class="community-subtitle">Conecta con otros estudiantes y comparte tu progreso</p>
                    <div class="stats-row">
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>${this.communityData.totalMembers} estudiantes activos</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-layer-group"></i>
                            <span>${this.communityData.activeGroups} grupos de estudio</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${this.communityData.eventsThisMonth} eventos este mes</span>
                        </div>
                    </div>
                </div>

                <!-- Content Grid -->
                <div class="content-grid">
                    <!-- Activity Section -->
                    <div class="activity-section">
                        <h3 class="section-title">
                            <i class="fas fa-bolt"></i>
                            Actividad Reciente
                        </h3>
                        <div class="activity-list">
                            ${this.communityData.recentActivity.map(activity => `
                                <div class="activity-item">
                                    <div class="activity-avatar">
                                        <img src="${activity.avatar}" alt="${activity.user}">
                                    </div>
                                    <div class="activity-content">
                                        <p><strong>${activity.user}</strong> ${activity.action}</p>
                                        <span class="activity-time">${activity.time}</span>
                                    </div>
                                    <div class="activity-xp">
                                        +${activity.xp} XP
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="sidebar">
                        <!-- Study Groups -->
                        <div class="groups-section">
                            <h3 class="section-title">
                                <i class="fas fa-layer-group"></i>
                                Grupos de Estudio
                            </h3>
                            ${this.communityData.studyGroups.map(group => `
                                <div class="group-card" data-group-id="${group.id}">
                                    <div class="group-icon" style="background: ${group.color};">
                                        <i class="${group.icon}"></i>
                                    </div>
                                    <div class="group-info">
                                        <h4>${group.name}</h4>
                                        <p>${group.description}</p>
                                    </div>
                                    <div class="group-members">
                                        ${group.members} miembros
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Upcoming Events -->
                        <div class="events-section">
                            <h3 class="section-title">
                                <i class="fas fa-calendar-alt"></i>
                                Upcoming Events
                            </h3>
                            ${this.communityData.upcomingEvents.map(event => `
                                <div class="event-card" data-event-id="${event.id}">
                                    <div class="event-header">
                                        <h4 class="event-title">${event.title}</h4>
                                        <span class="event-type ${event.type}">${event.type}</span>
                                    </div>
                                    <div class="event-details">
                                        <span>${this.formatDate(event.date)} - ${event.time}</span>
                                        <span>${event.participants} participantes</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const groupCards = this.shadowRoot.querySelectorAll('.group-card');
        const eventCards = this.shadowRoot.querySelectorAll('.event-card');
        
        groupCards.forEach(card => {
            card.addEventListener('click', () => {
                const groupId = card.dataset.groupId;
                const group = this.communityData.studyGroups.find(g => g.id == groupId);
                this.dispatchEvent(new CustomEvent('groupClicked', {
                    detail: { group }
                }));
            });
        });

        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                const eventId = card.dataset.eventId;
                const event = this.communityData.upcomingEvents.find(e => e.id == eventId);
                this.dispatchEvent(new CustomEvent('eventClicked', {
                    detail: { event }
                }));
            });
        });
    }

    startAnimations() {
        const activityItems = this.shadowRoot.querySelectorAll('.activity-item');
        const groupCards = this.shadowRoot.querySelectorAll('.group-card');
        const eventCards = this.shadowRoot.querySelectorAll('.event-card');
        
        activityItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 100);
        });

        groupCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 150);
        });

        eventCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 150);
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
        });
    }

    // Public methods
    updateActivity(newActivity) {
        this.communityData.recentActivity.unshift(newActivity);
        if (this.communityData.recentActivity.length > 10) {
            this.communityData.recentActivity.pop();
        }
        this.render();
    }

    addEvent(newEvent) {
        this.communityData.upcomingEvents.push(newEvent);
        this.render();
    }
}

customElements.define('community-section', CommunitySection); 