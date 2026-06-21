/**
 * Partners Infinite Marquee — self-contained web component.
 * GPU-accelerated CSS animation with duplicated track for seamless looping.
 */
const PARTNERS = [
    {
        name: 'Museo de la Mola',
        logo: 'Images/partner/Museo de la Mola.png',
    },
    {
        name: 'Congreso Guna',
        logo: 'Images/partner/congresogeneral.jpg',
    },
    {
        name: 'Fundación Alberto Motta',
        logo: 'Images/partner/Fundacion Alberto Motta.png',
    },
];

const MARQUEE_SPEED_PX_PER_SEC = 80;
const MIN_SEGMENT_REPEATS = 2;

class PartnersMarquee extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._resizeObserver = null;
    }

    connectedCallback() {
        this.render();
        this.setupThemeListener();
        this.setupMarquee();
    }

    renderPartnerItem(partner, duplicate = false) {
        const hiddenAttr = duplicate ? ' aria-hidden="true"' : '';

        return `
            <li class="partner-item"${hiddenAttr}>
                <img
                    src="${partner.logo}"
                    alt="${duplicate ? '' : partner.name}"
                    class="partner-logo"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                >
                <span class="partner-name">${partner.name}</span>
            </li>
        `;
    }

    renderPartnerSegment(repeatCount, duplicate = false) {
        let html = '';

        for (let i = 0; i < repeatCount; i += 1) {
            html += PARTNERS.map((partner) => this.renderPartnerItem(partner, duplicate)).join('');
        }

        return html;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('../css/variables.css');

                :host {
                    display: block;
                    width: 100%;
                }

                .partners-section {
                    background: var(--bg-primary);
                    padding: 100px 0;
                    overflow: hidden;
                }

                .section-header {
                    max-width: 1200px;
                    margin: 0 auto 3rem;
                    padding: 0 2rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 1rem;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.6;
                }

                .marquee {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    mask-image: linear-gradient(
                        to right,
                        transparent,
                        #000 6%,
                        #000 94%,
                        transparent
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent,
                        #000 6%,
                        #000 94%,
                        transparent
                    );
                }

                .marquee-track {
                    display: flex;
                    width: max-content;
                    gap: 2rem;
                    will-change: transform;
                    animation: partners-marquee var(--marquee-duration, 35s) linear infinite;
                }

                .marquee:hover .marquee-track {
                    animation-play-state: paused;
                }

                .marquee-list {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    flex-shrink: 0;
                }

                .partner-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    padding: 1.5rem 2rem;
                    min-width: 200px;
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }

                .partner-item:hover {
                    transform: translateY(-5px) scale(1.05);
                }

                .partner-logo {
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                    border-radius: 50%;
                    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
                    transition: transform 0.3s ease, filter 0.3s ease;
                    pointer-events: none;
                    user-select: none;
                }

                .partner-item:hover .partner-logo {
                    transform: scale(1.15);
                    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
                }

                .partner-name {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    text-align: center;
                    line-height: 1.3;
                    opacity: 0.8;
                    transition: opacity 0.3s ease, color 0.3s ease, transform 0.3s ease;
                }

                .partner-item:hover .partner-name {
                    opacity: 1;
                    color: var(--primary-color);
                    transform: translateY(-2px);
                }

                @keyframes partners-marquee {
                    from {
                        transform: translate3d(0, 0, 0);
                    }
                    to {
                        transform: translate3d(calc(-1 * var(--marquee-shift, 50%)), 0, 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation: none;
                        flex-wrap: wrap;
                        justify-content: center;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                        gap: 0;
                    }

                    .marquee-list[aria-hidden="true"] {
                        display: none;
                    }

                    .marquee {
                        mask-image: none;
                        -webkit-mask-image: none;
                    }
                }

                @media (max-width: 768px) {
                    .partners-section {
                        padding: 70px 0;
                    }

                    .section-header {
                        margin-bottom: 2rem;
                        padding: 0 1rem;
                    }

                    .marquee-track,
                    .marquee-list {
                        gap: 1.5rem;
                    }

                    .partner-item {
                        min-width: 160px;
                        padding: 1rem 1.25rem;
                    }

                    .partner-logo {
                        width: 64px;
                        height: 64px;
                    }
                }
            </style>

            <section class="partners-section" aria-label="Our Partners">
                <div class="section-header">
                    <h2 class="section-title">Our Partners</h2>
                    <p class="section-subtitle">
                        Working together to preserve indigenous languages and cultures.
                    </p>
                </div>

                <div class="marquee">
                    <div class="marquee-track">
                        <ul class="marquee-list" data-marquee-list="primary">
                            ${this.renderPartnerSegment(MIN_SEGMENT_REPEATS, false)}
                        </ul>
                        <ul class="marquee-list" data-marquee-list="clone" aria-hidden="true">
                            ${this.renderPartnerSegment(MIN_SEGMENT_REPEATS, true)}
                        </ul>
                    </div>
                </div>
            </section>
        `;
    }

    setupMarquee() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const marquee = this.shadowRoot.querySelector('.marquee');
        const track = this.shadowRoot.querySelector('.marquee-track');
        const primaryList = this.shadowRoot.querySelector('[data-marquee-list="primary"]');
        const cloneList = this.shadowRoot.querySelector('[data-marquee-list="clone"]');

        if (!marquee || !track || !primaryList || !cloneList) return;

        const syncMarquee = () => {
            this.resetMarqueeLists(primaryList, cloneList);
            this.fillMarqueeLists(marquee, primaryList, cloneList);
            this.applyMarqueeMetrics(track, primaryList);
        };

        syncMarquee();

        this._resizeObserver = new ResizeObserver(() => {
            syncMarquee();
        });
        this._resizeObserver.observe(marquee);

        if (primaryList.querySelectorAll('img').length > 0) {
            const images = primaryList.querySelectorAll('img');
            let pending = images.length;

            const onImageReady = () => {
                pending -= 1;
                if (pending === 0) {
                    syncMarquee();
                }
            };

            images.forEach((img) => {
                if (img.complete) {
                    onImageReady();
                } else {
                    img.addEventListener('load', onImageReady, { once: true });
                    img.addEventListener('error', onImageReady, { once: true });
                }
            });
        }
    }

    resetMarqueeLists(primaryList, cloneList) {
        primaryList.innerHTML = this.renderPartnerSegment(MIN_SEGMENT_REPEATS, false);
        cloneList.innerHTML = this.renderPartnerSegment(MIN_SEGMENT_REPEATS, true);
    }

    fillMarqueeLists(marquee, primaryList, cloneList) {
        const containerWidth = marquee.clientWidth;
        const segmentHtml = this.renderPartnerSegment(1, false);
        const segmentHtmlClone = this.renderPartnerSegment(1, true);
        const maxRepeats = 20;

        let repeats = MIN_SEGMENT_REPEATS;

        while (primaryList.scrollWidth < containerWidth + 240 && repeats < maxRepeats) {
            primaryList.insertAdjacentHTML('beforeend', segmentHtml);
            cloneList.insertAdjacentHTML('beforeend', segmentHtmlClone);
            repeats += 1;
        }
    }

    applyMarqueeMetrics(track, primaryList) {
        const shift = primaryList.offsetWidth + this.getTrackGap(track);
        const duration = Math.max(shift / MARQUEE_SPEED_PX_PER_SEC, 12);

        track.style.setProperty('--marquee-shift', `${shift}px`);
        track.style.setProperty('--marquee-duration', `${duration}s`);
    }

    getTrackGap(track) {
        const styles = getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap || '0') || 0;
    }

    setupThemeListener() {
        const syncTheme = () => this.updateTheme();

        document.addEventListener('themeChanged', syncTheme);

        this._themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    syncTheme();
                }
            });
        });

        this._themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        syncTheme();
    }

    updateTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.setAttribute('data-theme', currentTheme);

        const computedStyle = getComputedStyle(document.documentElement);
        const cssVars = [
            '--primary-color',
            '--primary-hover',
            '--secondary-color',
            '--bg-primary',
            '--text-primary',
            '--text-secondary',
        ];

        cssVars.forEach((varName) => {
            const value = computedStyle.getPropertyValue(varName);
            if (value) {
                this.shadowRoot.style.setProperty(varName, value);
            }
        });
    }

    disconnectedCallback() {
        if (this._themeObserver) {
            this._themeObserver.disconnect();
        }

        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }
}

customElements.define('partners-marquee', PartnersMarquee);
