    function onDayNightModeClick() {
        if (localStorage.getItem('screenModeNightTokenState') == 'night'){
            localStorage.setItem('screenModeNightTokenState', 'day');
            document.body.classList.remove("darkMode");
        } else  {
            localStorage.setItem('screenModeNightTokenState', 'night');
              document.body.classList.add("darkMode");
        }
        //return document.body.classList.toggle("darkMode");
    }
    document.addEventListener('DOMContentLoaded', function(event) {
        if (localStorage.getItem('screenModeNightTokenState') == 'night'){
            document.body.classList.add("darkMode");
        }
    },true);

    function onSettingClick(e) {
        setTimeout(()=>{
            e.parentNode.classList.toggle("animation");
        },10)
        e.parentNode.classList.toggle("open");

    }

    function setColorTheme(color) {
        let files = document.querySelectorAll(".colorThemeFile");
        files.forEach((style)=>{
            if(color === style.getAttribute("title")){
                style.removeAttribute("disabled");
            }else{
                style.setAttribute("disabled","true");
            }
        })
    }


    function onClickMenu(e) {
        return document.body.classList.toggle("leftMenuOpen");
    }

    function removePopup() {
        return document.body.classList.remove("leftMenuOpen");
    }
/*
        let ignoreClickOnMeElement = document.querySelector('header');
        document.addEventListener('click', function(event) {
            if(document.body.classList.contains("leftMenuOpen")){
                let isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
                if (!isClickInsideElement) {
                    let link = document.body;
                    link.classList.add("leftMenuOpen");
                    //document.body.classList.remove("leftMenuOpen");
                }
            } else{
                console.log("outside click")
            }
        });
*/

    // Typing effect for homepage
    const typingTexts = ['Technical Team Lead', 'Front-End Developer', 'React.js Specialist', 'Team Mentor'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    function typeEffect() {
        if (!typingElement) return;

        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (typingElement) {
            setTimeout(typeEffect, 1000);
        }
    });

    // Counter animation for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // Intersection Observer for stats animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Particles background effect
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 50;

        // Get secondary color from CSS
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary') || '#ff4038';

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw() {
                ctx.fillStyle = secondaryColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = secondaryColor;
                        ctx.globalAlpha = 0.2;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    // Initialize particles on homepage
    if (document.querySelector('.homePage') && !document.querySelector('.about-page')) {
        initParticles();
    }

    // Scroll reveal animation for About page
    function scrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    }

    // Initialize scroll reveal on about page
    if (document.querySelector('.about-page')) {
        scrollReveal();

        // Animate skill bars when visible
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.style.width === '0%') {
                    const progress = entry.target.getAttribute('data-progress');
                    setTimeout(() => {
                        entry.target.style.width = progress + '%';
                    }, 200);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Initialize scroll reveal on services page
    if (document.querySelector('.services-page')) {
        scrollReveal();

        // Add staggered delay to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Initialize portfolio page
    if (document.querySelector('.portfolio-page')) {
        scrollReveal();

        // Portfolio filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filterValue)) {
                            item.classList.remove('hidden');
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 300);
                        }
                    }
                });
            });
        });

        // Add staggered delay to portfolio items
        portfolioItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    }

    // Initialize contact page
    if (document.querySelector('.contact-page')) {
        scrollReveal();
    }

    // Form submission handling with success/error messages
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Formspree handles the actual submission
            // We'll show success after a delay (Formspree redirects by default)
            setTimeout(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
