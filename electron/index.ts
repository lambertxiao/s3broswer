import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    height: 800,
    width: 1024,
    title: 'S3Broswer',
    // frame: false,
    // transparent: true,

    frame: app.isPackaged ? false : true,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.js'),
      nodeIntegration: true,
    },
  });

  // win.webContents.openDevTools();
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    win.loadURL(process.env.VITE_DEV_SERVER_URL as string);
  }

  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('ready', () => {
  const template = [
    {
      label: 'Edit App',
      submenu: [
        {label: '新建配置'},
      ]
    }
  ];
  const appMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(appMenu);

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
