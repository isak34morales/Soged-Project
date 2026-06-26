// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                setFormLoading(true);
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    setFormLoading(false);
                    showSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Form reset functionality
        const resetBtn = contactForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to reset the form?')) {
                    contactForm.reset();
                    clearFormValidation();
                }
            });
        }
    }
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        clearFormValidation();
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional)
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
            showFieldError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        formGroup.appendChild(errorDiv);
        input.style.borderColor = '#dc3545';
    }
    
    function clearFormValidation() {
        const errorMessages = document.querySelectorAll('.field-error');
        const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        errorMessages.forEach(error => error.remove());
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
    
    function setFormLoading(loading) {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (loading) {
            form.classList.add('form-loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        } else {
            form.classList.remove('form-loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    }
    
    function showSuccessMessage(message) {
        const form = document.getElementById('contactForm');
        const existingMessage = form.querySelector('.form-success');
        
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Contact card interactions
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.querySelector('h3').textContent.toLowerCase();
            
            switch(type) {
                case 'chat support':
                    // Simulate opening chat
                    showNotification('Chat support will be available soon!');
                    break;
                case 'email':
                    // Open email client
                    window.location.href = 'mailto:support@soged.com';
                    break;
                case 'phone':
                    // Open phone dialer
                    window.location.href = 'tel:+5071234567';
                    break;
            }
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px var(--shadow-color);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-primary);
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.contact-info-card, .faq-item, .contact-form-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Form field focus effects
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            formGroup.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            formGroup.style.transform = '';
        });
    });
    
    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 0.8rem;
            color: var(--text-secondary);
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = messageTextarea.value.length;
            const maxLength = 1000;
            counter.textContent = `${length}/${maxLength}`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#dc3545';
            } else {
                counter.style.color = 'var(--text-secondary)';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // Auto-save form data to localStorage
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`contact_${input.name}`);
        if (savedValue && input.type !== 'submit' && input.type !== 'reset') {
            input.value = savedValue;
        }
        
        // Save data on input
        input.addEventListener('input', function() {
            if (this.type !== 'submit' && this.type !== 'reset') {
                localStorage.setItem(`contact_${this.name}`, this.value);
            }
        });
    });
    
    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        formInputs.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'reset') {
                localStorage.removeItem(`contact_${input.name}`);
            }
        });
    });
    
    console.log('Contact page JavaScript loaded successfully!');
}); 