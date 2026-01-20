# Worklist

**Offline-first task management. No account required.**

![Worklist Screenshot](screenshot.png)

## Features

- ✅ Works 100% offline
- ✅ Categories with drag-and-drop reordering
- ✅ Priority views (High/Medium/Low)
- ✅ Subtasks with progress tracking
- ✅ Slack integration for sharing
- ✅ Undo delete (5 second window)
- ✅ Export/Import JSON backups
- ✅ Data stays on your device

## Download

Go to [Releases](../../releases) and download:

| Platform | File |
|----------|------|
| Windows (installer) | `Worklist-Setup-1.0.0.exe` |
| Windows (portable) | `Worklist-1.0.0.exe` |
| macOS | `Worklist-1.0.0.dmg` |
| Linux | `Worklist-1.0.0.AppImage` |

## Building from Source

### Prerequisites
- Node.js 18+
- npm

### Development
```bash
npm install
npm start
```

### Build Installers
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| New Task | Ctrl+N | Cmd+N |
| Export | Ctrl+E | Cmd+E |
| Import | Ctrl+I | Cmd+I |

## Slack Integration

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create New App → From Scratch
3. Add "Incoming Webhooks" feature
4. Create webhook for your channel
5. Paste URL in Worklist settings

## License

MIT
