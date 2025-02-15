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