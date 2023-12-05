// Function to draw lines to the center
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

// Function to draw a line from a dot to the center (if you're using a separate function)

// Function to draw a line from a dot to the center
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


// Function to update the color of a dot and store its reference
function updateDotSelection(dot) {
  if (firstSelectedDot) firstSelectedDot.style.backgroundColor = 'grey';
  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'grey';

  secondSelectedDot = firstSelectedDot;
  firstSelectedDot = dot;

  if (secondSelectedDot) secondSelectedDot.style.backgroundColor = 'green';
  firstSelectedDot.style.backgroundColor = 'red';

  drawLines();
}

// Select all the dots and the center point
const dots = document.querySelectorAll('.aspectDots');
const centerPoint = document.getElementById('centerPoint');

// Variables to keep track of the selected dots
let firstSelectedDot = null;
let secondSelectedDot = null;

// Add click event listener to each dot
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    updateDotSelection(dot);
  });
});
