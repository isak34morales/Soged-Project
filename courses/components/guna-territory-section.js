/**
 * Guna Territory Map — standalone interactive map section
 */
class GunaTerritorySection extends HTMLElement {
    connectedCallback() {
        localStorage.setItem('guna_territory_visited', '1');
        if (typeof GunaGamification !== 'undefined') GunaGamification.checkAllBadges();
        this.render();
        this.setupMapInteractions();
    }

    getTerritoryData() {
        return {
            'guna-yala': {
                name: 'Guna Yala (Comarca)',
                location: 'San Blas Archipelago, Caribbean coast of Panama — over 360 islands.',
                history: 'Former San Blas. After the 1925 Tule Revolution, the Guna secured autonomy and territorial recognition.',
                culture: 'Community congresses, molas, artisanal fishing, and the Dulegaya language as pillars of identity.',
                population: '~34,000 inhabitants',
                traditions: 'Mola crafting, ceremonial songs, collective cayuco work, and governance by saglas.',
                facts: 'One of the best-known indigenous comarcas in Panama and a unique cultural destination.',
                image: '../Images/Molas - Guna/Comarca-Guna-Yala.jpg'
            },
            'madugandi': {
                name: 'Madugandí',
                location: 'Panama and Darién provinces, mainland forests.',
                history: 'Comarca created in 1996 for Guna communities that migrated from the archipelago.',
                culture: 'Blend of island traditions with tropical forest life; crafts and agriculture.',
                population: '~1,800 inhabitants',
                traditions: 'Chácaras, local congresses, and oral migration stories.',
                facts: 'Madugandí means "where there is Mother Earth" in Guna cosmovision.',
                image: '../Images/Molas - Guna/Mola 4.jpg'
            },
            'wargandi': {
                name: 'Wargandí',
                location: 'Darién Province, border with Colombia, tropical rainforest.',
                history: 'Comarca established in 2000 to protect Guna territories on the border.',
                culture: 'Life tied to rivers and jungle; forest conservation and medicinal knowledge.',
                population: '~1,700 inhabitants',
                traditions: 'Traditional medicine, river fishing, and general congress assemblies.',
                facts: 'Wargandí is the youngest and one of the most remote Guna comarcas.',
                image: '../Images/Molas - Guna/Mola 6.webp'
            },
            'ailigandi': {
                name: 'Ailigandí Island',
                location: 'Guna Yala — historic island in the archipelago.',
                history: 'Symbolic center of the 1925 Tule Revolution.',
                culture: 'Site of historic congresses and cultural resistance.',
                population: 'Traditional island community',
                traditions: 'February 25 celebrations and congress meetings.',
                facts: 'Considered the cradle of the movement that defended Guna autonomy.',
                image: '../Images/Molas - Guna/Mola 1.jpg'
            },
            'nargana': {
                name: 'Narganá',
                location: 'Bridge-connected island in Guna Yala.',
                history: 'One of the most visited islands; meeting point of tourism and culture.',
                culture: 'Local markets, crafts, and community hospitality.',
                population: '~3,000 inhabitants',
                traditions: 'Mola sales, dances, and coconut-fish cuisine.',
                facts: 'Accessible by road from the mainland via bridge.',
                image: '../Images/Molas - Guna/Mola 3.jpg'
            },
            'carti': {
                name: 'Cartí Sugdup',
                location: 'Cartí Islands, gateway to the archipelago from Panama.',
                history: 'Historic entry point to Guna island territory.',
                culture: 'Departure point for boats to the islands; community tourism.',
                population: 'Several island communities',
                traditions: 'Cayuco boarding, craft sales, and welcoming visitors.',
                facts: 'Boats to the archipelago depart from here.',
                image: '../Images/Molas - Guna/Mola 5.jpg'
            }
        };
    }

