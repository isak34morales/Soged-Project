/**
 * Tienda Guna — Economía de Cocos
 */
const GUNA_STORE_ASSETS = {
    mola: '../Images/Molas - Guna',
    coco: '../Images/Soged/coco.png',
    molaIcon: '../Images/Soged/mola-icon.png'
};

class GunaStore extends HTMLElement {
    constructor() {
        super();
        this.activeCategory = 'molas';
        this.weeklyCountdown = this.getWeeklyCountdown();
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
        CocosEconomy.updateAllDisplays();
    }

    getWeeklyCountdown() {
        const now = new Date();
        const end = new Date(now);
        end.setDate(end.getDate() + ((7 - end.getDay()) % 7 || 7));
        end.setHours(23, 59, 59, 999);
        const diff = end - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return { days, hours };
    }

    getCatalog() {
        const M = GUNA_STORE_ASSETS.mola;
        const C = GUNA_STORE_ASSETS.coco;
        const I = GUNA_STORE_ASSETS.molaIcon;
        return {
            molas: {
                title: 'Molas Guna',
                icon: '🧵',
                items: [
                    { id: 'mola-colibri', name: 'Mola del Colibrí', price: 500, image: `${M}/Mola 1.jpg`, story: 'El colibrí representa la agilidad y la conexión entre el mundo terrenal y espiritual en la tradición Guna.', rarity: 'comun' },
                    { id: 'mola-coco', name: 'Mola del Coco', price: 450, image: `${M}/Mola 2.jpg`, story: 'El coco es símbolo de sustento y prosperidad en las islas Guna.', rarity: 'comun' },
                    { id: 'mola-tortuga', name: 'Mola de la Tortuga', price: 600, image: `${M}/Mola 3.jpg`, story: 'La tortuga encarna la longevidad y la sabiduría ancestral del mar.', rarity: 'raro' },
                    { id: 'mola-sol', name: 'Mola del Sol', price: 550, image: `${M}/Mola 4.jpg`, story: 'El sol guía a los pescadores y marca los ciclos de la vida comunitaria.', rarity: 'raro' },
                    { id: 'mola-mar', name: 'Mola del Mar', price: 700, image: `${M}/Mola 5.jpg`, story: 'El mar es el hogar espiritual del pueblo Guna y fuente de identidad cultural.', rarity: 'epico' }
                ]
            },
            galeria: {
                title: 'Galería Cultural',
                icon: '🎨',
                items: [
                    { id: 'arte-guna', name: 'Arte Guna', price: 300, image: `${M}/Mola 6.webp`, story: 'Colección de arte tradicional Guna con explicaciones culturales.', rarity: 'comun' },
                    { id: 'patrones', name: 'Patrones Tradicionales', price: 350, image: `${M}/Mola 7.jpg`, story: 'Descubre los significados detrás de cada patrón sagrado.', rarity: 'comun' },
                    { id: 'ilustraciones', name: 'Ilustraciones Históricas', price: 400, image: `${M}/Comarca-Guna-Yala.jpg`, story: 'Imágenes que narran la historia del pueblo Guna.', rarity: 'raro' },
                    { id: 'disenos', name: 'Diseños Exclusivos', price: 650, image: I, story: 'Diseños únicos creados por artesanas certificadas.', rarity: 'epico' }
                ]
            },
            perfil: {
                title: 'Personalización del Perfil',
                icon: '👤',
                items: [
                    { id: 'marco-islas', name: 'Marco Guardián de las Islas', price: 800, image: `${M}/Mola 1.jpg`, story: 'Marco exclusivo inspirado en las islas del archipiélago.', rarity: 'raro' },
                    { id: 'titulo-guardian', name: 'Guardián de las Islas', price: 800, image: C, story: 'Título honorífico que muestra tu compromiso con la cultura Guna.', rarity: 'raro' },
                    { id: 'fondo-perfil', name: 'Fondo de Perfil Ceremonial', price: 600, image: `${M}/Mola 5.jpg`, story: 'Fondo inspirado en ceremonias tradicionales.', rarity: 'raro' },
                    { id: 'titulo-protector', name: 'Protector de la Tradición', price: 1200, image: '../Images/Soged/Newturttle.png', story: 'Título épico para estudiantes dedicados a preservar la lengua.', rarity: 'epico' },
                    { id: 'insignia-especial', name: 'Insignia Especial Guna', price: 500, image: '../Images/Soged/LOGO SOGED.png', story: 'Insignia que destaca tu progreso en el Learning Hub.', rarity: 'comun' }
                ]
            },
            especiales: {
                title: 'Recompensas Especiales',
                icon: '🏆',
                items: [
                    { id: 'mola-legendaria', name: 'Mola Legendaria', price: 2000, image: I, story: 'La mola más codiciada, tejida con técnicas ancestrales.', rarity: 'legendario' },
                    { id: 'fondo-ceremonial', name: 'Fondo Ceremonial', price: 1500, image: `${M}/Mola 3.jpg`, story: 'Fondo raro usado en celebraciones comunitarias.', rarity: 'epico' },
                    { id: 'avatar-ancestral', name: 'Avatar Ancestral', price: 1800, image: '../Images/Soged/Newturttle.png', story: 'Avatar inspirado en los sabios ancestrales Guna.', rarity: 'legendario' },
                    { id: 'trofeo-cultural', name: 'Trofeo Cultural', price: 2500, image: C, story: 'Trofeo máximo por dominar la cultura y lengua Guna.', rarity: 'legendario' }
                ]
            },
            educativo: {
                title: 'Contenido Educativo',
                icon: '📚',
                items: [
                    { id: 'historias-guna', name: 'Historias Guna', price: 250, image: `${M}/Mola 2.jpg`, story: 'Relatos tradicionales narrados por ancianos de la comunidad.', rarity: 'comun' },
                    { id: 'leyendas', name: 'Leyendas Tradicionales', price: 300, image: `${M}/Mola 4.jpg`, story: 'Leyendas que transmiten valores y conocimiento ancestral.', rarity: 'comun' },
                    { id: 'videos-culturales', name: 'Videos Culturales', price: 400, image: `${M}/Mola 6.webp`, story: 'Documentales sobre la vida en las comarcas Guna.', rarity: 'raro' },
                    { id: 'curiosidades', name: 'Curiosidades Históricas', price: 200, image: `${M}/Mola 7.jpg`, story: 'Datos fascinantes sobre la historia del pueblo Guna.', rarity: 'comun' }
                ]
            },
            semanal: {
                title: 'Tienda Semanal',
                icon: '🎁',
                items: [
                    { id: 'semanal-mola', name: 'Mola Semanal Exclusiva', price: 350, image: I, story: 'Oferta rotativa — disponible solo esta semana.', rarity: 'raro', weekly: true },
                    { id: 'semanal-avatar', name: 'Avatar de la Semana', price: 450, image: '../Images/Soged/Newturttle.png', story: 'Avatar limitado que cambia cada semana.', rarity: 'epico', weekly: true },
                    { id: 'semanal-pack', name: 'Pack Cultural Semanal', price: 600, image: `${M}/Mola 5.jpg`, story: 'Paquete con contenido educativo y decoración.', rarity: 'epico', weekly: true }
                ]
            }
        };
    }

