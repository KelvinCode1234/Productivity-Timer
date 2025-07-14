# Productivity Timer Chrome Extension

## Overview
Productivity Timer is a simple and effective Chrome extension designed to help you stay focused and manage your time efficiently. It features a customizable timer, persistent background notifications, a custom alert sound, and a history of your completed sessions.

## Features
- Customizable timer duration
- Start, pause, resume, and reset timer controls
- Persistent timer: continues running and notifies you even if the popup is closed or browser is restarted
- Desktop notifications and in-app toast messages for all timer actions (start, pause, resume, reset, and when the timer ends)
- **Custom notification sound** when the timer ends, in addition to the desktop notification
- Pause button toggles to "Resume" for clear user feedback
- Timer history (last 10 sessions)
- Clean and modern user interface

## Installation
1. Download or clone this repository to your computer.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right corner).
4. Click "Load unpacked" and select the folder containing this extension's files.
5. The Productivity Timer icon will appear in your Chrome toolbar.

## Usage
1. Click the Productivity Timer icon in your Chrome toolbar to open the popup.
2. Set your desired timer duration or use the default 25 minutes.
3. Use the Start, Pause, Resume, and Reset buttons to control the timer. You will see toast notifications for every action.
4. When the timer ends, you will receive a desktop notification and hear a custom alert sound, even if the popup is closed or the browser is minimized.
5. Your timer session will be added to your history.

## File Structure
- `manifest.json` - Extension manifest file
- `popup.html` - Main popup UI
- `popup.js` - Timer logic, UI, and communication with background
- `background.js` - Persistent timer and notification logic (runs even when popup is closed)
- `popup.css` - Styles for the popup
- `notification.mp3` - Custom notification sound played when timer ends
- `icons/` - Extension icons (16x16, 48x48, 128x128)
- `LICENSE` - MIT License
- `README.md` - Project documentation

## Permissions
- `notifications` - To show desktop notifications when the timer ends
- `storage` - To save timer history and timer state
- `alarms` - To run the timer in the background

## Screenshots
![Screenshot](icons/screenshot.png)

## License
This project is licensed under the MIT License.

---

<div align="center" style="margin-top: 24px; font-size: 1em; color: #888;">
  <a href="PRIVACY.html" target="_blank" style="color: #007bff; text-decoration: none;">Privacy Policy</a>
</div>


