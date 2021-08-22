const { app, BrowserWindow  , BrowserView , ipcMain , session } = require('electron')
var fs=require('fs')
var path = require('path')
const os = require('os')
// const axios = require("axios");
// 热加载
// require('electron-reloader')(module,{});

global.childrenList = []


async function createWindow() {
    const win = new BrowserWindow({
        width:  1620,        //1080 * 1920
        height: 960 ,
        webPreferences: {
            nativeWindowOpen:true,

            nodeIntegration: true,
            enableRemoteModule: true
        },
        //全屏
        fullscreen :true,
        // 隐藏标题栏
        // frame: false,
        // autoHideMenuBar:true //自动隐藏菜单 按alt还是会显示
    })
    //菜单
    win.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    // win.removeMenu()    //删除菜单栏好像苹果没用
    win.loadFile('src/index/index.html')

    
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
app.on('ready',async  () => {
    // session.defaultSession.loadExtension('C:/Users/Administrator/AppData/Roaming/paizhao/extensions/nhdogjmejiglipccpnnnanhbledajbpd')
    // return
    // const { default: installExtension, } = require('electron-devtools-installer')
    // var vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1" }
    // // var vue_devtools_beta = { id: "nhdogjmejiglipccpnnnanhbledajbpd",electron:">=1.2.1"}
    // try {
    //     installExtension(vue_devtools_beta)
    // } catch (e) {
    //     console.error('Vue Devtools failed to install:', e.toString())
    // }
    
});






