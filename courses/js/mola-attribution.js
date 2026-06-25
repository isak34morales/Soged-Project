/**
 * Mola image attribution — Museo de la Mola (store gallery only)
 * https://museodelamola.org/
 */
const MolaAttribution = {
    MUSEUM_URL: 'https://museodelamola.org/',
    LABEL: 'Image provided by Museo de la Mola',

    shouldSkip(img, src) {
        if (!src) return true;
        if (img?.dataset?.noMolaAttribution === 'true') return true;
        if (img?.closest('[data-no-mola-attribution]')) return true;
        const skipClasses = ['course-flag-img', 'main-course-icon-img', 'option-flag-img', 'store-promo-mola', 'sidebar-logo', 'loading-logo', 'avatar-img', 'profile-avatar-img', 'header-avatar', 'mini-stat-coco-img', 'store-coco-icon', 'store-balance-coco', 'map-info-image'];
        if (skipClasses.some(c => img?.classList?.contains(c))) return true;
        if (/mola-icon\.png/i.test(src)) return true;
        if (/Soged\//i.test(src) && !/Molas/i.test(src)) return true;
        return false;
    },

    isMolaImage(src, img) {
        if (this.shouldSkip(img, src)) return false;
        return /Molas[\s-]Guna/i.test(src) || /\/Mola \d/i.test(src) || /Comarca-Guna/i.test(src);
    },

    wrapHtml(imgSrc, alt, extraClass = '') {
        if (!this.isMolaImage(imgSrc)) {
            return `<img src="${imgSrc}" alt="${alt || ''}" class="${extraClass}" loading="lazy">`;
        }
        return `
            <figure class="mola-attribution-wrap mola-attribution-wrap--store ${extraClass}" role="group" aria-label="${this.LABEL}">
                <a href="${this.MUSEUM_URL}" target="_blank" rel="noopener noreferrer" class="mola-attribution-link" aria-label="Visit Museo de la Mola website">
                    <img src="${imgSrc}" alt="${alt || 'Guna mola'}" class="mola-attribution-img" loading="lazy">
                    <span class="mola-attribution-badge">${this.LABEL}</span>
                </a>
                <figcaption class="mola-attribution-caption">
                    <a href="${this.MUSEUM_URL}" target="_blank" rel="noopener noreferrer" class="mola-learn-more-btn">
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i> Learn More
                    </a>
                </figcaption>
            </figure>`;
    },

    wrapElement(img) {
        if (!img || img.closest('.mola-attribution-wrap')) return;
        const src = img.getAttribute('src') || img.src || '';
        if (!this.isMolaImage(src, img)) return;

        const figure = document.createElement('figure');
        figure.className = 'mola-attribution-wrap mola-attribution-wrap--store';
        figure.setAttribute('role', 'group');
        figure.setAttribute('aria-label', this.LABEL);

        const link = document.createElement('a');
        link.href = this.MUSEUM_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'mola-attribution-link';

        const badge = document.createElement('span');
        badge.className = 'mola-attribution-badge';
        badge.textContent = this.LABEL;

        const caption = document.createElement('figcaption');
        caption.className = 'mola-attribution-caption';
        const learnBtn = document.createElement('a');
        learnBtn.href = this.MUSEUM_URL;
        learnBtn.target = '_blank';
        learnBtn.rel = 'noopener noreferrer';
        learnBtn.className = 'mola-learn-more-btn';
        learnBtn.innerHTML = '<i class="fas fa-external-link-alt" aria-hidden="true"></i> Learn More';
        caption.appendChild(learnBtn);

        img.parentNode.insertBefore(figure, img);
        link.appendChild(img);
        link.appendChild(badge);
        figure.appendChild(link);
        figure.appendChild(caption);
    },

    processContainer(root = document) {
        root.querySelectorAll('img').forEach(img => this.wrapElement(img));
    },

    observe() {
        if (typeof MutationObserver === 'undefined') return;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG') this.wrapElement(node);
                        else this.processContainer(node);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

window.MolaAttribution = MolaAttribution;
document.addEventListener('DOMContentLoaded', () => {
    MolaAttribution.processContainer();
    MolaAttribution.observe();
});
