const { app, BrowserWindow  , BrowserView} = require('electron')


// 热加载
// require('electron-reloader')(module,{});

function createWindow() {
    const win = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        //全屏
        fullscreen :true,
        // 隐藏标题栏
        // frame: false,
    })
    //菜单
    win.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    win.loadFile('src/index.html')
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
