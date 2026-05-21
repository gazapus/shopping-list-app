# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **React Native / Expo SDK 39** shopping list app (Spanish UI) targeting **Android**. It uses React Navigation v4 and AsyncStorage for local persistence. There is no backend, no database, and no external services.

### Node.js version

This project requires **Node.js 14** (LTS at the time of Expo SDK 39). The environment uses `nvm` to manage versions:

```bash
nvm use 14
```

### Running the development server

```bash
cd /workspace
expo start
```

The Metro bundler starts at `exp://127.0.0.1:19000`. The packager status endpoint is at `http://localhost:19001/status`.

### Web mode limitation

Running `expo start --web` will show a webpack compilation error for `@react-native-community/checkbox` because this native module has no web implementation (only `.android.js`, `.ios.js`, `.windows.js` files exist). This is a **pre-existing limitation** of the codebase — the app was designed for Android only.

To verify the app code compiles correctly for native, request the bundle from Metro:

```bash
curl -s -o /dev/null -w "%{http_code}" "http://localhost:19001/App.bundle?platform=android&dev=true&hot=false"
```

This should return `200` and a ~5MB bundle.

### No lint or test suite

The codebase has no ESLint config, no test framework, and no CI. The only npm script of note is `start` (which runs `expo start`).

### Key directories

- `screens/` — Main, List, Configuration screens
- `components/` — Reusable UI components (Modal, ItemForm, buttons, etc.)
- `classes/` — Data models (Item, List)
- `assets/` — Icons and splash images
