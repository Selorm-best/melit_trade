/* ===============================================
   MOBILE-SPECIFIC JAVASCRIPT ENHANCEMENTS
   =============================================== */

(function() {
    'use strict';

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Add mobile class to body
    if (isMobile || isTouch) {
        document.body.classList.add('mobile-device');
    }

    // Mobile menu enhancements
    function initMobileMenu() {
        const menuToggle = document.querySelector('.canvas__open');
        const mobileMenu = document.querySelector('.header__menu');
        
        if (!menuToggle || !mobileMenu) return;

        // Smooth scroll for anchor links
        const menuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'unset';
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'unset';
            }
        });
    }

    // Touch-friendly interactions
    function initTouchInteractions() {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .primary-btn, .secondary-btn, .canvas__open');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });

        // Improve form interactions
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Prevent zoom on iOS
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                input.addEventListener('focus', function() {
                    if (window.innerWidth < 768) {
                        this.style.fontSize = '16px';
                    }
                });
            }

            // Add focus states
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Handle scroll events here if needed
            }, 10);
        });

        // Optimize resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                // Handle resize events here if needed
            }, 250);
        });

        // Preload critical resources
        const criticalImages = [
            'img/headern_logo.png',
            'img/hero-bg.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Mobile-specific animations
    function initMobileAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }

        // Add entrance animations for mobile
        const animatedElements = document.querySelectorAll('.card, .product__item, .blog__item');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(el => animationObserver.observe(el));
        }
    }

    // Form validation enhancements
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('is-invalid')) {
                        validateField(this);
                    }
                });
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity();
        
        field.classList.toggle('is-valid', isValid && value !== '');
        field.classList.toggle('is-invalid', !isValid && value !== '');
        
        // Show/hide error message
        let errorMsg = field.parentElement.querySelector('.invalid-feedback');
        if (!isValid && value !== '') {
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'invalid-feedback';
                field.parentElement.appendChild(errorMsg);
            }
            errorMsg.textContent = field.validationMessage;
        } else if (errorMsg) {
            errorMsg.remove();
        }
    }

    // Initialize all mobile enhancements
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initMobileMenu();
        initTouchInteractions();
        initLazyLoading();
        initPerformanceOptimizations();
        initMobileAnimations();
        initFormValidation();
    }

    // Start initialization
    init();

    // Export for global access if needed
    window.MobileEnhancements = {
        isMobile: isMobile,
        isTouch: isTouch,
        init: init
    };

})();

