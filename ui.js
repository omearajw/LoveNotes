export function showContainer(container) {
    container.style.display = "block";
    setTimeout(() => {
        container.classList.add("show-container");
    }, 10);
}

export function showHeart() {
    const heartContainer = document.getElementById('heart-container');
    if (heartContainer) {
        console.log("Heart container found"); // Debugging statement
        heartContainer.style.display = 'flex'; // Ensure the container is displayed
        setTimeout(() => {
            heartContainer.classList.add('show-heart');
        }, 10); // Small delay to trigger the transition
        const heart = document.getElementById('heart');
        if (heart) {
            console.log("Heart SVG found"); // Debugging statement
            console.log("Heart container display style:", heartContainer.style.display); // Debugging statement
            console.log("Heart SVG opacity:", window.getComputedStyle(heart).opacity); // Debugging statement
        } else {
            console.error("Heart SVG not found"); // Debugging statement
        }
    } else {
        console.error("Heart container not found"); // Debugging statement
    }
}

export function displayHeartbeat() {
    const heart = document.getElementById("heart");
    heart.classList.add("beat");
    setTimeout(() => {
        heart.classList.remove("beat");
    }, 500);
}

export function createFloatingHearts() {
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('heart-container');
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = getRandom(20, 60);
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        const leftPosition = getRandom(0, 100);
        heart.style.left = `${leftPosition}%`;
        const duration = getRandom(3, 5);
        const delay = getRandom(0, 3);
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heartContainer.appendChild(heart);
    }
    document.body.appendChild(heartContainer);
    setTimeout(() => {
        heartContainer.remove();
    }, 8000);
}

function getRandom(min, max) {
    return Math.random() * (min - max) + min;
}

