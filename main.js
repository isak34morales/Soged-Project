// Initialize AOS
AOS.init({
    duration: 600,
    offset: 50
});

// Theme management is now handled by ThemeManager in js/theme.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Feature cards hover effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Language cards click effect
document.querySelectorAll('.language-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
});

// Loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('btn-loading')) {
            e.preventDefault();
            this.classList.add('btn-loading');
            setTimeout(() => {
                this.classList.remove('btn-loading');
            }, 2000);
        }
    });
});

// CTA Component Customization
document.addEventListener('DOMContentLoaded', () => {
    // Wait for CTA components to be loaded
    setTimeout(() => {
        customizeCTAs();
    }, 100);
});

function customizeCTAs() {
    // Main page CTA
    const mainCta = document.getElementById('main-cta');
    if (mainCta) {
        mainCta.updateContent({
            title: 'Ready to Start Your Language Journey?',
            subtitle: 'Join thousands of learners discovering the rich indigenous languages of Panama. Start your free trial today!',
            primaryButton: 'Start Free Trial',
            secondaryButton: 'Learn More'
        });
        mainCta.setButtonUrls('#', '#');
    }

    // About page CTA
    const aboutCta = document.getElementById('about-cta');
    if (aboutCta) {
        aboutCta.updateContent({
            title: 'Join Our Mission',
            subtitle: 'Be part of the movement to preserve Panama\'s indigenous languages. Start your learning journey today and help us protect these precious cultural treasures for future generations.',
            primaryButton: 'Start Learning',
            secondaryButton: 'Get in Touch'
        });
        aboutCta.setButtonUrls('../index.html', 'contact.html');
    }

    // Resources page CTA
    const resourcesCta = document.getElementById('resources-cta');
    if (resourcesCta) {
        resourcesCta.updateContent({
            title: 'Explore Our Learning Resources',
            subtitle: 'Discover a comprehensive collection of materials to help you master indigenous languages. From audio lessons to cultural insights, everything you need is here.',
            primaryButton: 'Browse Resources',
            secondaryButton: 'Get Started'
        });
        resourcesCta.setButtonUrls('#', '../index.html');
    }
}
