/**
 * Mola fade carousel — cycles through Guna mola images on the Learn page.
 */
(function () {
    var MOLA_IMAGES = [
        'Images/Molas - Guna/Mola 1.jpg',
        'Images/Molas - Guna/Mola 2.jpg',
        'Images/Molas - Guna/Mola 3.jpg',
        'Images/Molas - Guna/Mola 4.jpg',
        'Images/Molas - Guna/Mola 5.jpg',
    ];

    var INTERVAL_MS = 4500;

    function initMolaCarousel() {
        var container = document.getElementById('mola-carousel');
        if (!container) return;

        var slides = container.querySelectorAll('.mola-slide');
        if (slides.length < 2) return;

        var currentIndex = 0;
        var activeLayer = 0;

        slides[0].src = MOLA_IMAGES[0];
        slides[0].classList.add('mola-slide--active');

        setInterval(function () {
            currentIndex = (currentIndex + 1) % MOLA_IMAGES.length;
            var nextLayer = 1 - activeLayer;
            slides[nextLayer].src = MOLA_IMAGES[currentIndex];
            slides[nextLayer].classList.add('mola-slide--active');
            slides[activeLayer].classList.remove('mola-slide--active');
            activeLayer = nextLayer;
        }, INTERVAL_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMolaCarousel);
    } else {
        initMolaCarousel();
    }
})();
