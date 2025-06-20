
// Loading Animation
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
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

// Floating Particles
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
}

// Background Animation
function initBackground() {
    const bgContainer = document.querySelector('.bg-container');
    const backgrounds = [
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23ffffff;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%23000000;stop-opacity:0" /></radialGradient></defs><rect width="1000" height="1000" fill="url(%23grad1)"/></svg>',
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%233b82f6;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%238b5cf6;stop-opacity:0.05" /></radialGradient></defs><rect width="1000" height="1000" fill="url(%23grad2)"/></svg>'
    ];
    
    let currentBg = 0;
    backgrounds.forEach((bg, index) => {
        const img = document.createElement('div');
        img.className = 'bg-media';
        img.style.backgroundImage = `url("${bg}")`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        if (index === 0) img.classList.add('active');
        bgContainer.appendChild(img);
    });

    setInterval(() => {
        const current = bgContainer.querySelector('.bg-media.active');
        current.classList.remove('active');
        currentBg = (currentBg + 1) % backgrounds.length;
        bgContainer.children[currentBg].classList.add('active');
    }, 8000);
}

// Demo Video Function
function playDemo() {
    // Vérifie si le modal existe déjà
    let modal = document.getElementById('demoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'demoModal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 10000;
        `;
        modal.innerHTML = `
            <div style="position:relative;max-width:90vw;max-height:80vh;">
                <button id="closeDemoModal" style="
                    position:absolute;top:-40px;right:0;background:#fff;border:none;
                    border-radius:50%;width:32px;height:32px;font-size:20px;cursor:pointer;
                ">&times;</button>
                <video id="demoVideo" controls autoplay style="width:100%;max-height:80vh;background:#000;">
                    <source src="../picts/demo.mp4" type="application/dash+xml">
                    Votre navigateur ne supporte pas la vidéo MPEG-DASH.
                </video>
            </div>
        `;
        document.body.appendChild(modal);

        // Fermeture du modal
        document.getElementById('closeDemoModal').onclick = function() {
            modal.remove();
        };
        // Fermer en cliquant hors de la vidéo
        modal.onclick = function(e) {
            if (e.target === modal) modal.remove();
        };
    }
}

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animation de soumission
    const button = e.target.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Demande envoyée !';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            alert('🎉 Merci ! Votre demande a été envoyée. Nous vous contacterons dans les 24h pour configurer votre essai gratuit.');
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            e.target.reset();
        }, 2000);
    }, 2000);
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initBackground();
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add some dynamic text animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced visual effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursor_el = document.querySelector('.cursor');
    cursor_el.style.left = e.clientX - 10 + 'px';
    cursor_el.style.top = e.clientY - 10 + 'px';
});
