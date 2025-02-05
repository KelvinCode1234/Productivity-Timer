let timerInterval; // Variable to store the timer interval
let timeLeft = 25 * 60; // Default 25 minutes in seconds
let isPaused = false; // Pause state
const MAX_HISTORY = 10; // Maximum number of history entries

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const customTimeInput = document.getElementById("custom-time");
const setTimeButton = document.getElementById("set-time-btn");
const toastContainer = document.getElementById("toast-container");
const historyList = document.getElementById("history-list");

// Initialize timer history from localStorage
let timerHistory = JSON.parse(localStorage.getItem("timerHistory")) || [];

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Function to show toast notifications
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Remove toast after animation
  setTimeout(() => {
    toast.remove();
  }, 3500); // Matches the fade-out animation duration
}

// Function to notify users via desktop notifications and toast
function notifyUser(message) {
  showToast(message, "success"); // Show toast notification
  if (Notification.permission === "granted") {
    new Notification(message); // Show desktop notification
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

// Function to start the timer
function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals

  timerInterval = setInterval(() => {
    if (!isPaused && timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      notifyUser("Time's up! Take a break.");
    }
  }, 1000);
}

// Function to pause or resume the timer
function togglePause() {
  if (timerInterval) {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
    showToast(isPaused ? "Timer Paused" : "Timer Resumed", "info");
  }
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;
  pauseButton.textContent = "Pause";
  timeLeft = 25 * 60; // Reset to default 25 minutes
  updateTimerDisplay();
  showToast("Timer Reset", "warning");
}

// Function to set a custom time
function setCustomTime() {
  const customMinutes = parseInt(customTimeInput.value);

  if (!isNaN(customMinutes) && customMinutes > 0) {
    if (timerHistory.length >= MAX_HISTORY) {
      showToast("History limit reached! Delete at least one timer to set a new one.", "error");
      return;
    }

    // Add custom time to history
    const customTime = `${customMinutes} minutes`;
    timerHistory.push(customTime);
    localStorage.setItem("timerHistory", JSON.stringify(timerHistory));

    // Set timer to custom time
    timeLeft = customMinutes * 60; // Convert minutes to seconds
    updateTimerDisplay();
    renderHistory(); // Update history list in the UI
    showToast(`Custom timer set to ${customMinutes} minutes`, "success");
  } else {
    showToast("Please enter a valid number of minutes.", "error");
  }
}

// Function to render timer history
function renderHistory() {
  historyList.innerHTML = ""; // Clear the list first
  timerHistory.forEach((timer, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = timer;

    // Add a delete button for each history item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => deleteHistoryItem(index));

    listItem.appendChild(deleteButton);
    historyList.appendChild(listItem);
  });
}

// Function to delete a history item
function deleteHistoryItem(index) {
  timerHistory.splice(index, 1); 
  localStorage.setItem("timerHistory", JSON.stringify(timerHistory)); // Update localStorage
  renderHistory(); 
  showToast("History item deleted.", "warning");
}


updateTimerDisplay();
renderHistory(); // 

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetTimer);
setTimeButton.addEventListener("click", setCustomTime);

// Check and request notification permissions
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission();
}

