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

    // Define multiple spirals with different starting angles
    const spirals = [
        { angle: 0, radius: 0, angleVelocity: 0.01, movingClockwise: true, lastDirectionChangeAngle:  Math.PI / 6, color: 'yellow' },
        { angle: Math.PI / 6, radius: 0, angleVelocity: 0.05, movingClockwise: true, lastDirectionChangeAngle: Math.PI / 6, color: 'cyan' },
        { angle: Math.PI / 3, radius: 0, angleVelocity: 0.02, movingClockwise: true, lastDirectionChangeAngle: Math.PI / 3, color: 'orange' },
        { angle: Math.PI / 2, radius: 1, angleVelocity: 0.02, movingClockwise: true, lastDirectionChangeAngle: Math.PI / 6, color: 'red' },
        
    ];

    function drawSpiral(spiral) {
        // Begin a new path for the spiral
        ctx.beginPath();
        // Move to the common center to start the spiral
        ctx.moveTo(commonCenterX + spiral.radius * Math.cos(spiral.angle), commonCenterY + spiral.radius * Math.sin(spiral.angle));

        // Check the angle change for counter-clockwise movement and adjust velocity and angle
        if (!spiral.movingClockwise && (spiral.angle - spiral.lastDirectionChangeAngle) < -Math.PI / 6) { // 1/12th circle for counter-clockwise
            spiral.movingClockwise = true;
            spiral.lastDirectionChangeAngle = spiral.angle;
        } else if (Math.random() < 0.01 && (spiral.angle - spiral.lastDirectionChangeAngle) > Math.PI / 6) { // Random chance to change direction
            spiral.movingClockwise = false;
            spiral.lastDirectionChangeAngle = spiral.angle;
        }

        // Apply acceleration until reaching target velocity
        let angleAcceleration = spiral.movingClockwise ? 0.001 : -0.001;
        spiral.angleVelocity += angleAcceleration;
        spiral.angle += spiral.angleVelocity;

        // Expand radius at a constant rate
        spiral.radius += 0.2;

        const x = commonCenterX + spiral.radius * Math.cos(spiral.angle);
        const y = commonCenterY + spiral.radius * Math.sin(spiral.angle);

        // Draw a line to the new point
        ctx.lineTo(x, y);
        ctx.strokeStyle = spiral.color;
        ctx.lineWidth = 0.5; // Adjust this value for thinner or thicker lines
        ctx.stroke();
    }

    function animate() {
        // Optionally clear the canvas for a single spiral or comment out to keep the trail
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each spiral
        spirals.forEach(drawSpiral);

        // Continue the animation loop
        requestAnimationFrame(animate);
    }

    animate();
});
