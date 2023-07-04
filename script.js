// Get the current date
var currentDate = new Date();

// Initialize the year and month variables
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();

// Function to update the month and year display
function updateMonthYear() {
  var monthYearElement = document.getElementById("month-year");
  monthYearElement.textContent = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
}

// Updated function to generate the calendar grid for the current month
function generateCalendarGrid(year, month) {
  var calendarGridBody = document.querySelector("#calendar-grid tbody");

  // Clear previous calendar
  calendarGridBody.innerHTML = "";

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
        var input = document.createElement("input");
        input.type = "text";
        input.name = "input_" + date;
        input.id = "input_" + date;
        input.classList.add("calendar-input");
        cell.textContent = date;
        cell.appendChild(input);
        date++;
      }
      row.appendChild(cell);
    }
    calendarGridBody.appendChild(row);
  }
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
