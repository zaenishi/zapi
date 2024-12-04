        // Initialize AOS
        AOS.init();

        // Particles.js Configuration
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#FF4B4B"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#FF4B4B",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                }
            },
            retina_detect: true
        });

        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        let isDark = false;

        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });

        // GSAP Animations
        gsap.from(".logo", {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: "power4.out"
        });

        gsap.from(".nav-links a", {
            duration: 1,
            y: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out"
        });

        // Floating animation for mushroom emoji
        gsap.to(".mushroom", {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Modal functions
        function openModal() {
            document.getElementById('apiModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('apiModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Add click event to Get Started button
        document.querySelector('.cta-button').addEventListener('click', openModal);

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == document.getElementById('apiModal')) {
                closeModal();
            }
        }

        // Smooth scroll to endpoint sections
        function scrollToEndpoint(id) {
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Mock API calls
        function tryApi(endpoint) {
            const responseContainer = document.getElementById(`${endpoint}Response`);
            responseContainer.style.display = 'block';
            responseContainer.innerHTML = 'Loading...';

            setTimeout(() => {
                let response;
                if (endpoint === 'users') {
                    const page = document.getElementById('userPage').value || 1;
                    const limit = document.getElementById('userLimit').value || 10;
                    response = {
                        status: 'success',
                        data: {
                            users: [
                                {
                                    id: 1,
                                    name: 'John Doe',
                                    email: 'john@example.com',
                                    created_at: new Date().toISOString()
                                }
                            ],
                            pagination: {
                                current_page: parseInt(page),
                                total_pages: 5,
                                total_items: 50
                            }
                        }
                    };
                } else if (endpoint === 'products') {
                    const name = document.getElementById('productName').value;
                    const price = document.getElementById('productPrice').value;
                    const description = document.getElementById('productDescription').value;
                    response = {
                        status: 'success',
                        data: {
                            id: Math.floor(Math.random() * 1000),
                            name,
                            price: parseFloat(price),
                            description,
                            created_at: new Date().toISOString()
                        }
                    };
                }
                responseContainer.innerHTML = `<pre><code class="language-json">${JSON.stringify(response, null, 2)}</code></pre>`;
                Prism.highlightAll();
            }, 1000);
        }