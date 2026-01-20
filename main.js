const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Worklist',
    icon: path.join(__dirname, 'app', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#1e293b',
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Task',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          mainWindow.webContents.executeJavaScript('window.addTaskFromMenu && window.addTaskFromMenu()');
        }
      },
      { type: 'separator' },
      {
        label: 'Export Data',
        accelerator: 'CmdOrCtrl+E',
        click: () => {
          mainWindow.webContents.executeJavaScript('window.exportFromMenu && window.exportFromMenu()');
        }
      },
      {
        label: 'Import Data',
        accelerator: 'CmdOrCtrl+I',
        click: () => {
          mainWindow.webContents.executeJavaScript('window.importFromMenu && window.importFromMenu()');
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { role: 'resetZoom' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About Worklist',
        click: () => {
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'About Worklist',
            message: 'Worklist v1.0.0',
            detail: 'Offline-first task management.\nNo account required.\n\nYour data stays on your device.'
          });
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });
}

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
