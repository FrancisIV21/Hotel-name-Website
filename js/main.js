// Ultima Corfu Website - Main JavaScript

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Header fade in/out functionality
let lastScrollTop = 0;
let scrollTimer = null;

function handleHeaderVisibility() {
    const header = document.querySelector('.header');
    if (!header) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear existing timer
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    
    // Always show header at the very top
    if (currentScroll <= 50) {
        header.classList.remove('hidden');
        header.classList.add('visible');
        return;
    }
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down - hide header
        header.classList.add('hidden');
        header.classList.remove('visible');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up - show header
        header.classList.remove('hidden');
        header.classList.add('visible');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}

// Enhanced header background change on scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        // Clear any inline styles that might interfere with CSS
        header.style.background = '';
        header.style.backdropFilter = '';
        header.style.boxShadow = '';
    } else {
        header.classList.remove('scrolled');
        // Clear any inline styles that might interfere with CSS
        header.style.background = '';
        header.style.backdropFilter = '';
        header.style.boxShadow = '';
    }
}

// Update active navigation item based on scroll position
function updateActiveNavigation() {
    const sections = ['overview', 'highlights', 'layout', 'accommodation', 'services', 'experiences', 'location'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => 
                    link.classList.remove('active')
                );
                // Add active class to current section link
                navLink.classList.add('active');
            }
        }
    });
}

// Combined scroll handler with debouncing for better performance
const handleScroll = debounce(() => {
    handleHeaderVisibility();
    handleHeaderScroll();
    updateActiveNavigation();
}, 10);

// Initialize header functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');
    const languageSelector = document.querySelector('.language-selector');
    const enquireBtn = document.querySelector('.enquire-btn');
    
    
    if (header) {
        header.classList.add('transparent');
    }
    
    // Menu button functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            // Add your menu toggle logic here
            console.log('Menu button clicked');
            // For now, just add a visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Language selector functionality
    if (languageSelector) {
        const languages = ['EN', 'GR', 'DE', 'FR']; // Add more languages as needed
        let currentLangIndex = 0;
        
        languageSelector.addEventListener('click', function() {
            currentLangIndex = (currentLangIndex + 1) % languages.length;
            this.textContent = languages[currentLangIndex];
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Language changed to:', languages[currentLangIndex]);
        });
    }
    
    // Enquire button functionality
    if (enquireBtn) {
        enquireBtn.addEventListener('click', function() {
            // Add your enquiry form logic here
            console.log('Enquire button clicked');
            
            // For demonstration, show an alert
            alert('Enquiry form would open here. Please contact us at info@ultima-collection.com');
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    if (header) {
        let hoverTimeout;
        
        header.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.classList.add('header-hovered');
        });
        
        header.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                this.classList.remove('header-hovered');
            }, 300);
        });
    }
}


function initializeTransparentHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Set initial state
    header.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
    
    // Handle intersection with hero section for better UX
    const heroSection = document.getElementById('overview');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // In hero section - header should be fully transparent unless hovered
                    header.classList.remove('scrolled');
                    // Remove inline styles to let CSS hover work
                    header.style.background = '';
                    header.style.backdropFilter = '';
                    header.style.boxShadow = '';
                } else {
                    // Outside hero section - header gets background
                    header.classList.add('scrolled');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '-80px 0px 0px 0px' // Account for header height
        });
        
        heroObserver.observe(heroSection);
    }
}

// Initialize scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .luxury-text, .luxury-image, .location-item'
    );
    
    elementsToAnimate.forEach(element => {
        // Set initial state for animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        
        // Start observing
        observer.observe(element);
    });
}

// Navigation click handlers
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section and scroll to it
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Newsletter form handling
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing! We\'ll be in touch soon.');
                emailInput.value = '';
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    }
}

