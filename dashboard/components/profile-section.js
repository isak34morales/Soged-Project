class ProfileSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.profileData = {
            user: {
                name: 'María Santos',
                email: 'maria.santos@email.com',
                avatar: 'https://ui-avatars.com/api/?name=María+Santos&background=4A90E2&color=fff&size=120',
                level: 8,
                totalXP: 1250,
                memberSince: '2024-01-15',
                streak: 7,
                achievements: 8,
                totalLessons: 24
            },
            stats: {
                totalProgress: 65,
                averageAccuracy: 87,
                studyTime: '2h 30m',
                lessonsThisWeek: 5,
                xpThisWeek: 150
            },
            courses: [
                {
                    name: 'Ngäbe',
                    progress: 75,
                    level: 3,
                    lessonsCompleted: 45,
                    totalLessons: 60,
                    color: '#4A90E2',
                    icon: 'fas fa-leaf'
                },
                {
                    name: 'Emberá',
                    progress: 45,
                    level: 2,
                    lessonsCompleted: 27,
                    totalLessons: 60,
                    color: '#50C878',
                    icon: 'fas fa-tree'
                },
                {
                    name: 'Guna',
                    progress: 30,
                    level: 1,
                    lessonsCompleted: 18,
                    totalLessons: 60,
                    color: '#FF6B6B',
                    icon: 'fas fa-mountain'
                }
            ],
            achievements: [
                {
                    id: 1,
                    title: 'First Steps',
                    description: 'Complete your first lesson',
                    icon: 'fas fa-star',
                    color: '#FFD23F',
                    unlocked: true,
                    date: '2024-01-15',
                    xp: 50
                },
                {
                    id: 2,
                    title: '7 Day Streak',
                    description: 'Maintain a 7-day learning streak',
                    icon: 'fas fa-fire',
                    color: '#FF6B35',
                    unlocked: true,
                    date: '2024-01-22',
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

                .profile-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Header Section */
                .profile-header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    animation: slideInDown 0.8s ease-out;
                }

                .profile-info {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }

                .profile-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #4A90E2;
                    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
                }

                .profile-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-details h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                .profile-subtitle {
                    font-size: 1.2rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                }

                /* Profile Form Styles */
                .profile-form-container {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .profile-form {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                /* Avatar Section */
                .avatar-section {
                    margin-bottom: 2rem;
                }

                .avatar-upload {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .current-avatar {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #4A90E2;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .current-avatar:hover .avatar-overlay {
                    opacity: 1;
                }

                .current-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .avatar-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    opacity: 0;
                    transition: all 0.3s ease;
                    font-family: 'Poppins', sans-serif;
                }

                .avatar-overlay i {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .avatar-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .btn-upload, .btn-remove {
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .btn-upload {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                }

                .btn-remove {
                    background: rgba(255, 107, 107, 0.1);
                    color: #FF6B6B;
                    border: 2px solid rgba(255, 107, 107, 0.2);
                }

                .btn-upload:hover, .btn-remove:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                /* Form Styles */
                .personal-info-section, .account-section, .preferences-section {
                    margin-bottom: 2rem;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                    font-family: 'Poppins', sans-serif;
                }

                .form-input {
                    padding: 1rem;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                    border-radius: 10px;
                    font-size: 1rem;
                    font-family: 'Poppins', sans-serif;
                    transition: all 0.3s ease;
                    background: white;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #4A90E2;
                    box-shadow: 0 4px 10px rgba(74, 144, 226, 0.2);
                }

                /* Preferences */
                .preferences-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .preference-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .preference-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .preference-info h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #2c3e50;
                    font-family: 'Poppins', sans-serif;
                }

                .preference-info p {
                    margin: 0.2rem 0 0 0;
                    font-size: 0.9rem;
                    color: #666;
                    font-family: 'Poppins', sans-serif;
                }

                /* Toggle Switch */
                .toggle-switch {
                    position: relative;
                    width: 50px;
                    height: 25px;
                    background: #ccc;
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active {
                    background: #4A90E2;
                }

                .toggle-switch::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 21px;
                    height: 21px;
                    background: white;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active::before {
                    transform: translateX(25px);
                }

                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2rem;
                }

                .btn-save, .btn-cancel {
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 15px;
                    font-weight: 700;
                    font-size: 1rem;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .btn-save {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                }

                .btn-cancel {
                    background: rgba(255, 255, 255, 0.1);
                    color: #666;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                }

                .btn-save:hover, .btn-cancel:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(74, 144, 226, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    color: #4A90E2;
                    font-weight: 600;
                    font-size: 0.9rem;
                    font-family: 'Poppins', sans-serif;
                }

                .meta-item i {
                    font-size: 1rem;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 1.5rem;
                    color: white;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: #666;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                /* Content Grid */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }

                /* Courses Section */
                .courses-section {
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
                    color: #2c3e50;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .course-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .course-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .course-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: white;
                }

                .course-info {
                    flex: 1;
                }

                .course-info h4 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .course-info p {
                    margin: 0.2rem 0 0 0;
                    font-size: 0.9rem;
                    color: #666;
                }

                .course-progress {
                    text-align: right;
                }

                .progress-percentage {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #4A90E2;
                }

                .progress-text {
                    font-size: 0.8rem;
                    color: #666;
                }

                /* Achievements Section */
                .achievements-section {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 2rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .achievement-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 15px;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .achievement-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .achievement-item.locked {
                    opacity: 0.6;
                }

                .achievement-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: white;
                }

                .achievement-info {
                    flex: 1;
                }

                .achievement-info h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .achievement-info p {
                    margin: 0.2rem 0 0 0;
                    font-size: 0.8rem;
                    color: #666;
                }

                .achievement-status {
                    text-align: right;
                }

                .status-unlocked {
                    color: #50C878;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .status-locked {
                    color: #999;
                    font-size: 0.8rem;
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

                    .profile-info {
                        flex-direction: column;
                        text-align: center;
                    }

                    .profile-details h1 {
                        font-size: 2rem;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <div class="profile-container">
                <!-- Profile Header -->
                <div class="profile-header">
                    <h1 class="profile-title">Edit Profile</h1>
                    <p class="profile-subtitle">Customize your information and settings</p>
                </div>

                <!-- Profile Form -->
                <div class="profile-form-container">
                    <div class="profile-form">
                        <!-- Avatar Section -->
                        <div class="avatar-section">
                            <h3 class="section-title">
                                <i class="fas fa-user-circle"></i>
                                Profile Photo
                            </h3>
                            <div class="avatar-upload">
                                <div class="current-avatar">
                                    <img src="${this.profileData.user.avatar}" alt="Profile Photo" id="currentAvatar">
                                    <div class="avatar-overlay">
                                        <i class="fas fa-camera"></i>
                                    </div>
                                </div>
                                <div class="avatar-options">
                                    <button class="btn-upload" id="uploadPhoto">
                                        <i class="fas fa-upload"></i>
                                        Upload Photo
                                    </button>
                                    <button class="btn-remove" id="removePhoto">
                                        <i class="fas fa-trash"></i>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Personal Information -->
                        <div class="personal-info-section">
                            <h3 class="section-title">
                                <i class="fas fa-user"></i>
                                Personal Information
                            </h3>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" id="firstName" value="${this.profileData.user.name.split(' ')[0]}" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" id="lastName" value="${this.profileData.user.name.split(' ')[1] || ''}" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" value="${this.profileData.user.email}" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="tel" id="phone" value="+507 6123-4567" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="birthdate">Date of Birth</label>
                                    <input type="date" id="birthdate" value="1995-06-15" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="location">Location</label>
                                    <input type="text" id="location" value="Panamá, Panamá" class="form-input">
                                </div>
                            </div>
                        </div>

                        <!-- Account Settings -->
                        <div class="account-section">
                            <h3 class="section-title">
                                <i class="fas fa-shield-alt"></i>
                                Account Settings
                            </h3>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" value="maria.santos" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="currentPassword">Current Password</label>
                                    <input type="password" id="currentPassword" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="newPassword">New Password</label>
                                    <input type="password" id="newPassword" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" class="form-input">
                                </div>
                            </div>
                        </div>

                        <!-- Preferences -->
                        <div class="preferences-section">
                            <h3 class="section-title">
                                <i class="fas fa-cog"></i>
                                Preferences
                            </h3>
                            <div class="preferences-grid">
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates and reminders via email</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Public Profile</h4>
                                        <p>Allow other users to see your profile</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Push Notifications</h4>
                                        <p>Get instant notifications on your device</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="preference-item">
                                    <div class="preference-info">
                                        <h4>Daily Reminders</h4>
                                        <p>Receive reminders to study</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button class="btn-save">
                                <i class="fas fa-save"></i>
                                Save Changes
                            </button>
                            <button class="btn-cancel">
                                <i class="fas fa-times"></i>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Avatar upload functionality
        const avatarInput = this.shadowRoot.getElementById('avatarInput');
        const currentAvatar = this.shadowRoot.getElementById('currentAvatar');
        const btnUpload = this.shadowRoot.querySelector('.btn-upload');
        const btnRemove = this.shadowRoot.querySelector('.btn-remove');

        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        currentAvatar.src = e.target.result;
                        this.dispatchEvent(new CustomEvent('avatarChanged', {
                            detail: { avatar: e.target.result }
                        }));
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (btnRemove) {
            btnRemove.addEventListener('click', () => {
                currentAvatar.src = this.profileData.user.avatar;
                this.dispatchEvent(new CustomEvent('avatarRemoved'));
            });
        }

        // Form inputs
        const formInputs = this.shadowRoot.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.dispatchEvent(new CustomEvent('profileFieldChanged', {
                    detail: { 
                        field: e.target.id, 
                        value: e.target.value 
                    }
                }));
            });
        });

        // Toggle switches
        const toggleSwitches = this.shadowRoot.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                const preference = toggle.closest('.preference-item').querySelector('h4').textContent;
                this.dispatchEvent(new CustomEvent('preferenceChanged', {
                    detail: { 
                        preference, 
                        enabled: toggle.classList.contains('active') 
                    }
                }));
            });
        });

        // Action buttons
        const btnSave = this.shadowRoot.querySelector('.btn-save');
        const btnCancel = this.shadowRoot.querySelector('.btn-cancel');

        if (btnSave) {
            btnSave.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('profileSaved', {
                    detail: { 
                        formData: this.getFormData() 
                    }
                }));
            });
        }

        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('profileCancelled'));
            });
        }
    }

    getFormData() {
        const formData = {};
        const inputs = this.shadowRoot.querySelectorAll('.form-input');
        inputs.forEach(input => {
            formData[input.id] = input.value;
        });
        return formData;
    }

    startAnimations() {
        const statCards = this.shadowRoot.querySelectorAll('.stat-card');
        const courseItems = this.shadowRoot.querySelectorAll('.course-item');
        const achievementItems = this.shadowRoot.querySelectorAll('.achievement-item');
        
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 200);
        });

        courseItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 150);
        });

        achievementItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 150);
        });
    }

    // Public methods
    updateProfile(newData) {
        this.profileData = { ...this.profileData, ...newData };
        this.render();
    }

    updateStats(newStats) {
        this.profileData.stats = { ...this.profileData.stats, ...newStats };
        this.render();
    }
}

customElements.define('profile-section', ProfileSection); 