class DashboardFooter extends HTMLElement {
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
                :host {
                    display: block;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 1rem 2rem;
                    flex-shrink: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                .footer-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: none;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .footer-left p {
                    margin: 0;
                    color: #7f8c8d;
                    font-size: 0.9rem;
                }

                .footer-right {
                    display: flex;
                    gap: 2rem;
                }

                .footer-link {
                    color: #7f8c8d;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.3s ease;
                }

                .footer-link:hover {
                    color: #4A90E2;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }

                    .footer-right {
                        justify-content: center;
                    }
                }

                /* Dark theme support */
                [data-theme="dark"] :host {
                    background: rgba(30, 30, 46, 0.9);
                    border-top-color: rgba(255, 255, 255, 0.1);
                }

                [data-theme="dark"] .footer-left p,
                [data-theme="dark"] .footer-link {
                    color: #bdc3c7;
                }

                [data-theme="dark"] .footer-link:hover {
                    color: #4A90E2;
                }
            </style>

            <div class="footer-container">
                <div class="footer-left">
                    <p>&copy; 2024 Soged. Todos los derechos reservados.</p>
                </div>
                <div class="footer-right">
                                    <a href="#" class="footer-link" data-link="privacy">Privacy Policy</a>
                <a href="#" class="footer-link" data-link="terms">Terms of Service</a>
                    <a href="#" class="footer-link" data-link="help">Help</a>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const footerLinks = this.shadowRoot.querySelectorAll('.footer-link');

        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const linkType = link.getAttribute('data-link');
                this.dispatchEvent(new CustomEvent('footerLink', {
                    detail: { linkType }
                }));
            });
        });
    }

    // Public methods
    updateCopyright(year) {
        const copyright = this.shadowRoot.querySelector('.footer-left p');
        copyright.textContent = `&copy; ${year} Soged. Todos los derechos reservados.`;
    }
}

customElements.define('dashboard-footer', DashboardFooter); 