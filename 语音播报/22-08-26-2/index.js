const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  createWindow()
})

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('./index.html')

  win.webContents.openDevTools()
}