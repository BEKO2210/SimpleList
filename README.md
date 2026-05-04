<div align="center">

<img src="icons/icon-512.png" alt="Simple List" width="160" />

# Simple List

**A minimalist shopping list, built as a Progressive Web App and packaged as a native Android APK.**

[![PWA](https://img.shields.io/badge/PWA-ready-000?style=for-the-badge&labelColor=000)](https://beko2210.github.io/SimpleList)
[![License](https://img.shields.io/badge/license-MIT-000?style=for-the-badge&labelColor=000)](LICENSE)
[![APK Build](https://img.shields.io/github/actions/workflow/status/BEKO2210/SimpleList/build-apk.yml?branch=main&label=APK%20Build&style=for-the-badge&labelColor=000&color=000)](https://github.com/BEKO2210/SimpleList/actions/workflows/build-apk.yml)
[![Release](https://img.shields.io/github/v/release/BEKO2210/SimpleList?label=Release&style=for-the-badge&labelColor=000&color=000)](https://github.com/BEKO2210/SimpleList/releases/latest)

[**Live Demo**](https://beko2210.github.io/SimpleList) · [**Download APK**](https://github.com/BEKO2210/SimpleList/releases/latest) · [**Report a bug**](https://github.com/BEKO2210/SimpleList/issues/new)

</div>

---

## Overview

Simple List is a fast, beautiful shopping list designed to feel like a native app on every device. It runs entirely in the browser, persists everything locally, works offline through a Service Worker, and ships as a signed Android APK built automatically by GitHub Actions.

No accounts. No tracking of your data. No backend. Your list lives on your device.

## Highlights

- **Black-and-white minimalist UI** with a hand-drawn SVG checkbox animation
- **Installable as a PWA** on Android, iOS and desktop
- **Real Android APK** auto-built from the PWA via [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- **Full offline support** through a stale-while-revalidate Service Worker
- **App-like feel** — pull-to-refresh, double-tap zoom, tap-highlight and selection are disabled on the app shell
- **Local-first persistence** with one-click JSON import / export
- **Zero dependencies** — vanilla HTML, CSS, JavaScript

## Screenshots

<div align="center">
  <em>Dark, focused, distraction-free.</em>
</div>

| Empty state | With items | Confirm dialog |
|:---:|:---:|:---:|
| Add your first item | Animated check-off | Elegant in-app modal |

## Quick Start

### Use the live PWA

Open [beko2210.github.io/SimpleList](https://beko2210.github.io/SimpleList) and tap **Add to Home Screen**. The app installs in seconds and runs offline from then on.

### Install the Android APK

1. Go to the [latest release](../../releases/latest)
2. Download `SimpleList-APK.apk`
3. Allow installation from unknown sources, then open the APK on your device

> The APK is signed with a debug key generated per build. If you previously installed a different build, uninstall it first to avoid signature conflicts.

### Run locally

```bash
git clone https://github.com/BEKO2210/SimpleList.git
cd SimpleList

# Any static server works
python3 -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000` in any modern browser.

## Build the Android APK yourself

Every push to `main` triggers `.github/workflows/build-apk.yml`, which:

1. Sets up JDK 17, Node 20 and the Android SDK with `cmdline-tools/latest`
2. Installs [`@bubblewrap/cli`](https://www.npmjs.com/package/@bubblewrap/cli)
3. Generates a fresh debug keystore
4. Reads `twa-manifest.json` and regenerates the Trusted Web Activity project
5. Builds and signs the APK and AAB
6. Verifies the signature with `apksigner`
7. Uploads `SimpleList-APK` and `SimpleList-AAB` as workflow artifacts

You can also trigger the workflow manually from the **Actions** tab. Tag a commit `v1.2.3` and the APK is automatically attached to a GitHub Release.

To produce a stable signing key across builds, replace the *Generate signing keystore* step with one that decodes a base64-encoded keystore from a repository secret.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 with custom properties and keyframe animations |
| Logic | Vanilla ES6+, no framework |
| Persistence | LocalStorage |
| Offline | Service Worker (stale-while-revalidate) |
| Packaging | Web App Manifest + Bubblewrap (TWA) |
| CI | GitHub Actions |

## Architecture

Simple List is intentionally tiny — every piece is a single, focused file.

```
SimpleList/
├── index.html                      Markup and modals
├── manifest.json                   PWA manifest
├── sw.js                           Service Worker (cache v5)
├── twa-manifest.json               Bubblewrap configuration for the APK
├── css/
│   └── styles.css                  All styles, animations, responsive rules
├── js/
│   ├── app.js                      UI behaviour, event delegation, modals
│   └── storage.js                  LocalStorage CRUD + JSON import/export
├── icons/                          PWA + APK launcher icons
└── .github/workflows/
    └── build-apk.yml               Android APK build pipeline
```

Key design decisions:

- **Event delegation** instead of per-item handlers — adding 1,000 items still attaches one listener
- **Direct DOM updates** for add / toggle / delete to avoid full re-renders
- **`crypto.randomUUID()`** for item IDs so two adds in the same millisecond never collide
- **Snapshot-then-animate** in *Clear Completed* so toggling an item during the fade-out can never desync DOM and storage
- **`textContent` everywhere** user data is rendered — no `innerHTML` escape hatches

## Browser Support

| Browser | Status |
|---|---|
| Chrome / Edge (Desktop, Android) | Full support, installable |
| Firefox (Desktop, Android) | Full support |
| Safari (macOS, iOS) | Full support, *Add to Home Screen* |
| Opera | Full support |

## Privacy

Simple List does not run a backend. Your shopping list never leaves your device. The page loads Google Fonts and a privacy-friendly [Umami](https://umami.is/) page-view counter; neither receives any list data.

## Contributing

Pull requests are welcome.

```bash
git checkout -b feature/your-idea
# make your changes
git commit -m "Add your idea"
git push origin feature/your-idea
```

Open a PR against `main`. CI will build the APK from your changes once they land.

## License

Released under the [MIT License](LICENSE).

## Acknowledgments

- Plus button by [Uiverse.io / OnCloud125252](https://uiverse.io)
- Typography: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter)
- APK packaging by [Google Chrome Labs Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)

---

<div align="center">
Made with care by <a href="https://github.com/BEKO2210">BEKO2210</a>
</div>
