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

export async function createNoteParticles(mood) {
    const moodParticles = {
        happy: { color: '#FFEC61', shape: 'circle', number: 25, speed: 1, size: 150 },
        sad: { color: '#4A90E2', shape: 'circle', number: 300, speed: 1, direction: 'bottom' },
        excited: { color: '#ffac42', shape: 'polygon', number: 150, speed: 5 },
        romantic: { color: '#FF69B4', shape: 'image', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png', width: 100, height: 100 }, number: 100, speed: 2 },
        thoughtful: { color: '#6A5ACD', shape: 'circle', number: 400, speed: 1.5, direction: 'none' },
        hot: { color: '#840e0e', shape: 'circle', number: 60, speed: 2.5, direction: 'none' },
        demon: { color: '#D81111', shape: 'circle', number: 1500, speed: 10, size: 10 },
        default: { color: '#FFFFFF', shape: 'circle', number: 50, speed: 2 }
    };

    const particlesConfig = moodParticles[mood] || moodParticles.default;

    particlesJS("particles-js", {
        particles: {
            number: {
                value: particlesConfig.number || 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particlesConfig.color
            },
            shape: {
                type: particlesConfig.shape,
                image: particlesConfig.image // Add image configuration if present
            },
            opacity: {
                value: 1,
                random: true,
                anim: {
                    enable: false
                }
            },
            size: {
                value: particlesConfig.size || 50,
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
                speed: particlesConfig.speed || 2,
                direction: particlesConfig.direction || 'top',
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
    particlesContainer.classList.remove('fade-out');
}

export function fadeOutNoteParticles() {
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.classList.remove('show-particles');
    particlesContainer.classList.add('fade-out');
}

import { getNotesSentCount } from './firestore.js';

export async function updateLoveMeter(userId) {
    const count = await getNotesSentCount(userId);
    const loveMeterFill = document.getElementById('love-meter-fill');
    const maxNotes = 1000; // Define the maximum number of notes for the meter to be full

    const percentage = Math.min((count / maxNotes) * 100, 100);
    loveMeterFill.style.width = `${percentage}%`;
}