// Enhanced gallery with seamless loop and better controls
function initializeGallery() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (gallerySlider && galleryContainer) {
        let isPlaying = true;
        
        // Pause/resume on hover
        galleryContainer.addEventListener('mouseenter', () => {
            if (isPlaying) {
                gallerySlider.style.animationPlayState = 'paused';
            }
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            if (isPlaying) {
                gallerySlider.style.animationPlayState = 'running';
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        galleryContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            gallerySlider.style.animationPlayState = 'paused';
        }, { passive: true });
        
        galleryContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            
            // Add subtle resistance effect
            if (Math.abs(deltaX) > 10) {
                gallerySlider.style.transform = `translateX(${deltaX * 0.3}px)`;
            }
        }, { passive: true });
        
        galleryContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            // Reset transform and resume animation
            gallerySlider.style.transform = '';
            gallerySlider.style.animationPlayState = 'running';
            
            const deltaX = currentX - startX;
            
            // If significant swipe, provide feedback
            if (Math.abs(deltaX) > 50) {
                // Add a subtle bounce effect
                gallerySlider.style.transition = 'transform 0.3s ease';
                gallerySlider.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    gallerySlider.style.transition = '';
                    gallerySlider.style.transform = '';
                }, 300);
            }
        }, { passive: true });
        
        // Accessibility: Add keyboard navigation
        galleryContainer.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                // Toggle play/pause
                if (isPlaying) {
                    gallerySlider.style.animationPlayState = 'paused';
                    isPlaying = false;
                } else {
                    gallerySlider.style.animationPlayState = 'running';
                    isPlaying = true;
                }
            }
        });
        
        // Make gallery container focusable for keyboard navigation
        galleryContainer.setAttribute('tabindex', '0');
        galleryContainer.setAttribute('aria-label', 'Image gallery carousel. Press space to pause/resume.');
    }
    
    // Legacy support for old gallery slider without container
    const legacyGallerySlider = document.querySelector('.gallery-slider:not(.gallery-container .gallery-slider)');
    if (legacyGallerySlider && !galleryContainer) {
        legacyGallerySlider.addEventListener('mouseenter', () => {
            legacyGallerySlider.style.animationPlayState = 'paused';
        });
        
        legacyGallerySlider.addEventListener('mouseleave', () => {
            legacyGallerySlider.style.animationPlayState = 'running';
        });
    }
}

// Feature card interactions
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add click handler for mobile devices
        card.addEventListener('click', function() {
            // Add a gentle bounce animation
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.feature-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.feature-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Handle ESC key to scroll to top
        if (e.key === 'Escape') {
            scrollToTop();
        }
        
        // Handle arrow keys for section navigation
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            navigateToNextSection();
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            navigateToPrevSection();
        }
    });
}

// Navigate to next/previous section
function navigateToNextSection() {
    const sections = ['overview', 'highlights', 'layout', 'accommodation', 'services', 'experiences', 'location'];
    const currentActive = document.querySelector('.nav-link.active');
    
    if (currentActive) {
        const currentHref = currentActive.getAttribute('href').substring(1);
        const currentIndex = sections.indexOf(currentHref);
        const nextIndex = (currentIndex + 1) % sections.length;
        scrollToSection(sections[nextIndex]);
    }
}

function navigateToPrevSection() {
    const sections = ['overview', 'highlights', 'layout', 'accommodation', 'services', 'experiences', 'location'];
    const currentActive = document.querySelector('.nav-link.active');
    
    if (currentActive) {
        const currentHref = currentActive.getAttribute('href').substring(1);
        const currentIndex = sections.indexOf(currentHref);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        scrollToSection(sections[prevIndex]);
    }
}

// Accessibility improvements
function initializeAccessibility() {
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #362511';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add aria-labels to interactive elements without text
    const upArrow = document.querySelector('.up-arrow');
    if (upArrow) {
        upArrow.setAttribute('aria-label', 'Scroll to top');
        upArrow.setAttribute('role', 'button');
        upArrow.setAttribute('tabindex', '0');
        
        // Make it keyboard accessible
        upArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
    }
    
    // Add aria-labels to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.setAttribute('aria-label', 'Scroll to next section');
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('tabindex', '0');
        
        scrollIndicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection('highlights');
            }
        });
    }
    
    // REMOVED the header focus styles that were causing conflicts
}
function initializePerformanceOptimizations() {
    // Optimize scroll events with requestAnimationFrame
    let ticking = false;
    
    function updateOnScroll() {
        handleScroll();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Replace the default scroll listener with optimized version
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Error handling
function initializeErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Main initialization function
function initializeWebsite() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runInitialization);
    } else {
        runInitialization();
    }
}

function runInitialization() {
    try {
        // Initialize header functionality first
        initializeHeader();
        initializeTransparentHeader();
        
        // Core functionality
        initializeNavigation();
        initializeScrollAnimations();
        initializeNewsletter();
        
        // Enhanced gallery with seamless loop
        initializeGallery();
        
        // Enhanced features
        initializeFeatureCards();
        initializeKeyboardNavigation();
        initializeAccessibility();
        
        initializeErrorHandling();
        initializePerformanceOptimizations();
        // Add scroll listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        console.log('Ultima Corfu website initialized successfully');
        
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Initialize the website
initializeWebsite();