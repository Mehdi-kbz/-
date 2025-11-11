// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on theme
function updateThemeIcon() {
    const theme = html.getAttribute('data-theme');
    const icon = themeToggle.querySelector('.theme-icon');
    
    if (theme === 'dark') {
        icon.classList.remove('lucide-moon');
        icon.classList.add('lucide-sun');
    } else {
        icon.classList.remove('lucide-sun');
        icon.classList.add('lucide-moon');
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
}

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE SECTION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav-link[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (link) link.classList.add('active');
        } else {
            if (link) link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== HEADER SHADOW ON SCROLL =====
const header = document.querySelector('.header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = 'var(--shadow-sm)';
    } else {
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !bar.classList.contains('animate')) {
            bar.style.setProperty('--progress-width', progress + '%');
            bar.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');

function scrollToTop() {
    if (window.scrollY >= 400) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
}

window.addEventListener('scroll', scrollToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initial state
backToTop.style.transition = 'opacity 0.3s, visibility 0.3s';
backToTop.style.opacity = '0';
backToTop.style.visibility = 'hidden';

// ===== CV DOWNLOAD MODAL =====
const downloadCVBtn = document.getElementById('download-cv');
const cvModal = document.getElementById('cv-modal');

function openCVModal() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    cvModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCVModal();
    });
}

// Close modal on overlay click
const cvModalOverlay = cvModal.querySelector('.modal-overlay');
if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', closeCVModal);
}

// ===== PHONE NUMBER MODAL =====
const phoneBtn = document.getElementById('phone-btn');
const phoneModal = document.getElementById('phone-modal');

function openPhoneModal() {
    phoneModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePhoneModal() {
    phoneModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (phoneBtn) {
    phoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPhoneModal();
    });
}

// Close modal on overlay click
const phoneModalOverlay = phoneModal.querySelector('.modal-overlay');
if (phoneModalOverlay) {
    phoneModalOverlay.addEventListener('click', closePhoneModal);
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCVModal();
        closePhoneModal();
        closeTranscriptModal();
        closeProjectModal();
    }
});

// ===== TRANSCRIPT MODAL =====
const transcriptModal = document.getElementById('transcript-modal');
const transcriptTitle = document.getElementById('transcript-title');
const transcriptContent = document.getElementById('transcript-content');

