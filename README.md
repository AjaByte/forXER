# Share this website

This is a static website with `index.html`, `style.css`, and `script.js`.

## Option 1: Share on the same Wi-Fi using a local server

### Using Live Server in VS Code
1. Install the **Live Server** extension in VS Code.
2. Open this project folder.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Note the browser URL, for example:
   - `http://127.0.0.1:5500`
5. On another device connected to the same network, use your computer's local IP address instead of `127.0.0.1`:
   - `http://192.168.x.x:5500`

### Using a simple local server (Node.js)
1. Open a terminal in this project folder.
2. Run:
   ```bash
   npx http-server . -p 8080
   ```
3. In the browser on another device on the same network, open:
   - `http://<your-local-ip>:8080`

## Option 2: Share publicly with GitHub Pages
1. Create a GitHub repository for this project.
2. Commit `index.html`, `style.css`, and `script.js`.
3. Enable **GitHub Pages** in the repository settings.
4. Visit the published URL shown in GitHub Pages to share your site publicly.

## Option 3: Share temporarily using ngrok
1. Start your local server on a port, for example port `5500`.
2. In a terminal, run:
   ```bash
   npx ngrok http 5500
   ```
3. Copy the generated public URL and open it on another device.

## Finding your local IP address
- Windows: open Command Prompt and run `ipconfig`
- macOS/Linux: open Terminal and run `ifconfig` or `ip a`

Use the `IPv4 Address` on the same network.

---

If you want, I can also set up a simple local server command for your current machine or help you publish to GitHub Pages step by step.