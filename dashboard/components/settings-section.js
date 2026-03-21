class SettingsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.settings = {
            notifications: {
                enabled: true,
                sound: true,
                email: false,
                push: true
            },
            appearance: {
                theme: 'light',
                language: 'es',
                fontSize: 'medium'
            },
            privacy: {
                publicProfile: true,
                showProgress: true,
                showAchievements: true,
                allowMessages: true
            },
            study: {
                dailyGoal: 30,
                reminderTime: '09:00',
                autoPlay: true,
                showHints: true
            }
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

                .settings-container {
                    max-width: 1000px;
                    margin: 0 auto;
                }

                /* Header Section */
                .settings-header {
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

                .settings-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }

                .settings-subtitle {
                    font-size: 1.2rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                }

                /* Settings Grid */
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2rem;
                }

                .settings-section {
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

                .setting-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .setting-item:last-child {
                    border-bottom: none;
                }

                .setting-item:hover {
                    background: rgba(74, 144, 226, 0.05);
                    border-radius: 10px;
                    padding-left: 1rem;
                    padding-right: 1rem;
                }

                .setting-info {
                    flex: 1;
                }

                .setting-label {
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    margin-bottom: 0.2rem;
                }

                .setting-description {
                    font-size: 0.9rem;
                    font-family: 'Poppins', sans-serif;
                    color: #666;
                }

                /* Toggle Switch */
                .toggle-switch {
                    position: relative;
                    width: 60px;
                    height: 30px;
                    background: #ccc;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active {
                    background: #4A90E2;
                }

                .toggle-switch::before {
                    content: '';
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 24px;
                    height: 24px;
                    background: white;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .toggle-switch.active::before {
                    transform: translateX(30px);
                }

                /* Select Dropdown */
                .select-dropdown {
                    padding: 0.5rem 1rem;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                    border-radius: 10px;
                    background: white;
                    color: #2c3e50;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .select-dropdown:hover {
                    border-color: #4A90E2;
                    box-shadow: 0 4px 10px rgba(74, 144, 226, 0.2);
                }

                /* Number Input */
                .number-input {
                    padding: 0.5rem 1rem;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                    border-radius: 10px;
                    background: white;
                    color: #2c3e50;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    width: 80px;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .number-input:focus {
                    outline: none;
                    border-color: #4A90E2;
                    box-shadow: 0 4px 10px rgba(74, 144, 226, 0.2);
                }

                /* Time Input */
                .time-input {
                    padding: 0.5rem 1rem;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                    border-radius: 10px;
                    background: white;
                    color: #2c3e50;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .time-input:hover {
                    border-color: #4A90E2;
                    box-shadow: 0 4px 10px rgba(74, 144, 226, 0.2);
                }

                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    justify-content: center;
                }

                .action-btn {
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

                .action-btn.primary {
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                }

                .action-btn.secondary {
                    background: rgba(74, 144, 226, 0.1);
                    color: #4A90E2;
                    border: 2px solid rgba(74, 144, 226, 0.2);
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                /* Theme Preview */
                .theme-preview {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .theme-option {
                    width: 60px;
                    height: 40px;
                    border-radius: 10px;
                    cursor: pointer;
                    border: 3px solid transparent;
                    transition: all 0.3s ease;
                }

                .theme-option.active {
                    border-color: #4A90E2;
                    transform: scale(1.1);
                }

                .theme-option.light {
                    background: linear-gradient(135deg, #f8f9fa, #ffffff);
                }

                .theme-option.dark {
                    background: linear-gradient(135deg, #2c3e50, #34495e);
                }

                .theme-option.auto {
                    background: linear-gradient(135deg, #f8f9fa 50%, #2c3e50 50%);
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
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .settings-title {
                        font-size: 2rem;
                    }

                    .settings-grid {
                        grid-template-columns: 1fr;
                    }

                    .action-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <div class="settings-container">
                <!-- Settings Header -->
                <div class="settings-header">
                    <h1 class="settings-title">Settings</h1>
                    <p class="settings-subtitle">Customize your learning experience</p>
                </div>

                <!-- Settings Grid -->
                <div class="settings-grid">
                    <!-- Notifications Section -->
                    <div class="settings-section">
                        <h3 class="section-title">
                            <i class="fas fa-bell"></i>
                            Notifications
                        </h3>
                        
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Notifications Push</div>
                                <div class="setting-description">Recieve notifications in real time</div>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.push ? 'active' : ''}" data-setting="push"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Sounds</div>
                                <div class="setting-description">Sound effects in the application</div>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.sound ? 'active' : ''}" data-setting="sound"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Notifications by Email</div>
                                <div class="setting-description">Receive updates by email</div>
                            </div>
                            <div class="toggle-switch ${this.settings.notifications.email ? 'active' : ''}" data-setting="email"></div>
                        </div>
                    </div>

                    <!-- Appearance Section -->
                    <div class="settings-section">
                        <h3 class="section-title">
                            <i class="fas fa-palette"></i>
                            Appearance
                        </h3>
                        
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Theme</div>
                                <div class="setting-description">Choose the theme of the application</div>
                            </div>
                            <div class="theme-preview">
                                <div class="theme-option light ${this.settings.appearance.theme === 'light' ? 'active' : ''}" data-theme="light"></div>
                                <div class="theme-option dark ${this.settings.appearance.theme === 'dark' ? 'active' : ''}" data-theme="dark"></div>
                                <div class="theme-option auto ${this.settings.appearance.theme === 'auto' ? 'active' : ''}" data-theme="auto"></div>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Font Size</div>
                                <div class="setting-description">Adjust the text size</div>
                            </div>
                            <select class="select-dropdown" data-setting="fontSize">
                                <option value="small" ${this.settings.appearance.fontSize === 'small' ? 'selected' : ''}>Small</option>
                                <option value="medium" ${this.settings.appearance.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                                <option value="large" ${this.settings.appearance.fontSize === 'large' ? 'selected' : ''}>Large</option>
                            </select>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Language</div>
                                <div class="setting-description">Language of the interface</div>
                            </div>
                            <select class="select-dropdown" data-setting="language">
                                <option value="es" ${this.settings.appearance.language === 'es' ? 'selected' : ''}>Spanish</option>
                                <option value="en" ${this.settings.appearance.language === 'en' ? 'selected' : ''}>English</option>
                            </select>
                        </div>
                    </div>

                    <!-- Privacy Section -->
                    <div class="settings-section">
                        <h3 class="section-title">
                            <i class="fas fa-shield-alt"></i>
                            Privacy
                        </h3>
                        
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Public Profile</div>
                                <div class="setting-description">Allow others to see your profile</div>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.publicProfile ? 'active' : ''}" data-setting="publicProfile"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Show Progress</div>
                                <div class="setting-description">Share your progress with the community</div>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.showProgress ? 'active' : ''}" data-setting="showProgress"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Show Achievements</div>
                                <div class="setting-description">Share your achievements with others</div>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.showAchievements ? 'active' : ''}" data-setting="showAchievements"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Allow Messages</div>
                                <div class="setting-description">Receive messages from other users</div>
                            </div>
                            <div class="toggle-switch ${this.settings.privacy.allowMessages ? 'active' : ''}" data-setting="allowMessages"></div>
                        </div>
                    </div>

                    <!-- Study Section -->
                    <div class="settings-section">
                        <h3 class="section-title">
                            <i class="fas fa-graduation-cap"></i>
                            Study
                        </h3>
                        
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Daily Goal (minutes)</div>
                                <div class="setting-description">Set your daily study target</div>
                            </div>
                            <input type="number" class="number-input" value="${this.settings.study.dailyGoal}" min="10" max="120" data-setting="dailyGoal">
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Reminder Time</div>
                                <div class="setting-description">When to receive study reminders</div>
                            </div>
                            <input type="time" class="time-input" value="${this.settings.study.reminderTime}" data-setting="reminderTime">
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Auto-Continue</div>
                                <div class="setting-description">Automatically continue to the next lesson</div>
                            </div>
                            <div class="toggle-switch ${this.settings.study.autoPlay ? 'active' : ''}" data-setting="autoPlay"></div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Show Hints</div>
                                <div class="setting-description">Show hints during exercises</div>
                            </div>
                            <div class="toggle-switch ${this.settings.study.showHints ? 'active' : ''}" data-setting="showHints"></div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="action-btn primary" id="saveSettings">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                    <button class="action-btn secondary" id="resetSettings">
                        <i class="fas fa-undo"></i>
                        Restore Defaults
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Toggle switches
        const toggleSwitches = this.shadowRoot.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const setting = toggle.dataset.setting;
                toggle.classList.toggle('active');
                
                // Update settings object
                if (setting.includes('.')) {
                    const [category, key] = setting.split('.');
                    this.settings[category][key] = toggle.classList.contains('active');
                } else {
                    // Handle nested settings
                    if (setting === 'push' || setting === 'sound' || setting === 'email') {
                        this.settings.notifications[setting] = toggle.classList.contains('active');
                    } else if (setting === 'publicProfile' || setting === 'showProgress' || setting === 'showAchievements' || setting === 'allowMessages') {
                        this.settings.privacy[setting] = toggle.classList.contains('active');
                    } else if (setting === 'autoPlay' || setting === 'showHints') {
                        this.settings.study[setting] = toggle.classList.contains('active');
                    }
                }
            });
        });

        // Theme options
        const themeOptions = this.shadowRoot.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.settings.appearance.theme = option.dataset.theme;
            });
        });

        // Select dropdowns
        const selectDropdowns = this.shadowRoot.querySelectorAll('.select-dropdown');
        selectDropdowns.forEach(select => {
            select.addEventListener('change', () => {
                const setting = select.dataset.setting;
                this.settings.appearance[setting] = select.value;
            });
        });

        // Number inputs
        const numberInputs = this.shadowRoot.querySelectorAll('.number-input');
        numberInputs.forEach(input => {
            input.addEventListener('change', () => {
                const setting = input.dataset.setting;
                this.settings.study[setting] = parseInt(input.value);
            });
        });

        // Time inputs
        const timeInputs = this.shadowRoot.querySelectorAll('.time-input');
        timeInputs.forEach(input => {
            input.addEventListener('change', () => {
                const setting = input.dataset.setting;
                this.settings.study[setting] = input.value;
            });
        });

        // Action buttons
        const saveBtn = this.shadowRoot.getElementById('saveSettings');
        const resetBtn = this.shadowRoot.getElementById('resetSettings');

        saveBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('settingsSaved', {
                detail: { settings: this.settings }
            }));
        });

        resetBtn.addEventListener('click', () => {
            this.resetToDefaults();
        });
    }

    startAnimations() {
        const settingsSections = this.shadowRoot.querySelectorAll('.settings-section');
        settingsSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'slideInDown 0.8s ease-out';
            }, index * 200);
        });
    }

    resetToDefaults() {
        this.settings = {
            notifications: {
                enabled: true,
                sound: true,
                email: false,
                push: true
            },
            appearance: {
                theme: 'light',
                language: 'es',
                fontSize: 'medium'
            },
            privacy: {
                publicProfile: true,
                showProgress: true,
                showAchievements: true,
                allowMessages: true
            },
            study: {
                dailyGoal: 30,
                reminderTime: '09:00',
                autoPlay: true,
                showHints: true
            }
        };
        this.render();
    }

    // Public methods
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.render();
    }

    getSettings() {
        return this.settings;
    }
}

customElements.define('settings-section', SettingsSection); 