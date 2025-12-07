document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    if (mobileMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const applicationItems = document.querySelectorAll('.application-item');
    applicationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.app-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.app-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
    
    const elementCards = document.querySelectorAll('.element-card');
    elementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 168, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    const problemCards = document.querySelectorAll('.problem-card');
    const factItems = document.querySelectorAll('.fact-item');
    const solutionSteps = document.querySelectorAll('.solution-step');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('problem-card') || 
                    entry.target.classList.contains('fact-item') ||
                    entry.target.classList.contains('solution-step')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = [...problemCards, ...factItems, ...solutionSteps];
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    const elementItems = document.querySelectorAll('.element-item');
    elementItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    const sectionImages = document.querySelectorAll('.section-image');
    sectionImages.forEach(img => {
        img.parentElement.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.05)';
        });
        
        img.parentElement.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
        });
    });
});