// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to the landing page
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Add form submission handling for the contact page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Add scroll-based animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.75) {
            el.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Add a simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading');
    loadingScreen.classList.add('hidden');
});

// Custom cursor effect
function customCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Initial cursor color update
    updateCursorColor();
}

// Detect user's language
window.detectLanguage = function() {
    return navigator.language || navigator.userLanguage;
};

// Initialize custom cursor and language detection
window.addEventListener('load', () => {
    customCursor();
    const userLanguage = detectLanguage();
    console.log('User language:', userLanguage);
    // You can use this language information to display the appropriate guide
});

// Mode toggle functionality
function setupModeToggle() {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const currentMode = localStorage.getItem('mode') || 'dark';

    // Set initial mode
    body.classList.add(currentMode + '-mode');
    modeToggle.textContent = currentMode === 'dark' ? '☀️' : '🌙';

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const newMode = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('mode', newMode);
        modeToggle.textContent = newMode === 'dark' ? '☀️' : '🌙';
        
        // Update cursor color
        updateCursorColor();
    });
}

// Call setupModeToggle when the page loads
window.addEventListener('load', setupModeToggle);

// Add this new function to update cursor color
function updateCursorColor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (cursor && cursorDot) {
        const computedStyle = getComputedStyle(document.documentElement);
        const borderColor = computedStyle.getPropertyValue('--cursor-border').trim();
        const dotColor = computedStyle.getPropertyValue('--cursor-dot').trim();
        
        cursor.style.borderColor = borderColor;
        cursorDot.style.backgroundColor = dotColor;
    }
}

// Add this function to your existing main.js file

function setupBackgroundImages() {
    const backgroundContainer = document.getElementById('backgroundImages');
    const images = [
        'photos/image1.jpg',
        'photos/image2.jpg',
        'photos/image3.jpg',
        'photos/image4.jpg',
        'photos/image5.jpg',
        'photos/image6.jpg',
        'photos/image7.jpg',
        'photos/image8.jpg',
    ];

    images.forEach((imagePath, index) => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('background-image');
        imgElement.style.backgroundImage = `url(${imagePath})`;
        if (index === 0) imgElement.classList.add('active');
        backgroundContainer.appendChild(imgElement);
    });

    let currentIndex = 0;

    function changeBackground() {
        const prevImage = backgroundContainer.children[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = backgroundContainer.children[currentIndex];

        prevImage.classList.remove('active');
        nextImage.classList.add('active');
    }

    setInterval(changeBackground, 3000); // Change image every 5 seconds
}

// Call setupBackgroundImages when the page loads
window.addEventListener('load', () => {
    setupBackgroundImages();
    // ... other initialization code ...
});
