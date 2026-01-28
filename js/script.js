// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only apply smooth scroll if href is not just "#"
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Application Form Submission
const applicationForm = document.getElementById('applicationForm');
const formMessage = document.getElementById('formMessage');

if (applicationForm && formMessage) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(applicationForm);
        
        // Basic validation
        let isValid = true;
        const requiredFields = applicationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#dee2e6';
            }
        });
        
        if (!isValid) {
            showMessage(formMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        // In a real application, you would send this data to a server
        showMessage(formMessage, 'Thank you for your application! We will contact you soon.', 'success');
        applicationForm.reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm && contactFormMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Basic validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#dee2e6';
            }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#e74c3c';
                showMessage(contactFormMessage, 'Please enter a valid email address.', 'error');
                return;
            }
        }
        
        if (!isValid) {
            showMessage(contactFormMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        // In a real application, you would send this data to a server
        showMessage(contactFormMessage, 'Thank you for your message! We will get back to you shortly.', 'success');
        contactForm.reset();
        
        // Scroll to message
        contactFormMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Helper function to show form messages
function showMessage(messageElement, text, type) {
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Scroll Animation Observer
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
const animateElements = document.querySelectorAll('.feature-card, .news-card, .program-card, .special-card, .leader-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    
    // Extract just the number
    const number = parseInt(target.replace(/\D/g, ''));
    const duration = 2000; // 2 seconds
    const increment = number / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : isPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form field focus effects
const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Read More Links Animation
const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would navigate to the full article
        alert('This would navigate to the full article in a production environment.');
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Back to Top Button (optional enhancement)
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
        z-index: 999;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#e74c3c';
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#3498db';
        button.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
};

// Initialize back to top button
createBackToTop();

// Video Background Handling
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    // Handle video loading errors
    heroVideo.addEventListener('error', function() {
        console.warn('Hero video failed to load, using fallback background');
        // Could add fallback image background here if needed
        this.style.display = 'none';
    });

    // Handle video loaded successfully
    heroVideo.addEventListener('loadeddata', function() {
        console.log('Hero video loaded successfully');
    });

    // Play video immediately when loaded (autoplay may be restricted by browser)
    heroVideo.addEventListener('canplay', function() {
        if (this.paused) {
            // Attempt to play (may fail due to browser autoplay policies)
            this.play().catch(function(error) {
                console.warn('Autoplay prevented by browser:', error);
                // Add play button overlay if needed
            });
        }
    });

    // IntersectionObserver for video performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is in viewport, ensure it plays if allowed
                if (heroVideo.paused && heroVideo.readyState >= 3) { // HAVE_ENOUGH_DATA
                    heroVideo.play().catch(() => {
                        // Autoplay prevented, user interaction required
                    });
                }
            } else {
                // Video out of viewport, pause to save resources
                heroVideo.pause();
            }
        });
    }, { threshold: 0 });

    videoObserver.observe(heroVideo);

    // Handle page visibility changes to pause video when tab is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            heroVideo.pause();
        } else if (document.visibilityState === 'visible') {
            // Try to resume when tab becomes visible
            heroVideo.play().catch(() => {
                // Autoplay prevented
            });
        }
    });
}

document.getElementById('applicationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const msg = document.getElementById('formMessage');
    
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
        btn.innerHTML = 'Application Sent!';
        btn.style.background = 'var(--success-color)';
        msg.innerHTML = 'Thank you! Your application has been submitted successfully.';
        msg.style.color = 'var(--success-color)';
    }, 2000);
});