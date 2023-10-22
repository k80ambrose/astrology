 // Array of your colors
 const colors = [
    "#FBF8CC",
    "#FDE4CF",
    "#FFCFD2",
    "#F1C0E8",
    "#CFBAF0",
    "#A3C4F3",
    "#90DBF4",
    "#8EECF5",
    "#E86252",
    "#E87EA1",
    "#4C9F70",
    "#DBD56E",
    "#DE8F6E",
    "#3a86ff",
    "#d1495b",
    "#ef233c",
    "#9ec1a3",
    "#84a59d",
    "#b8c0ff",
    "#bbd0ff",
    "#e7c6ff",
    "#fbff12",
    "#d1d646",
    "#4361ee",
    "#55dde0",
    "#f05d5e",
    "#ff9e00",
    "#0496ff",
    "#77bfa3",
    "#fc7753",
    "#ff521b",
    "#7b8cde",
];

 // Select a random color from the array
 const randomColor = colors[Math.floor(Math.random() * colors.length)];

 // Apply the random color to the body's background
 document.body.style.color = randomColor;