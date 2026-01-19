# Simple List

A beautiful, minimalist shopping list Progressive Web App (PWA) with smooth animations and elegant design.

![Simple List](https://img.shields.io/badge/PWA-Ready-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Minimalist Dark Design** - Clean, modern interface with a beautiful dark theme
- **Smooth Animations** - Elegant transitions and micro-interactions throughout
- **Animated Checkboxes** - Hand-drawn SVG checkbox animation when completing items
- **Offline Support** - Works without internet connection thanks to Service Worker caching
- **Installable** - Add to home screen on any device for a native app experience
- **Data Persistence** - Your list is saved locally and persists between sessions
- **Import/Export** - Backup and restore your data as JSON files
- **Responsive** - Looks great on desktop, tablet, and mobile devices

## Live Demo

Visit: [https://beko2210.github.io/SimpleList](https://beko2210.github.io/SimpleList)

## Screenshots

### Main Interface
- Dark, elegant design with smooth animations
- Playfair Display typography for the title
- Animated SVG checkboxes

### Confirm Dialogs
- Beautiful modal dialogs instead of browser alerts
- Smooth fade and scale animations

## Installation

### As a PWA (Recommended)

1. Visit the live demo link
2. Click "Add to Home Screen" when prompted (or use browser menu)
3. The app will install and work offline

### Local Development

```bash
# Clone the repository
git clone https://github.com/BEKO2210/SimpleList.git

# Navigate to the project
cd SimpleList

# Serve with any static server (e.g., using Python)
python -m http.server 8000

# Or using Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.

## Usage

### Adding Items
- Type in the input field and press **Enter** or click **ADD**
- Or click the **+** floating action button

### Completing Items
- Click anywhere on an item to toggle completion
- Watch the animated checkmark appear

### Editing Items
- Hover over an item and click the **edit** button
- Modify the text and save

### Deleting Items
- Hover over an item and click the **delete** button
- Confirm in the elegant modal dialog

### Clearing Completed
- Click **Clear** to remove all completed items
- A confirmation dialog will appear

### Import/Export
- **Export**: Download your list as a JSON file
- **Import**: Upload a previously exported JSON file

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, animations, and gradients
- **Vanilla JavaScript** - No frameworks, pure ES6+ code
- **Service Worker** - Offline caching and PWA functionality
- **LocalStorage** - Data persistence

## Project Structure

```
SimpleList/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── css/
│   └── styles.css     # All styles and animations
├── js/
│   ├── app.js         # Main application logic
│   └── storage.js     # LocalStorage management
├── icons/             # PWA icons
└── README.md          # This file
```

## Browser Support

- Chrome (Desktop & Mobile)
- Firefox
- Safari (Desktop & iOS)
- Edge
- Opera

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- UI components inspired by [Uiverse.io](https://uiverse.io)
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Inter](https://fonts.google.com/specimen/Inter)

---

Made with care by [BEKO2210](https://github.com/BEKO2210)
