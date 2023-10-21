document.addEventListener('mousemove', function(event) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate the difference from the center of the viewport
    const deltaX = (event.clientX - centerX) / centerX;
    const deltaY = (event.clientY - centerY) / centerY;

    // Translate the clouds based on the mouse position
    const translationX = deltaX * 25; // 10 is a multiplier, adjust for more/less movement
    const translationY = deltaY * 10;

    const clouds = document.querySelector('.clouds');
    clouds.style.transform = `translate(${translationX}px, ${translationY}px)`;
});
