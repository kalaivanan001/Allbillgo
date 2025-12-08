        // 1. Mobile Menu Toggle Script
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
            document.querySelector('.nav-actions').classList.toggle('active');
        });

        // 2. Animated Counter Script
        const counters = document.querySelectorAll('.counter');
        const counterContainer = document.querySelector('.stats-counter-container');
        let animationStarted = false;

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const start = 0;
            let current = 0;
            const step = target / (duration / 16); // ~60fps

            const updateCount = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString() + (target === 99.9 ? '%' : target > 1000 ? '+' : '');
                }
            };
            updateCount();
        };

        const checkVisibility = () => {
            if (counterContainer) {
                const rect = counterContainer.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

                if (isVisible && !animationStarted) {
                    counters.forEach(animateCounter);
                    animationStarted = true;
                    // Remove the scroll listener once the animation starts
                    window.removeEventListener('scroll', checkVisibility);
                }
            }
        };
        
        // Listen for scroll events to trigger the counter animation
        window.addEventListener('scroll', checkVisibility);
        // Also check on load in case the section is visible immediately
        checkVisibility(); 



        // ... (Your existing checkVisibility function and mobile toggle script) ...

// --- Modal Functions ---
function openModal() {
    const modal = document.getElementById('demoModal');
    // Add the 'show' class to apply fade-in and set display: flex
    modal.classList.add('show'); 
}

function closeModal() {
    const modal = document.getElementById('demoModal');
    // Remove the 'show' class to fade out
    modal.classList.remove('show');
    // Optional: Use a timeout to fully hide it after the fade transition completes (e.g., 300ms)
    // setTimeout(() => { modal.style.display = 'none'; }, 300); 
}



// --- STICKY BUTTON VISIBILITY LOGIC Contact us---

const stickyButton = document.getElementById('stickyContactBtn');
// Define how far the user must scroll before the button appears (e.g., 200 pixels)
const scrollThreshold = 200; 

function checkStickyButtonVisibility() {
    // Check if the vertical scroll position is greater than the defined threshold
    if (window.scrollY > scrollThreshold) {
        // Show the button
        stickyButton.classList.add('visible');
        stickyButton.classList.remove('hidden');
    } else {
        // Hide the button
        stickyButton.classList.remove('visible');
        stickyButton.classList.add('hidden');
    }
}

// Add event listener to the window's scroll event
window.addEventListener('scroll', checkStickyButtonVisibility);
// Also run it once on load in case the page reloads mid-scroll
window.addEventListener('load', checkStickyButtonVisibility);









// --- ADVANCED ANIMATE ON SCROLL (AOS) using Intersection Observer ---

// 1. Define the Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'observed' class when the element enters the viewport
            entry.target.classList.add('observed');
            // Stop observing once animated (optional, for performance)
            observer.unobserve(entry.target); 
        }
    });
}, {
    // Options: Trigger when 10% of the element is visible
    threshold: 0.1 
});

// 2. Target all elements with AOS classes
const aosElements = document.querySelectorAll('[class*="aos-"]');
aosElements.forEach(el => {
    observer.observe(el);
});


// 3. Counter Logic (KEEP this section, ensuring it uses the old scroll method OR the Intersection Observer)
// Note: If you want to use the IntersectionObserver for the counters too, 
// you can target the '.stats-counter-container' and run animateCounter() inside the observer loop.
// For now, let's keep the existing counter scroll handler to avoid conflicts.