    rarityLabel(rarity) {
        const labels = { comun: 'Común', raro: 'Raro', epico: 'Épico', legendario: 'Legendario' };
        return labels[rarity] || rarity;
    }

    renderItemCard(item) {
        const purchased = CocosEconomy.isPurchased(item.id);
        const balance = CocosEconomy.getBalance();
        const canAfford = balance >= item.price;

        return `
            <article class="store-item-card ${purchased ? 'purchased' : ''} rarity-${item.rarity}" data-item-id="${item.id}">
                <div class="store-item-image-wrap">
                    <img src="${item.image}" alt="${item.name}" class="store-item-image" loading="lazy"
                         onerror="this.src='${GUNA_STORE_ASSETS.coco}'">
                    <span class="store-rarity-badge rarity-${item.rarity}">${this.rarityLabel(item.rarity)}</span>
                    ${purchased ? '<span class="store-owned-badge"><i class="fas fa-check"></i> Desbloqueado</span>' : ''}
                </div>
                <div class="store-item-body">
                    <h4 class="store-item-name">${item.name}</h4>
                    <p class="store-item-story">${item.story}</p>
                    <div class="store-item-footer">
                        <span class="store-item-price">
                            <img src="${GUNA_STORE_ASSETS.coco}" alt="" class="store-coco-icon" aria-hidden="true">
                            <span>${CocosEconomy.formatCocos(item.price)} cocos</span>
                        </span>
                        ${purchased
                            ? '<button class="store-buy-btn owned" disabled><i class="fas fa-lock-open"></i> En tu colección</button>'
                            : `<button class="store-buy-btn ${canAfford ? '' : 'insufficient'}" data-buy="${item.id}" data-price="${item.price}" ${canAfford ? '' : 'disabled'}>
                                <i class="fas fa-shopping-cart"></i> Comprar
                               </button>`
                        }
                    </div>
                </div>
            </article>
        `;
    }

