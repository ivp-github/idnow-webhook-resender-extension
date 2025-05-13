# IDnow Webhook Resender Extension

This Chrome extension automates the process of searching for Ident-IDs in the IDnow web platform, opening their detail view, and resending webhooks.

## Features

- Paste Ident-IDs directly or upload a CSV file
- Automatically clicks "view" and "resend webhook"
- Works directly in the IDnow browser tab
- Generates a summary report in the console
- Retries failures once automatically

## How to Use

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click "Load unpacked" and select this folder
5. Visit your IDnow dashboard
6. Click the extension icon and:
   - Paste Ident-IDs (one per line) **or**
   - Upload a CSV file with Ident-IDs in the first column
7. Click "Start Automation"

## File Structure

- `popup.html` — UI for user input
- `popup.js` — Script logic and automation
- `content.js` — Optional content script (currently empty)
- `background.js` — Required placeholder for Manifest V3
- `manifest.json` — Chrome extension config