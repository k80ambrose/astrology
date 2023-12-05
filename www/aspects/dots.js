// Calculate interior angle
function calculateAngle(dot1, dot2) {
  
  // Get the positions of the dots relative to the center
  const x1 = parseFloat(dot1.style.left) + dot1.offsetWidth / 2;
  const y1 = parseFloat(dot1.style.top) + dot1.offsetHeight / 2;
  const x2 = parseFloat(dot2.style.left) + dot2.offsetWidth / 2;
  const y2 = parseFloat(dot2.style.top) + dot2.offsetHeight / 2;

  // Coordinates of the center
  const centerX = centerPoint.offsetLeft + centerPoint.offsetWidth / 2;
  const centerY = centerPoint.offsetTop + centerPoint.offsetHeight / 2;

  // Calculate the distances from the center to each dot
  const a = Math.sqrt(Math.pow(x1 - centerX, 2) + Math.pow(y1 - centerY, 2));
  const b = Math.sqrt(Math.pow(x2 - centerX, 2) + Math.pow(y2 - centerY, 2));

  // Calculate the distance between the dots
  const c = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  // Use the Law of Cosines to calculate the angle in radians
  const angleRadians = Math.acos((a * a + b * b - c * c) / (2 * a * b));

  // Convert the angle to degrees
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

// determine the aspect name based on the angle
function getAspectName(angle) {
  const aspects = [
      { name: 'Conjunction', degree: 0 },
      { name: 'Sextile', degree: 60 },
      { name: 'Square', degree: 90 },
      { name: 'Trine', degree: 120 },
      { name: 'Quincunx', degree: 150 },
      { name: 'Opposition', degree: 180 }
  ];

  // Find the closest aspect
  const closestAspect = aspects.reduce((prev, curr) =>
      (Math.abs(curr.degree - angle) < Math.abs(prev.degree - angle) ? curr : prev));

  // Set a threshold for how close the angle should be to the aspect angle
  const threshold = 5; // degrees within the exact aspect
  if (Math.abs(closestAspect.degree - angle) <= threshold) {
      return closestAspect;
  } else {
      return null; // No significant aspect found
  }
}

// display the aspect information
function displayAspectInfo(aspect) {
  const aspectInfoDiv = document.getElementById('aspectInfo');
  if (aspect) {
      aspectInfoDiv.textContent = `${aspect.name} - ${aspect.degree}°`;
  } else {
      aspectInfoDiv.textContent = '';
  }
}
// Modify your updateDotSelection or drawLines function to include aspect calculation
function updateDotSelection(dot) {
  if (firstSelectedDot) firstSelectedDot.style.backgroundColor = 'grey';
  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'grey';

  secondSelectedDot = firstSelectedDot;
  firstSelectedDot = dot;

  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'green';
  firstSelectedDot.style.backgroundColor = 'red';

  drawLines();
  // Calculate the angle after drawing lines
  if (firstSelectedDot && secondSelectedDot) {
      const angle = calculateAngle(firstSelectedDot, secondSelectedDot);
      const aspect = getAspectName(angle);
      displayAspectInfo(aspect);
  }
}

// draw lines to the center
function drawLines() {
  const svg = document.querySelector('#circleContainer svg');
  svg.innerHTML = '';

  if (firstSelectedDot) {
    drawLine(firstSelectedDot, svg);
  }

  if (secondSelectedDot) {
    drawLine(secondSelectedDot, svg);
  }
}

// draw a line from a dot to the center
function drawLine(dot, svg) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const dotRect = dot.getBoundingClientRect();
  const centerRect = centerPoint.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  line.setAttribute('x1', dotRect.left - svgRect.left + dotRect.width / 2);
  line.setAttribute('y1', dotRect.top - svgRect.top + dotRect.height / 2);
  line.setAttribute('x2', centerRect.left - svgRect.left + centerRect.width / 2);
  line.setAttribute('y2', centerRect.top - svgRect.top + centerRect.height / 2);
  line.setAttribute('stroke', 'white');
  line.setAttribute('stroke-width', '2'); // Ensure the line is visible

  svg.appendChild(line);
}
// Select all the dots and the center point
const dots = document.querySelectorAll('.aspectDots');
const centerPoint = document.getElementById('centerPoint')

// Variables to keep track of the selected dots
let firstSelectedDot = null;
let secondSelectedDot = null;
let isDragging = false;

function moveDot(event, dot) {
  const circleContainer = document.getElementById('circleContainer');
  const rect = circleContainer.getBoundingClientRect();
  const radius = rect.width / 2;
  const centerX = rect.left + radius - window.scrollX;
  const centerY = rect.top + radius - window.scrollY;

  // Calculate the angle of the mouse position relative to the center of the circle
  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);

  // Calculate the new position for the dot
  const x = centerX + radius * Math.cos(angle) - (dot.offsetWidth / 2);
  const y = centerY + radius * Math.sin(angle) - (dot.offsetHeight / 2);

  // Update the position of the dot
  dot.style.left = `${x - rect.left}px`;
  dot.style.top = `${y - rect.top}px`;

  // Update the lines and aspect information
  drawLines();
  if (firstSelectedDot && secondSelectedDot) {
    const angle = calculateAngle(firstSelectedDot, secondSelectedDot);
    const aspect = getAspectName(angle);
    displayAspectInfo(aspect);
  }
}

// Event listener for mousedown to initiate dragging
dots.forEach(dot => {
  dot.addEventListener('mousedown', (event) => {
    isDragging = true;
    currentDot = dot;
    event.preventDefault(); // Prevent default dragging behavior
  });
});

// Event listener for mousemove to drag the dot
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    moveDot(event, currentDot);
  }
});

// Event listener for mouseup to end dragging
document.addEventListener('mouseup', (event) => {
  if (isDragging) {
    isDragging = false;
    currentDot = null;
  }
});

// Add click event listener to each dot
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    updateDotSelection(dot);
  });
});

// Function to dynamically position dots and redraw lines
function positionDots() {
  const circleContainer = document.getElementById('circleContainer');
  const radius = circleContainer.offsetWidth / 2;
  const centerX = circleContainer.offsetWidth / 2;
  const centerY = circleContainer.offsetHeight / 2;
  const svg = document.querySelector('#circleContainer svg');

  dots.forEach((dot, index) => {
      const angle = (index / dots.length) * 2 * Math.PI;
      const dotX = centerX + radius * Math.cos(angle) - (dot.offsetWidth / 2);
      const dotY = centerY + radius * Math.sin(angle) - (dot.offsetHeight / 2);

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
  });

  // Redraw lines
  svg.innerHTML = ''; // Clear existing lines
  if (firstSelectedDot) {
      drawLine(firstSelectedDot, svg, centerX, centerY);
  }
  if (secondSelectedDot) {
      drawLine(secondSelectedDot, svg, centerX, centerY);
  }
}
// Initial positioning of dots
positionDots();

// Reposition dots on window resize
window.addEventListener('resize', positionDots);
