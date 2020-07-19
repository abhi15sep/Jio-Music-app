const electron = require('electron')
const { app, BrowserWindow, Tray } = electron
const path = require('path')

let mainWindow, tray
let forceQuit = false

app.on('ready', () => {
  if (process.platform === 'darwin') {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({ width, height, resizable: false })
  } else {
    mainWindow = new BrowserWindow({ show: false })
    mainWindow.maximize()
    mainWindow.setResizable(false)
    mainWindow.show()
  }

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  tray = new Tray(path.join(__dirname, 'asserts/tray.png'))
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

  mainWindow.on('close', (e) => {
    if (forceQuit) {
      mainWindow = null
    } else {
      e.preventDefault()
      mainWindow.hide()
    }
  })
})

app.on('activate', () => mainWindow.show())
app.on('before-quit', () => {
  forceQuit = true
})
