const moonPhaseSlider = document.getElementById('moonPhase');
const shadow = document.querySelector('.shadow');
const percentageDisplay = document.getElementById('percentage');

moonPhaseSlider.addEventListener('input', function() {
    let percentage = moonPhaseSlider.value;
    shadow.style.width = `${100 - percentage}%`;
    percentageDisplay.textContent = `${percentage}%`;
});
