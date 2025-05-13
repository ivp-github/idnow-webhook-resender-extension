# IDnow Webhook Resender (Chrome Extension)


This Chrome extension allows you to **automate the process** of opening Ident-IDs in the IDnow platform and triggering the “Resend Webhook” action. Ideal for support, operations, or compliance teams that regularly need to reprocess identifications.
---

## ✅ Features

- 📝 Paste Ident-IDs manually one per line.  
- 🔄 Automatically searches and opens each ID  
- ⚡ Clicks “Resend Webhook” for each ident  
- 📊 Displays a full status report in the browser console

---

## 🚀 How to Use

1. Go to your IDnow admin dashboard and log in.
2. Go to search tab 
3. Click the **extension icon** in Chrome.
4. Paste your Ident-IDs 
5. Click **“Start Automation”**.
6. The extension will:
   - Search for each ident
   - Open it in a new tab
   - Click the **“Resend Webhook”** button
   - Close the tab and continue
7. See the full report in your browser’s **DevTools console**.

---

## 🛠 Installation (Developer Mode)

Until published, you can install the extension manually:
1. Download or clone this repository.
2. Open Chrome and go to: `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **“Load unpacked”** and select the extracted folder.

---

## 📤 Publishing

Once zipped, this extension can be uploaded to the [Chrome Web Store](https://chrome.google.com/webstore/devconsole) to be shared internally or publicly.

---

## 🔐 Privacy & Permissions

This extension:
- Only runs scripts on the **active tab** when triggered by the user
- Does **not store**, transmit, or track any data
- Uses only browser-local scripting

---

## 🤝 Contributing

Feel free to submit issues or pull requests.  
If you have improvements (e.g., parallel processing, retries, dashboard logs), we welcome your ideas.

---

## 📄 License

MIT – free to use, share, and adapt.
