// Get the current date
var currentDate = new Date();

// Initialize the year and month variables
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();

// Function to update the month and year display
function updateMonthYear() {
  var monthYearElement = document.getElementById("month-year");
  monthYearElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
}

// Function to generate the calendar grid for the current month
function generateCalendarGrid(year, month) {
  var calendarGrid = document.getElementById("calendar-grid");

  // Clear previous calendar
  calendarGrid.innerHTML = "";

  // Create a new table element
  var table = document.createElement("table");

  // Create the table header row
  var headerRow = document.createElement("tr");

  // Create the table headers for the days of the week
  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (var i = 0; i < 7; i++) {
    var th = document.createElement("th");
    th.textContent = daysOfWeek[i];
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // Get the first day of the month
  var firstDay = new Date(year, month, 1);

  // Get the number of days in the month
  var lastDay = new Date(year, month + 1, 0).getDate();

  // Create the calendar grid
  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      if (i === 0 && j < firstDay.getDay()) {
        // Leave empty cells before the first day of the month
        cell.textContent = "";
      } else if (date > lastDay) {
        // Leave empty cells after the last day of the month
        cell.textContent = "";
      } else {
        cell.textContent = date;
        date++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Append the table to the calendar grid
  calendarGrid.appendChild(table);
}

// Function to go to the previous month
function goToPrevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentYear--;
    currentMonth = 11;
  }
  updateMonthYear();
  generateCalendarGrid(currentYear, currentMonth);
}

// Function to go to the next month
function goToNextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentYear++;
    currentMonth = 0;
  }
  updateMonthYear();
  generateCalendarGrid(currentYear, currentMonth);
}

// Add event listeners to the previous and next buttons
var prevBtn = document.getElementById("prev-btn");
prevBtn.addEventListener("click", goToPrevMonth);

var nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", goToNextMonth);

// Initial generation of the calendar grid
updateMonthYear();
generateCalendarGrid(currentYear, currentMonth);
