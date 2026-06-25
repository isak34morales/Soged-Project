/**
 * Mola images — tap/click opens Museo de la Mola
 * https://museodelamola.org/
 */
const MolaAttribution = {
    MUSEUM_URL: 'https://museodelamola.org/',
    LABEL: 'Image provided by Museo de la Mola',

    shouldSkip(img, src) {
        if (!src) return true;
        if (img?.dataset?.noMolaAttribution === 'true') return true;
        if (img?.closest('[data-no-mola-attribution]')) return true;
        if (img?.closest('a[href*="museodelamola"]')) return true;
        const skipClasses = ['course-flag-img', 'main-course-icon-img', 'option-flag-img', 'store-promo-mola', 'sidebar-logo', 'loading-logo', 'avatar-img', 'profile-avatar-img', 'header-avatar', 'mini-stat-coco-img', 'store-coco-icon', 'store-balance-coco', 'map-mola-thumb'];
        if (skipClasses.some(c => img?.classList?.contains(c))) return true;
        if (/mola-icon\.png/i.test(src)) return true;
        if (/Soged\//i.test(src) && !/Molas/i.test(src)) return true;
        return false;
    },

    isMolaImage(src, img) {
        if (this.shouldSkip(img, src)) return false;
        return /Molas[\s-]Guna/i.test(src) || /\/Mola[\s_-]/i.test(src) || /Comarca-Guna/i.test(src) || /mola.*\.(jpg|jpeg|png|webp)/i.test(src);
    },

    wrapHtml(imgSrc, alt, extraClass = '') {
        if (!this.isMolaImage(imgSrc)) {
            return `<img src="${imgSrc}" alt="${alt || ''}" class="${extraClass}" loading="lazy">`;
        }
        return `<a href="${this.MUSEUM_URL}" target="_blank" rel="noopener noreferrer" class="mola-museum-link ${extraClass}" title="Visit Museo de la Mola" aria-label="Visit Museo de la Mola website">
            <img src="${imgSrc}" alt="${alt || 'Guna mola'}" class="mola-museum-img" loading="lazy">
        </a>`;
    },

    wrapElement(img) {
        if (!img || img.closest('.mola-museum-link') || img.closest('a[href*="museodelamola"]')) return;
        const src = img.getAttribute('src') || img.src || '';
        if (!this.isMolaImage(src, img)) return;

        const link = document.createElement('a');
        link.href = this.MUSEUM_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'mola-museum-link';
        link.title = 'Visit Museo de la Mola';
        link.setAttribute('aria-label', 'Visit Museo de la Mola website');

        img.classList.add('mola-museum-img');
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
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