function openTranscriptModal(type) {
    const titles = {
        'masters': "Master's Degree - Academic Transcript",
        'bachelors': "Bachelor's Degree - Academic Transcript"
    };
    
    const content = {
        'masters': `
            <div class="transcript-info">
                <h3>Master's in Telecommunications Engineering</h3>
                <p><strong>Institution:</strong> Enseirb-Matmeca Bordeaux INP</p>
                <p><strong>Period:</strong> September 2023 - February 2026</p>
                <p><strong>Status:</strong> Currently pursuing - Ranked 3rd in class</p>
                <br>
                <p><em>Upload your watermarked transcript PDF here or embed it as an image/PDF viewer.</em></p>
                <p><em>You can use tools like PDFtron, PDF.js, or simply display as an image.</em></p>
            </div>
        `,
        'bachelors': `
            <div class="transcript-info">
                <h3>Bachelor in Engineering Sciences</h3>
                <p><strong>Institution:</strong> Enseirb-Matmeca Bordeaux INP</p>
                <p><strong>Period:</strong> September 2023 - June 2024</p>
                <p><strong>Achievement:</strong> Graduated 5th in class</p>
                <br>
                <p><em>Upload your watermarked transcript PDF here or embed it as an image/PDF viewer.</em></p>
                <p><em>You can use tools like PDFtron, PDF.js, or simply display as an image.</em></p>
            </div>
        `
    };
    
    transcriptTitle.textContent = titles[type] || 'Academic Transcript';
    transcriptContent.innerHTML = content[type] || '<p>Transcript not available.</p>';
    
    transcriptModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTranscriptModal() {
    transcriptModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close transcript modal on overlay click
const transcriptModalOverlay = transcriptModal.querySelector('.modal-overlay');
if (transcriptModalOverlay) {
    transcriptModalOverlay.addEventListener('click', closeTranscriptModal);
}

// ===== PROJECT DETAILS MODAL =====
const projectModal = document.getElementById('project-modal');
const projectModalContent = document.getElementById('project-modal-content');

function openProjectModal(projectId) {
    const projectData = {
        'rag-systems': {
            title: 'Semantic Search RAG Systems',
            description: `
                <h3>Project Overview</h3>
                <p>During my internship at Pape Dawson Engineers, I developed two production-ready Retrieval-Augmented Generation (RAG) systems that revolutionized how the organization searches and retrieves technical documents.</p>
                
                <h3>Problem Statement</h3>
                <p>Engineering organizations generate massive volumes of documents that are difficult to search using traditional keyword-based methods. The challenge was to build an intelligent system that could understand semantic meaning and retrieve relevant information efficiently.</p>
                
                <h3>Technical Implementation</h3>
                <ul>
                    <li><strong>Backend:</strong> Python with FastAPI for RESTful API development</li>
                    <li><strong>Vector Database:</strong> Qdrant for efficient similarity search</li>
                    <li><strong>Embeddings:</strong> Sentence Transformers for semantic text representation</li>
                    <li><strong>LLM Integration:</strong> Large Language Models for response generation</li>
                    <li><strong>Data Processing:</strong> Automated pipelines for PDF/JSON extraction and vectorization</li>
                    <li><strong>APIs:</strong> SharePoint and OneDrive integration</li>
                    <li><strong>Deployment:</strong> Dockerized microservices architecture</li>
                </ul>
                
                <h3>Key Achievements</h3>
                <ul>
                    <li>70% reduction in search time</li>
                    <li>Processed and indexed 1000+ technical documents</li>
                    <li>Eliminated manual search processes</li>
                    <li>Deployed two production-ready systems</li>
                    <li>Implemented automated data ingestion pipelines</li>
                </ul>
                
                <h3>Impact</h3>
                <p>The systems significantly improved operational efficiency by enabling engineers to find relevant information quickly and accurately. The RAG approach reduced hallucination rates and ensured all responses were grounded in actual source documents.</p>
                
                <div class="project-tags-modal">
                    <span class="tag">Python</span>
                    <span class="tag">FastAPI</span>
                    <span class="tag">Qdrant</span>
                    <span class="tag">Docker</span>
                    <span class="tag">RAG</span>
                    <span class="tag">NLP</span>
                    <span class="tag">Production</span>
                </div>
            `
        }
    };
    
    const project = projectData[projectId];
    
    if (project) {
        projectModalContent.innerHTML = `
            <h2 class="modal-title">${project.title}</h2>
            <div class="project-modal-body">
                ${project.description}
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close project modal on overlay click
const projectModalOverlay = projectModal.querySelector('.modal-overlay');
if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', closeProjectModal);
}

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-content, .featured-card, .project-card, .skill-category, .language-card, .timeline-item, .reference-card, .cert-card, .contact-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hashes
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LUCIDE ICONS INITIALIZATION =====
// Lucide icons are loaded via CDN in HTML, but we need to create icon elements
// This is a fallback if icons don't load properly
document.addEventListener('DOMContentLoaded', () => {
    // Check if lucide is loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ===== PRELOAD OPTIMIZATION =====
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE EASTER EGG =====
console.log(`
%c╔══════════════════════════════════════╗
║  Hi there! 👋                        ║
║  Thanks for checking out my code     ║
║  Feel free to reach out!             ║
║  Email: khabouzemehdi@outlook.com    ║
╚══════════════════════════════════════╝
`, 'color: #0A84FF; font-family: monospace; font-size: 12px;');

// ===== ANALYTICS (OPTIONAL) =====
// You can add Google Analytics or Plausible here
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR-GA-ID');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ===== CONTACT FORM (IF YOU ADD ONE LATER) =====
// const contactForm = document.getElementById('contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         // Handle form submission
//         // You can use EmailJS, Formspree, or your own backend
//     });
// }

// ===== PREVENT CONTEXT MENU ON IMAGES (OPTIONAL) =====
// Uncomment if you want to prevent right-click on your images
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', (e) => e.preventDefault());
// });

// ===== DYNAMIC YEAR IN FOOTER =====
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ===== SERVICE WORKER (FOR PWA - OPTIONAL) =====
// Uncomment to make your portfolio a Progressive Web App
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered'))
//             .catch(err => console.log('SW registration failed'));
//     });
// }
