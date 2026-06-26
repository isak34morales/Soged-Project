/**
 * About page — hero photo carousel with synced highlight cards.
 */
(function () {
    var CAROUSEL_INTERVAL_MS = 5000;

    function initAboutCarousel(root) {
        var track = root.querySelector('.about-carousel-track');
        var slides = Array.prototype.slice.call(root.querySelectorAll('.about-carousel-slide'));
        var prevBtn = root.querySelector('.about-carousel-btn--prev');
        var nextBtn = root.querySelector('.about-carousel-btn--next');
        var dotsWrap = root.querySelector('.about-carousel-dots');
        var statCards = Array.prototype.slice.call(document.querySelectorAll('.about-stat-card[data-carousel-index]'));

        if (!track || slides.length === 0) return;

        var current = 0;
        var timer = null;

        function renderDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = slides.map(function (_, index) {
                return '<button type="button" class="about-carousel-dot' + (index === current ? ' is-active' : '') + '" data-index="' + index + '" aria-label="Go to slide ' + (index + 1) + '"></button>';
            }).join('');
        }

        function setActive(index) {
            current = (index + slides.length) % slides.length;

            slides.forEach(function (slide, i) {
                slide.classList.toggle('is-active', i === current);
            });

            statCards.forEach(function (card, i) {
                card.classList.toggle('is-active', i === current);
            });

            if (dotsWrap) {
                var dots = dotsWrap.querySelectorAll('.about-carousel-dot');
                dots.forEach(function (dot, i) {
                    dot.classList.toggle('is-active', i === current);
                });
            }
        }

        function next() {
            setActive(current + 1);
        }

        function prev() {
            setActive(current - 1);
        }

        function restartTimer() {
            if (timer) window.clearInterval(timer);
            timer = window.setInterval(next, CAROUSEL_INTERVAL_MS);
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restartTimer(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { next(); restartTimer(); });

        if (dotsWrap) {
            dotsWrap.addEventListener('click', function (event) {
                var dot = event.target.closest('.about-carousel-dot');
                if (!dot) return;
                setActive(parseInt(dot.getAttribute('data-index'), 10));
                restartTimer();
            });
        }

        statCards.forEach(function (card) {
            card.addEventListener('click', function () {
                var index = parseInt(card.getAttribute('data-carousel-index'), 10);
                if (Number.isNaN(index)) return;
                setActive(index);
                restartTimer();
            });
        });

        root.addEventListener('mouseenter', function () {
            if (timer) window.clearInterval(timer);
        });

        root.addEventListener('mouseleave', restartTimer);

        renderDots();
        setActive(0);
        restartTimer();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var carousel = document.querySelector('.about-photo-carousel');
        if (carousel) initAboutCarousel(carousel);
    });
})();
