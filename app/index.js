const electron = require('electron')
const open = require('open')
// Module to control application life.
const {app, Menu, Tray} = require('electron')


// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let prefWindow;
let tray;

//Creating icon for the app. Not sure where used. Differes depending on platform.
const nativeImage = require('electron').nativeImage;
let image = nativeImage.createFromPath('file://${__dirname}/icon.png');
let iconPath = __dirname.split('/').slice(0, -1).join('/') + '/icons/icon.png';

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: iconPath});

  //Load main vector file
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  //Create app wide menu from template. Needed for shortcuts to work.
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  //Hijack all _blank links to open in browser instead of electron window.
  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    open(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  })

  if (process.platform !== 'darwin') {
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
      {
        role: 'quit'
      }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



// long menu template - could be separated
const template = [
  {
    label: 'Vector',
    submenu: [
      {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        click(item, focusedWindow) {
          prefWindow = new BrowserWindow({width: 400, height: 300, icon: __dirname.split('/').slice(0, -1).join('/') + '/icons/icon.png'});
          prefWindow.loadURL(`file://${__dirname}/pref/index.html`);
        }
      },
      {
        role: 'quit'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        role: 'togglefullscreen'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.webContents.toggleDevTools();
        }
      },
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      },
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('http://vector.im'); }
      },
    ]
  },
];

if (process.platform === 'darwin') {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      },
    ]
  });
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ];
}
