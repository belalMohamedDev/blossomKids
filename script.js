// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
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

// Header background change on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations with variants and stagger
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('fade-in-up');
            el.classList.add('is-visible'); // for .reveal variants
            revealObserver.unobserve(el);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.stat-item, .feature-card, .testimonial-card, .subscription-card, .step, .explore-text, .explore-image, .how-it-works-content, .testimonials-header, .try-free-content, .footer-section'
);
animateElements.forEach((el, index) => {
    // optional stagger via CSS variable
    el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 240)}ms`);
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Counter animation for stats (kept for future; disabled due to current markup)
// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (Number.isNaN(target)) return;
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // ~60fps
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.content-section');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration) {
        heroIllustration.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Download button click tracking
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.classList.contains('google-play') ? 'Google Play' : 'App Store';
        
        // Show a modal or redirect to actual download
        showDownloadModal(platform);
    });
});

// Download modal function
const showDownloadModal = (platform) => {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download Blossom</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in Blossom! The app will be available on ${platform} soon.</p>
                <p>Stay tuned for updates!</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary close-modal-btn">Got it!</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: slideInUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .modal-header h3 {
            color: #333;
            margin: 0;
        }
        
        .close-modal {
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body p {
            color: #666;
            margin-bottom: 1rem;
        }
        
        .modal-footer {
            margin-top: 1.5rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.remove();
        styleSheet.remove();
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
};

// Form validation for newsletter signup (if added later)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Lazy loading for images (if images are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration) {
        heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation (with readyState race condition fix)
const initializeLoadedState = () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyles = `
        body.loaded .hero-title,
        body.loaded .hero-description,
        body.loaded .hero-buttons {
            animation-play-state: running;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadedStyles;
    document.head.appendChild(styleSheet);
};

if (document.readyState === 'complete') {
    initializeLoadedState();
} else {
    window.addEventListener('load', initializeLoadedState);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const rainbowStyles = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = rainbowStyles;
        document.head.appendChild(styleSheet);
        
        setTimeout(() => {
            document.body.style.animation = '';
            styleSheet.remove();
        }, 5000);
        
        konamiCode = [];
    }
});

// Testimonials carousel functionality
(function initTestimonialsCarousel(){
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const dots = Array.from(document.querySelectorAll('.dot-indicator .dot'));
    const prev = document.querySelector('.dot-indicator .prev');
    const next = document.querySelector('.dot-indicator .next');
    if (!cards.length || !prev || !next || !dots.length) return;

    let current = 0;

    const setActive = (index) => {
        current = (index + cards.length) % cards.length;
        cards.forEach((c, i) => {
            c.classList.toggle('active', i === current);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    };

    // initialize
    setActive(0);

    prev.addEventListener('click', () => setActive(current - 1));
    next.addEventListener('click', () => setActive(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => setActive(i)));
})();

// Wire hero buttons to on-page anchors
document.querySelectorAll('.hero-buttons .btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
        const targets = ['.how-it-works', '.explore-subjects'];
        const el = document.querySelector(targets[i]) || document.querySelector('#about');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Console welcome message
console.log(`
🌟 Welcome to Blossom! 🌟
A Safe Place For Your Kids

Built with ❤️ for young learners
Try the Konami code for a surprise! ↑↑↓↓←→←→BA
`);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');

// Function to apply theme
const applyTheme = (theme) => {
    const favicon = document.getElementById('favicon');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (favicon) {
            favicon.href = 'assets/svg/blossomDark.svg';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (favicon) {
            favicon.href = 'assets/svg/blossom.svg';
        }
    }
};

// Initial theme setup (checked against localStorage or system preference)
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
};

// Setup initial theme
const currentTheme = getInitialTheme();
applyTheme(currentTheme);

// Handle click event on the toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}