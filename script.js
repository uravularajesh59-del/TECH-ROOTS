// TechRoots 2026 - Scripts

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Hero Animations ---
const tl = gsap.timeline();

// Staggered Text Reveal
tl.from(".college-name", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
})
    .from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")
    .from(".event-chips .chip", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
    }, "-=0.4")
    .from(".btn-primary", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4");

// --- Antigravity Floating Animation (GSAP) ---
// Note: We also have CSS animation as fallback, but GSAP allows more random movement
gsap.to(".shape-1", {
    y: -40,
    x: 20,
    rotation: 10,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".shape-2", {
    y: 30,
    x: -30,
    rotation: -15,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll(".scroll-reveal");

revealElements.forEach((element) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // Animation starts when top of element hits 85% of viewport
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Tilt Effect for Registration Card (Simple Move)
const regCard = document.querySelector('.registration-card');

if (regCard) {
    regCard.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = regCard;
        const { offsetX: x, offsetY: y } = e;

        const xMove = (x / width - 0.5) * 20; // -10 to 10
        const yMove = (y / height - 0.5) * 20;

        gsap.to(regCard, {
            rotationY: xMove,
            rotationX: -yMove,
            transformPerspective: 500,
            duration: 0.5,
            ease: "power1.out"
        });
    });

    regCard.addEventListener('mouseleave', () => {
        gsap.to(regCard, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power1.out"
        });
    });
}

// --- Hamburger Menu Logic ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu && closeMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// --- Interaction Functions ---

// Copy Link to Clipboard
function copyLink() {
    const linkInput = document.getElementById("regLink");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile

    navigator.clipboard.writeText(linkInput.value).then(() => {
        const btn = document.querySelector(".btn-copy");
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        btn.style.backgroundColor = "#00f3ff"; // Cyan success color
        btn.style.color = "black";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = ""; // Reset
            btn.style.color = "";
        }, 2000);
    });
}