    render() {
        const catalog = this.getCatalog();
        const categories = Object.entries(catalog);
        const active = catalog[this.activeCategory];
        const { days, hours } = this.weeklyCountdown;

        this.innerHTML = `
            <div class="guna-store" role="region" aria-label="Tienda Guna">
                <header class="store-hero" data-aos="fade-up">
                    <div class="store-hero-content">
                        <h1 class="store-title">🛒 Tienda Guna</h1>
                        <p class="store-subtitle">Desbloquea molas, arte cultural y recompensas con tus cocos ganados al aprender.</p>
                    </div>
                    <div class="store-balance-card cocos-balance-display" title="Cocos ganados durante tu aprendizaje">
                        <img src="${GUNA_STORE_ASSETS.coco}" alt="Coco" class="store-balance-coco">
                        <div class="store-balance-info">
                            <span class="store-balance-label">Mis Cocos</span>
                            <span class="store-balance-value">🥥 <span data-cocos-balance>${CocosEconomy.formatCocos(CocosEconomy.getBalance())}</span></span>
                        </div>
                    </div>
                </header>

                <nav class="store-categories" role="tablist" aria-label="Categorías de la tienda">
                    ${categories.map(([key, cat]) => `
                        <button class="store-category-btn ${key === this.activeCategory ? 'active' : ''}"
                                role="tab" aria-selected="${key === this.activeCategory}"
                                data-category="${key}">
                            <span class="store-cat-icon">${cat.icon}</span>
                            <span class="store-cat-name">${cat.title}</span>
                        </button>
                    `).join('')}
                </nav>

                ${this.activeCategory === 'semanal' ? `
                    <div class="store-weekly-timer" data-aos="fade-up">
                        <i class="fas fa-hourglass-half"></i>
                        <span>Disponible por: <strong>${days} días ${hours} horas</strong></span>
                    </div>
                ` : ''}

                <div class="store-items-grid" role="tabpanel" data-aos="fade-up" data-aos-delay="100">
                    ${active.items.map(item => this.renderItemCard(item)).join('')}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.querySelectorAll('.store-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeCategory = btn.dataset.category;
                this.render();
                this.bindEvents();
            });
        });

        this.querySelectorAll('[data-buy]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.dataset.buy;
                const price = parseInt(btn.dataset.price, 10);
                this.handlePurchase(id, price);
            });
        });
    }

    handlePurchase(itemId, price) {
        const catalog = this.getCatalog();
        let item = null;
        for (const cat of Object.values(catalog)) {
            item = cat.items.find(i => i.id === itemId);
            if (item) break;
        }
        if (!item) return;

        if (CocosEconomy.isPurchased(itemId)) return;

        if (!CocosEconomy.spendCocos(price)) {
            this.showToast('No tienes suficientes cocos. ¡Completa más lecciones!', 'error');
            return;
        }

        CocosEconomy.recordPurchase(itemId);
        CocosEconomy.triggerConfetti();
        this.showToast(`¡${item.name} desbloqueado! 🎉`, 'success');
        this.render();
        this.bindEvents();
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `store-toast store-toast--${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
}

customElements.define('guna-store', GunaStore);
