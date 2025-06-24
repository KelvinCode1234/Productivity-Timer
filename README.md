# Productivity Timer Chrome Extension

## Overview
Productivity Timer is a simple and effective Chrome extension designed to help you stay focused and manage your time efficiently. It features a customizable timer, notifications, and a history of your completed sessions.

## Features
- Customizable timer duration
- Start, pause, and reset timer controls
- Desktop and in-app toast notifications when the timer ends
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
3. Use the Start, Pause, and Reset buttons to control the timer.
4. When the timer ends, you will receive a notification and the session will be added to your history.

## File Structure
- `manifest.json` - Extension manifest file
- `popup.html` - Main popup UI
- `popup.js` - Timer logic and event handling
- `popup.css` - Styles for the popup
- `icons/` - Extension icons (16x16, 48x48, 128x128)

## Permissions
- `notifications` - To show desktop notifications when the timer ends
- `storage` - To save timer history locally

## Screenshots
![Screenshot](https://img.icons8.com/color/48/timer--v1.png)

## License
This project is licensed under the MIT License.
