class CourseFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['current-course'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const currentCourse = this.getAttribute('current-course') || 'ngabe';

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .footer {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    margin-top: 3rem;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }

                .footer-section h3 {
                    color: #2c3e50;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .footer-section h4 {
                    color: #2c3e50;
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .footer-section p {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .footer-section ul {
                    list-style: none;
                }

                .footer-section ul li {
                    margin-bottom: 0.5rem;
                }

                .footer-section ul li a {
                    color: #666;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .footer-section ul li a:hover {
                    color: #4A90E2;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .social-links a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #4A90E2, #7B68EE);
                    color: white;
                    border-radius: 50%;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1.2rem;
                }

                .social-links a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }

                .footer-bottom {
                    background: rgba(0, 0, 0, 0.05);
                    padding: 1.5rem 2rem;
                    text-align: center;
                }

                .footer-bottom p {
                    color: #666;
                    font-size: 0.9rem;
                }

                .course-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .course-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: #666;
                }

                .course-link:hover {
                    background: rgba(74, 144, 226, 0.1);
                    color: #4A90E2;
                }

                .course-link.active {
                    background: rgba(74, 144, 226, 0.2);
                    color: #4A90E2;
                    font-weight: 600;
                }

                .course-link i {
                    width: 20px;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                        padding: 1.5rem;
                    }

                    .footer-bottom {
                        padding: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .social-links {
                        justify-content: center;
                    }

                    .footer-section h3 {
                        font-size: 1.3rem;
                    }

                    .footer-section h4 {
                        font-size: 1.1rem;
                    }
                }
            </style>

            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Soged</h3>
                        <p>Preservando las lenguas indígenas de Panamá</p>
                        <p>Nuestra misión es mantener vivas las tradiciones y culturas ancestrales a través del aprendizaje de sus lenguas.</p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Enlaces Rápidos</h4>
                        <ul>
                            <li><a href="../index.html">
                                <i class="fas fa-home"></i>
                                Inicio
                            </a></li>
                            <li><a href="../pages/about.html">
                                <i class="fas fa-info-circle"></i>
                                Acerca de
                            </a></li>
                            <li><a href="../pages/contact.html">
                                <i class="fas fa-envelope"></i>
                                Contacto
                            </a></li>
                            <li><a href="../pages/resources.html">
                                <i class="fas fa-book"></i>
                                Recursos
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Idiomas</h4>
                        <div class="course-links">
                            <a href="ngabe-course.html" class="course-link ${currentCourse === 'ngabe' ? 'active' : ''}">
                                <i class="fas fa-leaf"></i>
                                Ngäbe
                            </a>
                            <a href="embera-course.html" class="course-link ${currentCourse === 'embera' ? 'active' : ''}">
                                <i class="fas fa-tree"></i>
                                Emberá
                            </a>
                            <a href="kuna-course.html" class="course-link ${currentCourse === 'kuna' ? 'active' : ''}">
                                <i class="fas fa-anchor"></i>
                                Kuna
                            </a>
                            <a href="bribri-course.html" class="course-link ${currentCourse === 'bribri' ? 'active' : ''}">
                                <i class="fas fa-feather"></i>
                                Bribrí
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Síguenos</h4>
                        <p>Conecta con nuestra comunidad y mantente al día con las últimas noticias.</p>
                        <div class="social-links">
                            <a href="#" title="Facebook">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" title="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" title="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" title="YouTube">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2024 Soged. Todos los derechos reservados. | Preservando las lenguas indígenas de Panamá</p>
                </div>
            </footer>
        `;
    }

    setupEventListeners() {
        // Add any additional event listeners if needed
        const courseLinks = this.shadowRoot.querySelectorAll('.course-link');
        
        courseLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                courseLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
            });
        });
    }

    // Public methods
    setCurrentCourse(course) {
        this.setAttribute('current-course', course);
    }

    updateSocialLinks(links) {
        // Method to update social media links if needed
        const socialLinks = this.shadowRoot.querySelectorAll('.social-links a');
        if (links && socialLinks.length === links.length) {
            socialLinks.forEach((link, index) => {
                if (links[index]) {
                    link.href = links[index];
                }
            });
        }
    }
}

customElements.define('course-footer', CourseFooter); 