    render() {
        this.innerHTML = `
            <div class="territory-section">
                <header class="territory-hero" data-aos="fade-up">
                    <h1>🗺️ Guna Territory & Regions</h1>
                    <p>Interactive map of Panama — explore Guna Yala, Madugandí, Wargandí and the main islands</p>
                </header>
                <div class="community-article territory-article">
                    <div class="guna-map-container">
                        <div class="guna-map-controls">
                            <button type="button" class="map-zoom-btn" data-zoom="in" title="Zoom in"><i class="fas fa-plus"></i></button>
                            <button type="button" class="map-zoom-btn" data-zoom="out" title="Zoom out"><i class="fas fa-minus"></i></button>
                            <button type="button" class="map-zoom-btn" data-zoom="reset" title="Reset"><i class="fas fa-compress"></i></button>
                        </div>
                        <div class="guna-map-viewport" id="gunaMapViewport">
                            <svg class="guna-map-svg" viewBox="0 0 400 600" id="gunaMapSvg">
                                <rect width="400" height="600" fill="#b8e0f0" rx="8"/>
                                <path d="M80,120 L200,80 L320,140 L300,280 L180,320 L60,240 Z" fill="#7cb87c" stroke="#4a7c4a" stroke-width="2"/>
                                <text x="200" y="200" text-anchor="middle" fill="#333" font-size="12">Panama</text>
                                <g class="map-region" data-region="madugandi" transform="translate(140,220)">
                                    <ellipse cx="0" cy="0" rx="45" ry="35" fill="#f59e0b" opacity="0.85" stroke="#d97706" stroke-width="2"/>
                                    <text x="0" y="4" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">Madugandí</text>
                                </g>
                                <g class="map-region" data-region="wargandi" transform="translate(250,350)">
                                    <ellipse cx="0" cy="0" rx="50" ry="40" fill="#8b5cf6" opacity="0.85" stroke="#6d28d9" stroke-width="2"/>
                                    <text x="0" y="4" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">Wargandí</text>
                                </g>
                                <g class="map-region" data-region="guna-yala" transform="translate(300,100)">
                                    <ellipse cx="0" cy="0" rx="55" ry="45" fill="#00A3E0" opacity="0.9" stroke="#0077a8" stroke-width="2"/>
                                    <text x="0" y="4" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">Guna Yala</text>
                                </g>
                                <g class="map-island" data-region="ailigandi" transform="translate(320,70)">
                                    <circle r="8" fill="#ff6b6b" stroke="#fff" stroke-width="2"/>
                                </g>
                                <g class="map-island" data-region="nargana" transform="translate(340,95)">
                                    <circle r="7" fill="#ff6b6b" stroke="#fff" stroke-width="2"/>
                                </g>
                                <g class="map-island" data-region="carti" transform="translate(305,130)">
                                    <circle r="7" fill="#ff6b6b" stroke="#fff" stroke-width="2"/>
                                </g>
                                <text x="330" y="55" text-anchor="middle" fill="#c0392b" font-size="8">Guna Yala Islands</text>
                            </svg>
                        </div>
                        <aside class="guna-map-info" id="gunaMapInfo">
                            <div class="map-info-placeholder">
                                <i class="fas fa-hand-pointer"></i>
                                <p>Click a region or island on the map</p>
                            </div>
                        </aside>
                    </div>
                    <div class="territory-legend">
                        <span><i class="legend-dot guna-yala"></i> Guna Yala</span>
                        <span><i class="legend-dot madugandi"></i> Madugandí</span>
                        <span><i class="legend-dot wargandi"></i> Wargandí</span>
                        <span><i class="legend-dot island"></i> Main islands</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupMapInteractions() {
        const regions = this.getTerritoryData();
        const infoPanel = this.querySelector('#gunaMapInfo');
        const viewport = this.querySelector('#gunaMapViewport');
        const svg = this.querySelector('#gunaMapSvg');
        if (!infoPanel || !svg) return;

        let scale = 1;
        const updateTransform = () => { svg.style.transform = `scale(${scale})`; };

        this.querySelectorAll('.map-zoom-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.zoom === 'in') scale = Math.min(2, scale + 0.2);
                else if (btn.dataset.zoom === 'out') scale = Math.max(0.6, scale - 0.2);
                else scale = 1;
                updateTransform();
            });
        });

        const showRegion = (key) => {
            const r = regions[key];
            if (!r) return;
            infoPanel.innerHTML = `
                <img src="${r.image}" alt="${r.name}" class="map-info-image" data-no-mola-attribution="true" onerror="this.style.display='none'">
                <h3>${r.name}</h3>
                <dl class="map-info-list">
                    <dt><i class="fas fa-map-marker-alt"></i> Location</dt><dd>${r.location}</dd>
                    <dt><i class="fas fa-landmark"></i> History</dt><dd>${r.history}</dd>
                    <dt><i class="fas fa-users"></i> Culture</dt><dd>${r.culture}</dd>
                    <dt><i class="fas fa-chart-pie"></i> Population</dt><dd>${r.population}</dd>
                    <dt><i class="fas fa-star"></i> Traditions</dt><dd>${r.traditions}</dd>
                    <dt><i class="fas fa-lightbulb"></i> Fun fact</dt><dd>${r.facts}</dd>
                </dl>
            `;
            this.querySelectorAll('.map-region, .map-island').forEach(el => el.classList.remove('active'));
            this.querySelector(`[data-region="${key}"]`)?.classList.add('active');
        };

        this.querySelectorAll('.map-region, .map-island').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => showRegion(el.dataset.region));
        });

        if (viewport) {
            let isPanning = false;
            let startX, startY, scrollL, scrollT;
            viewport.addEventListener('mousedown', (e) => {
                isPanning = true;
                startX = e.pageX;
                startY = e.pageY;
                scrollL = viewport.scrollLeft;
                scrollT = viewport.scrollTop;
            });
            viewport.addEventListener('mousemove', (e) => {
                if (!isPanning) return;
                viewport.scrollLeft = scrollL - (e.pageX - startX);
                viewport.scrollTop = scrollT - (e.pageY - startY);
            });
            viewport.addEventListener('mouseup', () => { isPanning = false; });
            viewport.addEventListener('mouseleave', () => { isPanning = false; });
        }
    }
}

customElements.define('guna-territory-section', GunaTerritorySection);
