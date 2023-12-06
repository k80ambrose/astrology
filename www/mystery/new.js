document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define the common center for all spirals
    const commonCenterX = canvas.width / 2;
    const commonCenterY = canvas.height / 2;

    // Define multiple spirals with different starting angles and initial angleAcceleration
    const spirals = [
        { angle: 0, radius: 0, angleVelocity: 0.2, angleAcceleration: 0.001, movingClockwise: true, lastDirectionChangeAngle: 0 },
        { angle: Math.PI / 6, radius: 0, angleVelocity: 0.2, angleAcceleration: 0.001, movingClockwise: true, lastDirectionChangeAngle: Math.PI / 6 },
        { angle: Math.PI / 3, radius: 0, angleVelocity: 0.2, angleAcceleration: 0.001, movingClockwise: true, lastDirectionChangeAngle: Math.PI / 3 },
        // Add more spirals with different starting angles as needed
    ];

    function drawSpiral(spiral) {
        ctx.beginPath(); // Begin a new path for the current spiral
        // Move to the common center to start the spiral
        ctx.moveTo(commonCenterX + spiral.radius * Math.cos(spiral.angle), commonCenterY + spiral.radius * Math.sin(spiral.angle));

        // Determine the angle limit for one-twelfth of a circle
        const angleLimit = Math.PI / 6;

        // Check the angle change for counter-clockwise movement
        let angleChange = (spiral.angle - spiral.lastDirectionChangeAngle + 2 * Math.PI) % (2 * Math.PI); // Normalize the angle change to be positive
        if (!spiral.movingClockwise && angleChange > angleLimit) {
            spiral.movingClockwise = true; // Force change direction to clockwise
            spiral.lastDirectionChangeAngle = spiral.angle; // Update the last direction change angle
        } else if (spiral.movingClockwise && Math.random() < 0.01 && angleChange > angleLimit) {
            spiral.movingClockwise = false; // Change direction to counter-clockwise
            spiral.lastDirectionChangeAngle = spiral.angle; // Update the last direction change angle
        }

        // Apply acceleration until reaching target velocity
        spiral.angleAcceleration = spiral.movingClockwise ? 0.001 : -0.001;
        spiral.angleVelocity += spiral.angleAcceleration;
        spiral.angle += spiral.angleVelocity;

        // Expand radius at a constant rate
        spiral.radius += 0.2;

        const x = commonCenterX + spiral.radius * Math.cos(spiral.angle);
        const y = commonCenterY + spiral.radius * Math.sin(spiral.angle);

        // Draw a line to the new point
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'white';
        ctx.stroke(); // Apply the stroke to the path
    }

    function animate() {
       
