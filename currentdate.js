window.onload = function() {
    let date = new Date();

    // Get the day of the week
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = daysOfWeek[date.getDay()];

    // Get the month name
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[date.getMonth()];

    // Get the date with the ordinal suffix (like 'th', 'st', etc.)
    let dateOfMonth = date.getDate();
    let ordinal = ["th", "st", "nd", "rd"];
    let suffix = ordinal[(dateOfMonth-20)%10] || ordinal[dateOfMonth] || ordinal[0];

    // Get the full year
    let year = date.getFullYear();

    // Combine all the parts
    let formattedDate = `${dayName}, ${monthName} ${dateOfMonth}${suffix} ${year}`;

    // Insert the formatted date into the HTML
    document.getElementById('currentDate').textContent = formattedDate;
}
