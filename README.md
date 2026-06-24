# Aryan Parihar - Dynamic Developer Portfolio

A premium, highly interactive, and fully responsive developer portfolio built using modern Vanilla HTML5, CSS3, and JavaScript. 

Live Demo instructions below!

## Features
- **Modern Glassmorphic Design**: Clean cards and panels utilizing `backdrop-filter: blur()` and glowing background orbs.
- **Dual-Theme Support**: Instant dark and light mode toggle with smooth color-fade transitions.
- **Dynamic Typing Animation**: Alternating professional titles in the hero page.
- **Interactive Project Filtering**: Switch between Categories (All / Machine Learning / Full-Stack / Unity Games) dynamically.
- **Details Modals**: Click "Read More" on projects or certificates to open dedicated information popups.
- **Scrollspy Navigation**: Sticky navbar that highlights the active section as you scroll down.
- **Scroll Reveal Animations**: Elements slide up and fade in smoothly as they enter the viewport.
- **Copy-to-Clipboard**: Direct contact utility to copy email/mobile number with toast notifications.
- **Zero Build Configurations**: Pure static layout allowing instant hosting on GitHub Pages.

---

## Folder Structure
```
portfolio/
├── index.html   # Main HTML structure and section elements
├── style.css    # Premium custom design rules, variables, and layouts
├── script.js    # Interactive modal, filters, theme toggle, and typing effects
└── README.md    # Installation and deployment guide
```

---

## How to Run Locally
Since this project uses plain HTML, CSS, and JS without complex bundlers, you can view it directly in any browser:
1. Double-click `index.html` to open it in your default web browser.
2. Alternatively, you can use VS Code's **Live Server** extension or run a simple local server:
   ```bash
   npx serve .
   ```

---

## How to Host Publicly on GitHub Pages

Follow these simple steps to deploy your portfolio online for free:

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account at [github.com](https://github.com).
2. Click the **New** button (or go to [github.com/new](https://github.com/new)).
3. Name your repository (e.g., `portfolio` or `aryan-parihar`).
4. Select **Public**.
5. Do **not** initialize with a README, `.gitignore`, or license (since we already have them).
6. Click **Create repository**.

### Step 2: Push files to GitHub
Run the following commands in your command prompt or terminal in the `portfolio` directory:
```bash
# Initialize local git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit of portfolio codebase"

# Rename default branch to main
git branch -M main

# Link local repository to your remote GitHub repo
git remote add origin https://github.com/aryanparihar157/<your-repository-name>.git

# Push code to GitHub
git push -u origin main
```
*(Note: If prompted, authenticate using your browser or personal access token.)*

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Click the dropdown (currently *None*), select **main**, keep folder as **/ (root)**, and click **Save**.
5. Wait 1-2 minutes. Refresh the settings page, and you will see a banner at the top of the Pages section: 
   > **Your site is live at `https://aryanparihar157.github.io/<your-repository-name>/`**

Congratulations! Your portfolio is now globally accessible!
