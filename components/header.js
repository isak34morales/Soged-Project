// Web Component para el Header
class SogedHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Fredoka+One&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
                @import url('../css/header.css');

                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                }

                :root {
                    --primary-color: #00A3E0;
                    --primary-hover: #0088C7;
                    --secondary-color: #FF6B35;
                    --accent-color: #FFD23F;
                    --success-color: #2ECC71;
                    --warning-color: #F39C12;
                    --info-color: #3498DB;
                    --bg-primary: #F8FAFC;
                    --bg-secondary: #ffffff;
                    --bg-tertiary: #F1F5F9;
                    --card-bg: #fff;
                    --header-bg: #fff;
                    --footer-bg: #F8FAFC;
                    --navbar-bg: #fff;
                    --shadow-color: rgba(0, 163, 224, 0.08);
                    --text-primary: #1E293B;
                    --text-secondary: #64748B;
                    --text-color: #1E293B;
                    --border-color: #E2E8F0;
                    --input-bg: #fff;
                    --input-border: #CBD5E1;
                    --input-text: #1E293B;
                    --transition: all 0.3s cubic-bezier(.4,0,.2,1);
                    --gradient-primary: linear-gradient(135deg, #00A3E0 0%, #0088C7 100%);
                    --gradient-secondary: linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%);
                    --gradient-accent: linear-gradient(135deg, #FFD23F 0%, #FFA726 100%);
                    --gradient-success: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%);
                }

                [data-theme="dark"] {
                    --primary-color: #00A3E0;
                    --primary-hover: #0088C7;
                    --secondary-color: #FF6B35;
                    --accent-color: #FFD23F;
                    --success-color: #2ECC71;
                    --warning-color: #F39C12;
                    --info-color: #3498DB;
                    --bg-primary: #0F172A;
                    --bg-secondary: #1E293B;
                    --bg-tertiary: #334155;
                    --card-bg: #1E293B;
                    --header-bg: #0F172A;
                    --footer-bg: #0F172A;
                    --navbar-bg: #0F172A;
                    --shadow-color: rgba(0, 163, 224, 0.15);
                    --text-primary: #F1F5F9;
                    --text-secondary: #94A3B8;
                    --text-color: #F1F5F9;
                    --border-color: #334155;
                    --input-bg: #1E293B;
                    --input-border: #475569;
                    --input-text: #F1F5F9;
                    --transition: all 0.3s cubic-bezier(.4,0,.2,1);
                    --gradient-primary: linear-gradient(135deg, #00A3E0 0%, #0088C7 100%);
                    --gradient-secondary: linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%);
                    --gradient-accent: linear-gradient(135deg, #FFD23F 0%, #FFA726 100%);
                    --gradient-success: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%);
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .navbar {
                    background-color: var(--navbar-bg) !important;
                    box-shadow: 0 2px 10px var(--shadow-color);
                    padding: 1.2rem 0;
                    transition: var(--transition);
                    height: 90px;
                    border-bottom: 1px solid var(--border-color);
                }

                .container {
                    margin: 0 auto;
                    padding: 0 5rem;
                }

                .navbar .container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0 5rem;
                    height: 100%;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    flex: 0 0 auto;
                    padding-right: 1.5rem;
                    min-width: 180px;
                    height: 100%;
                }

                .header-center {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex: 0 0 auto;
                    padding-left: 1.5rem;
                    min-width: 180px;
                    height: 100%;
                }

                .navbar-collapse {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    transition: var(--transition);
                }

                .logo-image {
                    width: 45px;
                    height: 45px;
                    margin-right: 12px;
                    border-radius: 8px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .logo-image:hover {
                    transform: scale(1.1);
                }

                .logo-container:hover {
                    background: transparent !important;
                    transform: translateY(-2px);
                }

                                                         .logo-text {
                    font-family: 'Fredoka', sans-serif;
                    font-size: 2rem;
                    font-weight: bold;
                    background: var(--logo-green);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .navbar-brand {
                    color: var(--primary-color) !important;
                    font-family: 'Fredoka', sans-serif;
                    font-size: 1.8rem;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    text-decoration: none;
                }

                .navbar-brand::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #007bff, #28a745);
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }

                .navbar-brand:hover::before {
                    transform: scaleX(1);
                }

                .navbar-brand i {
                    font-size: 1.8rem;
                    color: var(--primary-color);
                    transition: var(--transition);
                }

                .navbar-brand:hover i {
                    transform: rotate(360deg);
                }

                .navbar-toggler {
                    display: none;
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                }

                .navbar-toggler-icon {
                    display: block;
                    width: 24px;
                    height: 2px;
                    background-color: var(--text-primary);
                    position: relative;
                    transition: var(--transition);
                }

                .navbar-toggler-icon::before,
                .navbar-toggler-icon::after {
                    content: '';
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background-color: var(--text-primary);
                    transition: var(--transition);
                }

                .navbar-toggler-icon::before {
                    top: -6px;
                }

                .navbar-toggler-icon::after {
                    bottom: -6px;
                }

                .navbar-nav {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .navbar-nav.mx-auto {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.2rem;
                    height: 100%;
                }

                .navbar-nav.mx-auto .nav-item {
                    margin: 0 0.1rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }

                .nav-item {
                    position: relative;
                    height: 100%;
                }

                .nav-link {
                    color: #333 !important;
                    font-weight: 600;
                    padding: 0.8rem 1.2rem;
                    position: relative;
                    transition: all 0.3s ease;
                    font-size: 1.1rem;
                    text-align: center;
                    margin: 0 0.1rem;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    border-bottom: 3px solid transparent;
                }

                .nav-link:hover {
                    color: var(--primary-color) !important;
                    transform: translateY(-2px);
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -1.5rem;
                    left: 50%;
                    width: 0;
                    height: 3px;
                    background: var(--gradient-primary);
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                    border-radius: 2px;
                }

                .nav-link:hover::after {
                    width: 80%;
                }

                .nav-link:hover {
                    color: var(--primary-color) !important;
                }

                /* Active state with permanent underline */
                .nav-link.active {
                    color: var(--primary-color) !important;
                }

                .nav-link.active::after {
                    width: 80%;
                    background: var(--primary-color);
                }

                .theme-toggle {
                    position: relative;
                    margin-right: 1rem;
                }

                .theme-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 30px;
                    background: var(--bg-tertiary);
                    border-radius: 30px;
                    cursor: pointer;
                    transition: var(--transition);
                    border: 2px solid var(--border-color);
                }

                .theme-switch::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 22px;
                    height: 22px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    transition: var(--transition);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                #theme-switch:checked + .theme-switch::before {
                    transform: translateX(30px);
                }

                #theme-switch {
                    display: none;
                }

                .theme-switch i {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 12px;
                    transition: var(--transition);
                }

                .theme-switch .fa-sun {
                    left: 8px;
                    color: #FFD23F;
                }

                .theme-switch .fa-moon {
                    right: 8px;
                    color: #64748B;
                }

                #theme-switch:checked + .theme-switch .fa-sun {
                    opacity: 0.3;
                }

                #theme-switch:checked + .theme-switch .fa-moon {
                    opacity: 1;
                }

                .nav-buttons {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }

                .btn {
                    padding: 0.7rem 1.3rem;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: var(--transition);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    border: 2px solid transparent;
                }

                .btn-primary {
                    background: var(--gradient-primary);
                    color: white;
                    border-color: var(--primary-color);
                }

                .btn-primary:hover {
                    background: var(--primary-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 163, 224, 0.3);
                }

                .btn-outline-primary {
                    background: transparent;
                    color: var(--secondary-color);
                    border-color: var(--secondary-color);
                }

                .btn-outline-primary:hover {
                    background: var(--secondary-color);
                    color: #333;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 179, 0, 0.3);
                }

                /* Responsive */
                @media (max-width: 991px) {
                    .navbar .container {
                        padding: 0 1rem;
                    }
                    .header-center {
                        flex: 1;
                        justify-content: flex-start;
                    }

                    .navbar-toggler {
                        display: block;
                    }

                    .navbar-collapse {
                        background: var(--card-bg);
                        padding: 1.5rem;
                        border-radius: 16px;
                        margin-top: 1rem;
                        box-shadow: 0 8px 32px var(--shadow-color);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border: 1px solid var(--border-color);
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        display: none;
                    }

                    .navbar-collapse.show {
                        display: block;
                    }

                    .navbar-nav.mx-auto {
                        flex-direction: column;
                        width: 100%;
                        gap: 0.3rem;
                    }

                    .navbar-nav.mx-auto .nav-item {
                        width: 100%;
                        margin: 0.1rem 0;
                    }

                    .nav-link {
                        padding: 0.8rem 1rem;
                        margin: 0.1rem 0;
                        transition: var(--transition);
                        text-align: center;
                        width: 100%;
                        border-radius: 12px;
                    }

                    .nav-link:hover {
                        color: var(--primary-color) !important;
                    }

                    .nav-link::after {
                        bottom: 0;
                        height: 2px;
                    }

                    .theme-toggle {
                        margin: 1rem 0;
                        display: flex;
                        justify-content: center;
                    }

                    .nav-buttons {
                        flex-direction: column;
                        width: 100%;
                        gap: 1rem;
                        margin-top: 1rem;
                    }

                    .nav-buttons .btn {
                        width: 100%;
                        justify-content: center;
                        padding: 1rem 1.5rem;
                    }
                }

                @media (max-width: 576px) {
                    .logo-text {
                        font-size: 1.5rem;
                    }

                    .navbar-brand i {
                        font-size: 1.6rem;
                    }

                    .nav-buttons .btn {
                        font-size: 0.9rem;
                        padding: 0.8rem 1.2rem;
                    }

                    .theme-switch {
                        width: 60px;
                        height: 32px;
                    }

                    .theme-switch::before {
                        width: 24px;
                        height: 24px;
                    }
                }
            </style>

            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container">
                    <div class="header-left">
                        <a href="index.html" class="navbar-brand">
                            <div class="logo-container">
                                <img src="Images/logoo.png" alt="Soged Logo" class="logo-image" style="width: 45px; height: 45px; margin-right: 12px;">
                                <span class="logo-text">Soged</span>
                            </div>
                        </a>
                    </div>
                    <div class="header-center">
                        <div class="navbar-collapse" id="navbarNav">
                                                         <ul class="navbar-nav mx-auto">
                                 <!-- Home -->
                                 <li class="nav-item">
                                     <a href="index.html" class="nav-link">
                                         <span>Home</span>
                                     </a>
                                 </li>
                                 <!-- Learn -->
                                 <li class="nav-item">
                                     <a href="languages.html" class="nav-link">
                                         <span>Learn</span>
                                     </a>
                                 </li>
                                 <!-- Resources -->
                                 <li class="nav-item">
                                     <a href="pages/resources.html" class="nav-link">
                                         <span>Resources</span>
                                     </a>
                                 </li>
                                 <!-- About Us -->
                                 <li class="nav-item">
                                     <a href="about.html" class="nav-link">
                                         <span>About Us</span>
                                     </a>
                                 </li>
                             </ul>
                        </div>
                    </div>
                    <div class="header-right">
                        <!-- Theme Switch, Login, Register, etc. -->
                        <label class="theme-toggle me-2">
                            <input type="checkbox" id="theme-switch" />
                            <span class="theme-switch">
                                <i class="fas fa-sun"></i>
                                <i class="fas fa-moon"></i>
                            </span>
                        </label>
                        <div class="nav-buttons">
                            <a href="auth/login.html" class="btn btn-outline-primary">Login</a>
                            <a href="auth/register.html" class="btn btn-primary">Register</a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Spacer for fixed navbar -->
            <div style="height: 90px;"></div>
        `;
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        
        // Mobile menu toggle
        const toggler = shadow.querySelector('.navbar-toggler');
        const collapse = shadow.querySelector('.navbar-collapse');
        
        if (toggler && collapse) {
            toggler.addEventListener('click', () => {
                collapse.classList.toggle('show');
            });
        }

        // Theme toggle
        const themeSwitch = shadow.querySelector('#theme-switch');
        if (themeSwitch) {
            themeSwitch.addEventListener('change', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }

        // Set active nav link based on current page
        this.setActiveNavLink();
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
        });
    }

    // Method to show/hide user menu
    toggleUserMenu(show) {
        const userMenu = this.shadowRoot.querySelector('#user-menu');
        const authButtons = this.shadowRoot.querySelector('#auth-buttons');
        
        if (show) {
            userMenu.classList.remove('d-none');
            authButtons.classList.add('d-none');
        } else {
            userMenu.classList.add('d-none');
            authButtons.classList.remove('d-none');
        }
    }

    // Method to set user name
    setUserName(name) {
        const userNameElement = this.shadowRoot.querySelector('#user-name');
        if (userNameElement) {
            userNameElement.textContent = name;
        }
    }
}

// Register the custom element
customElements.define('soged-header', SogedHeader); 