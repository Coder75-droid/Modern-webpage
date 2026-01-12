// The gay part
function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');

    Event.target.classList.add('active');

    if (tabName === 'skills') {
        setTimeout(animateSkillBars, 100);
    }

    if (tabName === 'stats') {
        setTimeout(animateCounters, 100);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

function animateCounters() {
    const counters = [
        { element: 'projectCount', target: 50, suffix: '' },
        { element: 'clientCount', target: 25, suffix: '' },
        { element: 'hourCount', target: 1000, suffix: '+' },
        { element: 'coffeeCount', target: 500, suffix: '+' }
    ];
    
    counters.forEach(counter => {
        animateCounter(counter.element, counter.target, counter.suffix);
    });
}

function animateCounter(elementId, target, suffix = '') {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

document.getElementById('menuToggle').addEventListener('click', function() {
    alert('Mobile menu');
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("This doesn't do nothing btw");
});

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

window.addEventListener('load', function() {
    animateSkillBars();
    animateCounters();
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.pixel-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', function() {s
    document.querySelectorAll('.pixel-border').forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'translate(2px, 2px)';
            this.style.boxShadow = '2px 2px 0 0 #2d3748';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 150);
        });
    });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-2px, -2px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-2px, -2px) scale(1)';
        });
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
});