// background.js
// Handles persistent timer and notifications using Chrome alarms API

let timerEndTime = null;
let timerPaused = false;
let timerDuration = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    timerDuration = request.duration;
    timerEndTime = Date.now() + timerDuration * 1000;
    timerPaused = false;
    chrome.alarms.create("productivityTimer", { delayInMinutes: timerDuration / 60 });
    chrome.storage.local.set({ timerEndTime, timerPaused, timerDuration });
    sendResponse({ status: "started" });
  } else if (request.action === "pauseTimer") {
    timerPaused = true;
    chrome.alarms.clear("productivityTimer");
    timerDuration = Math.max(0, Math.round((timerEndTime - Date.now()) / 1000));
    chrome.storage.local.set({ timerEndTime: null, timerPaused, timerDuration });
    sendResponse({ status: "paused" });
  } else if (request.action === "resumeTimer") {
    timerPaused = false;
    timerEndTime = Date.now() + timerDuration * 1000;
    chrome.alarms.create("productivityTimer", { delayInMinutes: timerDuration / 60 });
    chrome.storage.local.set({ timerEndTime, timerPaused, timerDuration });
    sendResponse({ status: "resumed" });
  } else if (request.action === "resetTimer") {
    timerPaused = false;
    timerEndTime = null;
    timerDuration = 0;
    chrome.alarms.clear("productivityTimer");
    chrome.storage.local.set({ timerEndTime, timerPaused, timerDuration });
    sendResponse({ status: "reset" });
  } else if (request.action === "getTimerState") {
    chrome.storage.local.get(["timerEndTime", "timerPaused", "timerDuration"], (data) => {
      sendResponse(data);
    });
    return true;
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "productivityTimer") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: "Productivity Timer",
      message: "Time's up! Take a break.",
      priority: 2
    });
    // Play custom sound
    playNotificationSound();
    chrome.storage.local.set({ timerEndTime: null, timerPaused: false, timerDuration: 0 });
  }
});

function playNotificationSound() {
  try {
    const audio = new Audio(chrome.runtime.getURL('notification.mp3'));
    audio.play();
  } catch (e) {
    // Audio may not play in all environments, but try
  }
}
