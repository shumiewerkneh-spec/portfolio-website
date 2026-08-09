document.addEventListener("DOMContentLoaded", function () {
    // --------------------------------------------------------------------------
    // 1. Mobile Navigation Toggle & Scroll Header Effect
    // --------------------------------------------------------------------------
    const header = document.getElementById("header");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });
    }

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }
        });
    });

    // Sticky header shadow on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --------------------------------------------------------------------------
    // 2. Typing Effect for Hero Subtitle
    // --------------------------------------------------------------------------
    const typingElement = document.getElementById("typing-text");
    const titles = [
        "Frontend Developer",
        "Software Engineering Student",
        "UI/UX Enthusiast",
        "Creative Problem Solver"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;
        
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // --------------------------------------------------------------------------
    // 3. Project Filter Gallery
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 4. Modal Popup for Project Preview
    // --------------------------------------------------------------------------
    const projectModal = document.getElementById("project-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalTech = document.getElementById("modal-tech");
    const modalDesc = document.getElementById("modal-desc");
    const modalClose = document.getElementById("modal-close");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    function openModal(card) {
        if (!projectModal) return;
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-desc");
        const tech = card.getAttribute("data-tech");
        const img = card.getAttribute("data-img");

        modalTitle.textContent = title || "Project Showcase";
        modalDesc.textContent = desc || "Detailed overview of the project.";
        modalTech.textContent = tech || "HTML, CSS, JavaScript";
        modalImg.src = img || "";

        projectModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable page scroll
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        document.body.style.overflow = "auto"; // Re-enable page scroll
    }

    document.querySelectorAll(".open-modal-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".project-card");
            if (card) openModal(card);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    // Live Demo Buttons alert/trigger
    document.querySelectorAll(".demo-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showToast("Interactive demo feature preview loaded!");
        });
    });

    // --------------------------------------------------------------------------
    // 5. Contact Form Submission & Toast Notification
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    function showToast(msg) {
        if (!toast) return;
        toastMessage.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                showToast("Please fill in all required fields.");
                return;
            }

            showToast(`Thank you ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // --------------------------------------------------------------------------
    // 6. Scroll Reveal Observer & Active Navigation Highlight
    // --------------------------------------------------------------------------
    const reveals = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section");

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        checkReveal();

        // Highlight Active Nav Link
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.getElementById("back-to-top");
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        }
    });

    // Trigger reveal once on load
    checkReveal();

    // Back to top button click action
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --------------------------------------------------------------------------
    // 7. Background Particles Canvas Animation
    // --------------------------------------------------------------------------
    const canvas = document.getElementById("bg-particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        const particleCount = 35;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.color = Math.random() > 0.5 ? "rgba(59, 130, 246, " : "rgba(139, 92, 246, ";
                this.alpha = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ")";
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw lines between close particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist / 1200})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
});

