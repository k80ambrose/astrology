// Variables to keep track of the selected dots and dragging state
let firstSelectedDot = null;
let secondSelectedDot = null;
let isDragging = false;
let currentDot = null; // The dot currently being dragged

// Select all dots
const dots = document.querySelectorAll('.aspectDots');

// Select the center point
const centerPoint = document.getElementById('centerPoint')

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

// update the lines and aspect information
function updateLinesAndAspect() {
  drawLines(); // Always draw lines if dots are set
  if (firstSelectedDot && secondSelectedDot) {
    const angle = calculateAngle(firstSelectedDot, secondSelectedDot);
    const aspect = getAspectName(angle);
    displayAspectInfo(aspect);
  }
}

// draw lines to the center
function drawLines() {
  const svg = document.querySelector('#circleContainer svg');
  svg.innerHTML = ''; // Clear previous lines

  // Draw lines if both dots are set, regardless of dragging state
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

// moveDot
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

// Event listeners for dragging functionality
dots.forEach(dot => {
  dot.addEventListener('mousedown', (event) => {
    // Set the current dot and start dragging
    isDragging = true;
    currentDot = dot;
    
    // Consider setting first or second selected dot if not already set
    if (!firstSelectedDot || !secondSelectedDot) {
      if (!firstSelectedDot) {
        firstSelectedDot = dot;
      } else if (!secondSelectedDot && dot !== firstSelectedDot) {
        secondSelectedDot = dot;
      }
    }

    updateLinesAndAspect(); // Start updating the lines and aspect info
    event.preventDefault(); // Prevent text selection etc.
  });
});

// Move dot and update lines and aspect info as the mouse moves
document.addEventListener('mousemove', (event) => {
  if (isDragging && currentDot) {
    moveDot(event, currentDot);
    updateLinesAndAspect(); // Continuously update the lines and aspect info
  }
});

// Stop dragging
document.addEventListener('mouseup', (event) => {
  if (isDragging) {
    isDragging = false;
    currentDot = null;
    updateLinesAndAspect(); // Finalize the lines and aspect info
  }
});

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

// Start drawing the line when dragging starts
dots.forEach(dot => {
  dot.addEventListener('mousedown', (event) => {
    isDragging = true;
    currentDot = event.target;
    drawLines(); // Start drawing the lines
    event.preventDefault(); // Prevent text selection etc.
  });
});

// Finalize the line when dragging stops
document.addEventListener('mouseup', (event) => {
  if (isDragging) {
    isDragging = false;
    drawLines(); // Draw the lines for the last time
    currentDot = null;
  }
});

// Display the aspect information
function displayAspectInfo(aspect) {
  const aspectInfoDiv = document.getElementById('aspectInfo');
  let aspectIconImg = document.getElementById('aspectIcon'); // Try to get the existing image element

  // If the img element doesn't exist, create it
  if (!aspectIconImg) {
    aspectIconImg = document.createElement('img');
    aspectIconImg.id = 'aspectIcon';
    aspectInfoDiv.appendChild(aspectIconImg);
  }

  if (aspect) {
    aspectInfoDiv.textContent = `${aspect.name} - ${aspect.degree}°`;
    aspectIconImg.src = `assets/icons/${aspect.name.toLowerCase()}.svg`;
    aspectIconImg.style.display = 'block';
  } else {
    aspectInfoDiv.textContent = '';
    aspectIconImg.style.display = 'none';
  }
}

// Click count to determine whether it's the first or second click
let clickCount = 0;

// Function to handle circle clicks and move dots accordingly
function handleCircleClick(event) {
  // Determine which dot to move based on the click count
  const targetDot = (clickCount % 2 === 0) ? firstSelectedDot : secondSelectedDot;

  if (targetDot) {
    moveDot(event, targetDot);

    // Update the lines and aspect information
    updateLinesAndAspect();

    // Increment click count
    clickCount++;
  }
}

// Initial positioning of dots and adding window resize event listener
function init() {
  positionDots();
  // Event listener for the circle container
  document.getElementById('circleContainer').addEventListener('click', handleCircleClick);
  // Event listener for window resize
  window.addEventListener('resize', positionDots);
}

init(); // Call the initialization function
