export function showContainer(container) {
    container.style.display = "block";
    setTimeout(() => {
        container.classList.add("show-container");
    }, 10);
}

export function showHeart() {
    const heartContainer = document.getElementById('heart-container');
    if (heartContainer) {
        heartContainer.style.display = 'flex'; // Ensure the container is displayed
        setTimeout(() => {
            heartContainer.classList.add('show-heart');
        }, 10); // Small delay to trigger the transition
    }
}

export function displayHeartbeat() {
    const heart = document.getElementById("heart");
    heart.classList.add("beat");
    setTimeout(() => {
        heart.classList.remove("beat");
    }, 500);
}

export function createLoveHearts() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#FF69B4'
            },
            shape: {
                type: 'image',
                image: {
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: true,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 50,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'top',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Fade in the particles
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.classList.add('show-particles');
}

export function fadeOutHearts() {
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.classList.remove('show-particles');
    particlesContainer.classList.add('fade-out');
}