
// =========================================
// ANKITHA'S PORTFOLIO - INTERACTIVE FEATURES
// =========================================

// ===== CURRENT YEAR =====

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===== MOBILE NAVIGATION =====

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // Close the menu when returning to the desktop layout.
    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });
}

// ===== TYPING ANIMATION =====

const typingText = document.getElementById("typing-text");

const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (typingText && !reducedMotionQuery.matches) {
    const phrases = [
        "BCA Graduate",
        "Aspiring Software Tester",
        "Web Development Enthusiast"
    ];

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let isDeleting = true;
    let typingTimer;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentPhrase.substring(
            0,
            characterIndex
        );

        let delay = isDeleting ? 40 : 75;

        if (isDeleting && characterIndex <= 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 350;
        } else if (
            !isDeleting &&
            characterIndex >= phrases[phraseIndex].length
        ) {
            isDeleting = true;
            delay = 1500;
        }

        typingTimer = window.setTimeout(typeEffect, delay);
    }

    typingTimer = window.setTimeout(typeEffect, 1500);

    // Stop the animation if reduced motion is enabled later.
    reducedMotionQuery.addEventListener("change", function (event) {
        if (event.matches) {
            window.clearTimeout(typingTimer);
            typingText.textContent = "BCA Graduate";
        }
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
} else {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

// ===== ACTIVE NAVIGATION LINK =====

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function setActiveLink(sectionId) {
    navigationLinks.forEach(function (link) {
        const isActive = link.getAttribute("href") === "#" + sectionId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            const visibleSections = entries
                .filter(function (entry) {
                    return entry.isIntersecting;
                })
                .sort(function (a, b) {
                    return b.intersectionRatio - a.intersectionRatio;
                });

            if (visibleSections.length > 0) {
                setActiveLink(visibleSections[0].target.id);
            }
        },
        {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

// ===== HEADER SCROLL EFFECT =====

const header = document.getElementById("header");

function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 15);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// ===== READING PROGRESS BAR =====

const progressBar = document.getElementById("page-progress");

function updateProgress() {
    if (!progressBar) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        progressBar.style.width = "0%";
        return;
    }

    const progress = (window.scrollY / scrollableHeight) * 100;

    progressBar.style.width =
        Math.min(100, Math.max(0, progress)) + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// ===== CONTACT FORM =====
// This opens the visitor's email application.
// It does not send or store form data on a server.

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const portfolioEmail = "ankithaa1369@gmail.com";

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const name = document.getElementById("contact-name").value.trim();
        const senderEmail = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + senderEmail + "\n\n" +
            "Message:\n" + message
        );

        if (formNote) {
            formNote.textContent =
                "Opening your email application. Please review and click Send.";
        }

        window.location.href =
            "mailto:" + portfolioEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;
    });
}


// const contactForm = document.getElementById("contact-form");
// const formNote = document.getElementById("form-note");

// // Replace this with your actual email address.
// const portfolioEmail = "ankithaa1369@gmail.com";

// if (contactForm) {
//     contactForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         if (!contactForm.reportValidity()) {
//             return;
//         }

//         if (
//             portfolioEmail === "ankithaa1369@gmail.com" ||
            // !portfolioEmail.includes("@")
//         ) {
//             if (formNote) {
//                 formNote.textContent =
//                     "Please update portfolioEmail in script.js with your actual email address before using this form.";
//             }
//             return;
//         }

//         const name = document.getElementById("contact-name").value.trim();
//         const senderEmail = document.getElementById("contact-email").value.trim();
//         const subject = document.getElementById("contact-subject").value.trim();
//         const message = document.getElementById("contact-message").value.trim();

//         const emailSubject = encodeURIComponent(subject);
//         const emailBody = encodeURIComponent(
//             "Name: " + name + "\n" +
//             "Email: " + senderEmail + "\n\n" +
//             "Message:\n" + message
//         );

//         const mailtoLink =
//             "mailto:" + portfolioEmail +
//             "?subject=" + emailSubject +
//             "&body=" + emailBody;

//         if (formNote) {
//             formNote.textContent =
//                 "Opening your email application. Review the message before sending it.";
//         }

//         window.location.href = mailtoLink;
//     });
// }
