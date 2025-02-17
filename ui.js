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

import { getNotesSentCountByUser, getNotesSentCountByUserInLast7Days, getMostUsedMood, getMostUsedMoodInLast7Days } from './firestore.js';

const myUserId = 'DvRrCAPAoDb4Mz3adWZllPFKJ8U2';
const partnerUserId = 'VSAGQ2iFO9NdHL9EafMVY6xUw0k1';

export async function updateLoveMeter() {
    const myCount = await getNotesSentCountByUserInLast7Days(myUserId);
    const partnerCount = await getNotesSentCountByUserInLast7Days(partnerUserId);
    const myLoveMeterFill = document.getElementById('my-love-meter-fill');
    const partnerLoveMeterFill = document.getElementById('partner-love-meter-fill');
    const totalNotes = myCount + partnerCount;

    const myPercentage = (myCount / totalNotes) * 100;
    const partnerPercentage = (partnerCount / totalNotes) * 100;

    myLoveMeterFill.style.width = `${myPercentage}%`;
    partnerLoveMeterFill.style.width = `${partnerPercentage}%`;
}

// Add fade-in and fade-out functionality for the love meter
export function fadeInLoveMeter() {
    const loveMeterContainer = document.getElementById('love-meter-container');
    loveMeterContainer.classList.remove('fade-out');
    loveMeterContainer.classList.add('fade-in');
}

export function fadeOutLoveMeter() {
    const loveMeterContainer = document.getElementById('love-meter-container');
    loveMeterContainer.classList.remove('fade-in');
    loveMeterContainer.classList.add('fade-out');
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show stats popup
async function showStats(userId, statsElement) {
    const totalNotes = await getNotesSentCountByUser(userId);
    const notesLast7Days = await getNotesSentCountByUserInLast7Days(userId);
    let mostUsedMood = await getMostUsedMood(userId);
    let currentFavoriteMood = await getMostUsedMoodInLast7Days(userId);
    mostUsedMood = capitalizeFirstLetter(mostUsedMood);
    currentFavoriteMood = capitalizeFirstLetter(currentFavoriteMood);

    statsElement.innerHTML = `
        <p><b>Recently</b></p>
        <p>Sent ${notesLast7Days} Notes</p>
        <p>Favourite mood is ${currentFavoriteMood}</p>
        <p><b>Overall</b></p>
        <p>Sent ${totalNotes} Notes</p>
        <p>Favourite mood is ${mostUsedMood}</p>
    `;
    statsElement.style.display = 'block';
    statsElement.style.opacity = '1'; // Ensure visibility

    // Adjust position to ensure it stays on screen
    const rect = statsElement.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        statsElement.style.left = 'auto';
        statsElement.style.right = '0';
        statsElement.style.transform = 'translateX(-50%)';
    }
    if (rect.left < 0) {
        statsElement.style.left = '0';
        statsElement.style.right = 'auto';
        statsElement.style.transform = 'translateX(50%)';
    }

    // Apply slide-in animation
    if (statsElement.id === 'my-stats') {
        statsElement.style.animation = 'slideInFromLeft 0.5s forwards';
    } else if (statsElement.id === 'partner-stats') {
        statsElement.style.animation = 'slideInFromRight 0.5s forwards';
    }
}

// Hide stats popup
export function hideStats(statsElement) {
    if (statsElement.id === 'my-stats') {
        statsElement.style.animation = 'slideOutToLeft 0.5s forwards';
    } else if (statsElement.id === 'partner-stats') {
        statsElement.style.animation = 'slideOutToRight 0.5s forwards';
    }
    setTimeout(() => {
        statsElement.style.display = 'none';
        statsElement.style.animation = ''; // Reset animation
    }, 500); // Match the duration of the animation
}

// Event listener for love meter
document.getElementById('love-meter').addEventListener('click', (event) => {
    event.stopPropagation();
    const myStatsElement = document.getElementById('my-stats');
    const partnerStatsElement = document.getElementById('partner-stats');

    showStats(myUserId, myStatsElement);
    showStats(partnerUserId, partnerStatsElement);
});

// Event listeners for initials
document.getElementById('my-initial').addEventListener('click', (event) => {
    event.stopPropagation();
    const statsElement = document.getElementById('my-stats');
    if (statsElement.style.display === 'none' || statsElement.style.opacity === '0') {
        showStats(myUserId, statsElement);
    } else {
        hideStats(statsElement);
    }
});

document.getElementById('partner-initial').addEventListener('click', (event) => {
    event.stopPropagation();
    const statsElement = document.getElementById('partner-stats');
    if (statsElement.style.display === 'none' || statsElement.style.opacity === '0') {
        showStats(partnerUserId, statsElement);
    } else {
        hideStats(statsElement);
    }
});