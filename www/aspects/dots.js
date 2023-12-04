// Select all the dots and the center point
const dots = document.querySelectorAll('.aspectDots');
const centerPoint = document.getElementById('centerPoint');

// Variables to keep track of the selected dots
let firstSelectedDot = null;
let secondSelectedDot = null;

// Function to update the color of a dot and store its reference
function updateDotSelection(dot) {
  // Reset the color of the previously selected dots if needed
  if (firstSelectedDot) firstSelectedDot.style.backgroundColor = 'grey';
  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'grey';

  // Set the new first and second selected dots
  secondSelectedDot = firstSelectedDot; // The old first becomes the second
  firstSelectedDot = dot; // The new first is the dot that was just clicked

  // Update colors
  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'green';
  firstSelectedDot.style.backgroundColor = 'red';

  // Draw lines to the center (this function will be implemented)
  drawLines();
}

// Function to draw lines to the center
function drawLines() {
    // Get the container element
    const container = document.getElementById('circleContainer');
  
    // Remove existing lines if they exist
    const existingLines = container.querySelectorAll('.connectingLine');
    existingLines.forEach(line => line.remove());
  
    // Function to get the center of a dot
    const getCenterOfDot = (dot) => {
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    };
  
    // Function to create an SVG line element
    const createLine = (x1, y1, x2, y2) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', 'orange'); // The line color
      line.classList.add('connectingLine');
      return line;
    };
  
    // Create an SVG element if not already present
    let svg = container.querySelector('svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', container.offsetWidth);
      svg.setAttribute('height', container.offsetHeight);
      container.appendChild(svg);
    }
  
    // Get the center coordinates
    const center = getCenterOfDot(centerPoint);
  
    // Draw a line from the first selected dot to the center
    if (firstSelectedDot) {
      const firstDotCenter = getCenterOfDot(firstSelectedDot);
      const line1 = createLine(firstDotCenter.x, firstDotCenter.y, center.x, center.y);
      svg.appendChild(line1);
    }
  
    // Draw a line from the second selected dot to the center
    if (secondSelectedDot) {
      const secondDotCenter = getCenterOfDot(secondSelectedDot);
      const line2 = createLine(secondDotCenter.x, secondDotCenter.y, center.x, center.y);
      svg.appendChild(line2);
    }
  }
  

// Add click event listener to each dot
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    updateDotSelection(dot);
  });
});
