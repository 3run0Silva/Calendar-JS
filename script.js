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
  var today = new Date();

  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      var cellText = document.createElement("span");
      cell.appendChild(cellText);

      if (i === 0 && j < firstDay.getDay()) {
        // Display the text from the previous month in grayed-out style
        var prevMonth = month - 1 < 0 ? 11 : month - 1;
        var prevMonthYear = month - 1 < 0 ? year - 1 : year;
        var prevMonthLastDay = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
        var prevMonthDate = prevMonthLastDay - (firstDay.getDay() - j) + 1;
        cellText.textContent = prevMonthDate;
        cellText.classList.add("prev-month");
      } else if (date > lastDay) {
        // Display the text from the next month in grayed-out style
        var nextMonth = month + 1 > 11 ? 0 : month + 1;
        var nextMonthYear = month + 1 > 11 ? year + 1 : year;
        var nextMonthDate = date - lastDay;
        cellText.textContent = nextMonthDate;
        cellText.classList.add("next-month");
        date++;
      } else {
        // Display the text for the current month
        cellText.textContent = date;

        var textarea = document.createElement("textarea");
        textarea.name = "input_" + date;
        textarea.id = "input_" + date;
        textarea.classList.add("calendar-input");
        cell.appendChild(textarea);

        date++;


        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === date - 1) {
          // Highlight the current date
          cell.classList.add("current-date");
        }
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
