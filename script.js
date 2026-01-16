// ===========================
// Dark Mode Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ===========================
// Mobile Menu Toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Download CV Button
// ===========================
const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', () => {
    // In a real application, this would download an actual PDF file
    // For demo purposes, we'll show an alert
    alert('CV download initiated! (This is a demo - replace with actual CV file link)');
    
    // To download a real file, uncomment and modify this:
    /*
    const link = document.createElement('a');
    link.href = 'path/to/your/cv.pdf';
    link.download = 'John_Doe_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll show an alert and reset the form
    console.log('Form submitted:', formData);
    alert('Thank you for your message! (This is a demo - integrate with a backend service for real functionality)');
    
    // Reset form
    contactForm.reset();
    
    // To integrate with a real backend, you could use fetch:
    /*
    fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        contactForm.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    });
    */
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Scroll Animations (Optional Enhancement)
// ===========================
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

// Observe all cards and timeline items for scroll animations
const animatedElements = document.querySelectorAll(
    '.project-card, .achievement-card, .hobby-card, .publication-item, .timeline-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Close mobile menu when clicking outside
// ===========================
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===========================
// Prevent body scroll when mobile menu is open
// ===========================
const menuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isActive = navMenu.classList.contains('active');
            if (window.innerWidth <= 768) {
                if (isActive) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            }
        }
    });
});

menuObserver.observe(navMenu, { attributes: true });

// ===========================
// Social Links Hover Effect
// ===========================
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// Add smooth reveal animation on page load
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Console message
// ===========================
console.log('%c Portfolio Website Loaded Successfully! ', 'background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Customize this portfolio by editing the HTML, CSS, and JS files! ', 'color: #3b82f6; font-size: 14px;');
