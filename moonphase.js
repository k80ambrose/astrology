document.addEventListener("DOMContentLoaded", function() {
    
    // Define the moon phase
    let moonPhase = 30; // Default value. Can be any value between -100 to 100.

    function setMoonPhase(value) {
        moonPhase = value; // Set the moon phase to the provided value

        const leftShadow = document.querySelector('.shadow.left');
        const rightShadow = document.querySelector('.shadow.right');

        if (moonPhase === 0) { 
            // New Moon
            leftShadow.style.width = '50%';
            rightShadow.style.width = '50%';
            leftShadow.style.left = '50%';
            rightShadow.style.left = '50%';
        } else if (moonPhase > 0) {
            // Waxing
            const percentage = 50 + (moonPhase / 2);
            leftShadow.style.width = `${percentage}%`;
            leftShadow.style.left = '0%';
            rightShadow.style.width = '50%';
            rightShadow.style.left = '50%';
        } else {
            // Waning
            const percentage = 50 + (Math.abs(moonPhase) / 2);
            rightShadow.style.width = `${percentage}%`;
            rightShadow.style.left = `${100 - percentage}%`;
            leftShadow.style.width = '50%';
            leftShadow.style.left = '0%';
        }

        const percentageDisplay = document.getElementById('percentage');
        percentageDisplay.textContent = `${moonPhase}%`;
    }

    // Call the function to set the initial moon phase
    setMoonPhase(moonPhase);

});
