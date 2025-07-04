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
  timerDisplay.innerHTML = `
      <span class="minutes">${String(minutes).padStart(2, "0")}</span>:
      <span class="seconds">${String(seconds).padStart(2, "0")}</span>
  `;
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
  }, 1500); // Matches the fade-out animation duration
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

// Helper to send timer commands to background
function sendTimerCommand(action, duration) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action, duration }, resolve);
  });
}

// Update popup UI from background timer state
async function syncTimerFromBackground() {
  chrome.runtime.sendMessage({ action: "getTimerState" }, (data) => {
    if (data && data.timerEndTime && !data.timerPaused) {
      const secondsLeft = Math.max(0, Math.round((data.timerEndTime - Date.now()) / 1000));
      timeLeft = secondsLeft;
      isPaused = false;
      updateTimerDisplay();
      if (!timerInterval) startTimer();
    } else if (data && data.timerPaused) {
      timeLeft = data.timerDuration || 0;
      isPaused = true;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerInterval = null;
    } else {
      timeLeft = 25 * 60;
      isPaused = false;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerInterval = null;
    }

    // Update pause button text based on timer state
    if (data && data.timerPaused) {
      pauseButton.textContent = "Resume";
    } else {
      pauseButton.textContent = "Pause";
    }
  });
}

async function syncTimerFromBackground() {
  chrome.runtime.sendMessage({ action: "getTimerState" }, (data) => {
    if (data && data.timerEndTime && !data.timerPaused) {
      const secondsLeft = Math.max(0, Math.round((data.timerEndTime - Date.now()) / 1000));
      timeLeft = secondsLeft;
      isPaused = false;
      updateTimerDisplay();
      if (!timerInterval) startTimer();
      // If timer reached zero, clear interval
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        pauseButton.textContent = "Pause";
      }
    } else if (data && data.timerPaused) {
      timeLeft = data.timerDuration || 0;
      isPaused = true;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerInterval = null;
      pauseButton.textContent = "Resume";
    } else {
      timeLeft = 25 * 60;
      isPaused = false;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerInterval = null;
      pauseButton.textContent = "Pause";
    }
  });
}

// Override timer controls to use background
async function startTimer() {
  if (timerInterval) return;
  await sendTimerCommand("startTimer", timeLeft);
  showToast("Timer Started", "success");
  timerInterval = setInterval(syncTimerFromBackground, 1000);
}

async function togglePause() {
  if (isPaused) {
    await sendTimerCommand("resumeTimer");
    isPaused = false;
    pauseButton.textContent = "Pause";
    showToast("Timer Resumed", "info");
  } else {
    await sendTimerCommand("pauseTimer");
    isPaused = true;
    pauseButton.textContent = "Resume";
    showToast("Timer Paused", "info");
  }
  syncTimerFromBackground();
}

async function resetTimer() {
  await sendTimerCommand("resetTimer");
  showToast("Timer Reset", "warning");
  syncTimerFromBackground();
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
    sendTimerCommand("startTimer", timeLeft);
    syncTimerFromBackground();
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

// Listen for ESC key to close popup but keep timer running
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.close();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  syncTimerFromBackground();
  renderHistory();
  updateTimerDisplay();
});

// Check and request notification permissions
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission();
}

