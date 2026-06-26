/**
 * Interactive Guna Yala map — Learn page (languages.html)
 * Expand/zoom modal + island hotspots in the red zone.
 */
(function () {
    var MUSEUM_URL = 'https://museodelamola.org/';

    var MAP_POINTS = [
        {
            id: 'guna-yala',
            label: 'Guna Yala',
            top: '15%', left: '56%',
            name: 'Comarca Guna Yala',
            text: 'A semi-autonomous territory with 365+ islands along Panama\'s Caribbean coast. Home to the Guna General Congress and living mola traditions.',
            islands: 'El Porvenir (capital), Playón Chico, Narganá, Ailigandí, and dozens of inhabited cayos.'
        },
        {
            id: 'ailigandi',
            label: 'Ailigandí',
            top: '12%', left: '78%',
            name: 'Ailigandí Island',
            text: 'Historic center of the 1925 Tule Revolution where Guna leaders defended autonomy, language, and dress.',
            islands: 'One of the most culturally significant islands in the eastern archipelago.'
        },
        {
            id: 'carti',
            label: 'Cartí',
            top: '18%', left: '54%',
            name: 'Cartí Sugdup',
            text: 'Main gateway from mainland Panama to the island communities. Markets and cayucos connect visitors with island life.',
            islands: 'Cartí Sugdup, Cartí Tupile, and surrounding communities along the coastal strip.'
        },
        {
            id: 'nargana',
            label: 'Narganá',
            top: '14%', left: '86%',
            name: 'Narganá Island',
            text: 'Bridge-connected island blending fishing traditions with community tourism and artisan mola sales.',
            islands: 'Narganá and nearby islets in the central-eastern archipelago.'
        },
        {
            id: 'porvenir',
            label: 'El Porvenir',
            top: '13%', left: '70%',
            name: 'El Porvenir',
            text: 'Administrative capital of Guna Yala. A hub for congress meetings and coordination across the comarca.',
            islands: 'Serves as the main administrative center for the entire comarca.'
        }
    ];

    function hotspotHtml(points) {
        return points.map(function (p) {
            return '<button type="button" class="learn-map-hotspot" data-point="' + p.id + '" ' +
                'style="top:' + p.top + ';left:' + p.left + '" aria-label="' + p.label + '">' +
                '<span class="learn-map-hotspot-pulse"></span>' +
                '<span class="learn-map-hotspot-dot"></span>' +
            '</button>';
        }).join('');
    }

    function mapStageHtml(expanded) {
        var cls = expanded ? 'learn-map-stage learn-map-stage--expanded' : 'learn-map-stage';
        return '<div class="' + cls + '" id="learnMapStage">' +
            '<img src="Images/panama-guna-map.png" alt="Map of Panama highlighting Guna Yala" class="learn-map-img" ' +
                'onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src=\'Images/panama-guna-map.svg\';}">' +
            hotspotHtml(MAP_POINTS) +
            (expanded ? '' :
                '<button type="button" class="learn-map-expand-btn" id="learnMapExpandBtn" aria-label="Expand map">' +
                    '<i class="fas fa-expand" aria-hidden="true"></i> Expand map' +
                '</button>') +
        '</div>';
    }

    function panelHtml(point) {
        if (!point) {
            return '<div class="learn-map-panel-placeholder">' +
                '<i class="fas fa-hand-pointer" aria-hidden="true"></i>' +
                '<p>Tap a point on the <strong>red zone</strong> or expand the map to explore the islands of Guna Yala.</p>' +
            '</div>';
        }
        return '<h4>' + point.name + '</h4>' +
            '<p>' + point.text + '</p>' +
            '<p class="learn-map-islands"><strong>Key islands &amp; areas:</strong> ' + point.islands + '</p>' +
            '<a href="' + MUSEUM_URL + '" target="_blank" rel="noopener noreferrer" class="learn-map-museum-link">' +
                '<i class="fas fa-museum" aria-hidden="true"></i> Explore molas at Museo de la Mola' +
            '</a>';
    }

    function bindMap(root, isModal) {
        var panel = root.querySelector(isModal ? '#learnMapModalPanel' : '#learnMapPanel');
        var stage = root.querySelector('#learnMapStage');

        function showPoint(id) {
            var point = MAP_POINTS.find(function (p) { return p.id === id; });
            if (panel) panel.innerHTML = panelHtml(point);
            root.querySelectorAll('.learn-map-hotspot').forEach(function (btn) {
                btn.classList.toggle('is-active', btn.dataset.point === id);
            });
        }

        root.querySelectorAll('.learn-map-hotspot').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                showPoint(btn.dataset.point);
            });
        });

        if (!isModal && stage) {
            stage.addEventListener('click', function (e) {
                if (e.target.closest('.learn-map-hotspot') || e.target.closest('.learn-map-expand-btn')) return;
            });
        }

        return { showPoint: showPoint };
    }

    function openModal() {
        var overlay = document.getElementById('learnMapModal');
        if (!overlay) return;
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        var inner = overlay.querySelector('.learn-map-modal-body');
        if (inner && !inner.dataset.ready) {
            inner.innerHTML =
                '<button type="button" class="learn-map-modal-close" id="learnMapCloseBtn" aria-label="Close expanded map">' +
                    '<i class="fas fa-times" aria-hidden="true"></i>' +
                '</button>' +
                mapStageHtml(true) +
                '<aside class="learn-map-modal-panel" id="learnMapModalPanel">' + panelHtml(null) + '</aside>';
            inner.dataset.ready = '1';
            bindMap(inner, true);
            document.getElementById('learnMapCloseBtn').addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        var overlay = document.getElementById('learnMapModal');
        if (!overlay) return;
        overlay.hidden = true;
        document.body.style.overflow = '';
    }

    function initLearnMap() {
        var wrap = document.getElementById('guna-learn-map');
        if (!wrap) return;

        wrap.innerHTML =
            mapStageHtml(false) +
            '<aside class="learn-map-panel" id="learnMapPanel">' + panelHtml(null) + '</aside>';

        bindMap(wrap, false);

        var expandBtn = document.getElementById('learnMapExpandBtn');
        if (expandBtn) expandBtn.addEventListener('click', openModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });

        var overlay = document.getElementById('learnMapModal');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeModal();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLearnMap);
    } else {
        initLearnMap();
    }
})();
