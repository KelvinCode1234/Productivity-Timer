
# ⏲ Productivity Timer – Chrome Extension

![npm](https://img.shields.io/badge/version-1.0.0-blue) ![license](https://img.shields.io/badge/license-MIT-brightgreen)

**Productivity Timer** helps you stay laser-focused and manage your time like a pro. It's a lightweight, persistent Chrome extension with an intuitive interface, custom alert sounds, and smart notification features to keep your hustle consistent.

---

## ✨ Features

- ⏳ Customizable timer duration  
- ▶️ Start / ⏸ Pause / 🔁 Resume / 🔄 Reset controls  
- 🧠 Persistent background timer (even after browser restarts)  
- 🔔 Desktop notifications + in-app toasts  
- 🎵 Custom alert sound when time’s up  
- 🧾 History of the last 10 completed sessions  
- 🧼 Clean, responsive, and user-friendly interface  

---

## 🛠 Installation

1. Open the **Chrome Web Store**.
2. Search for: `Productivity Timer ⏲`
3. Look for this extension 👇  
   ![Preview](icons/screenshot(1).png)
4. Click `Add to Chrome`.
5. Once installed, the timer icon will appear in your Chrome toolbar.
6. You're all set — stay productive, always 💪

---

## 🚀 Usage

1. Click the timer icon from your toolbar to open the popup.
2. Set your desired session time (default is 25 mins).
3. Use the timer controls: Start, Pause, Resume, Reset.
4. You’ll receive a desktop notification **and** hear a sound when the timer completes — even if the popup is closed or minimized.
5. Your session will automatically be logged into your timer history.

---

## 📁 Project Structure

```
Productivity-Timer/
│
├── icons/                # Extension icons and screenshots
├── popup.html            # UI structure for the popup
├── popup.js              # Handles timer logic and UI
├── background.js         # Keeps timer running in background
├── popup.css             # Styles for the popup window
├── manifest.json         # Chrome extension configuration
├── notification.mp3      # Custom sound for timer completion
├── LICENSE               # Open source license (MIT)
└── README.md             # You’re here 😄
```

---

## 🔐 Permissions Used

- `notifications` – To send desktop alerts  
- `storage` – To store session history and timer state  
- `alarms` – To run the timer persistently in the background  

---

## 🖼 Screenshots

> Here’s a quick look at the extension in action:

![Screenshot 1](icons/1.png)  
![Screenshot 2](icons/2.png)  
![Screenshot 3](icons/3.png)

---

## 📄 License

Released under the [MIT License](./LICENSE).  
Made with ❤️ and full focus.
