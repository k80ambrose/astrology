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
    "#98F5E1",
    "#B9FBC0"
];

 // Select a random color from the array
 const randomColor = colors[Math.floor(Math.random() * colors.length)];

 // Apply the random color to the body's background
 document.body.style.color = randomColor;