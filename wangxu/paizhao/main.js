const { app, BrowserWindow  , BrowserView , ipcMain , session } = require('electron')
const electron = require('electron') //获取electron对象
var fs=require('fs')
var path = require('path')
const os = require('os')
// const axios = require("axios");
// 热加载
// require('electron-reloader')(module,{});

global.childrenList = []


async function createWindow() {
    const win = new BrowserWindow({
        width: 540,
        height: 960,
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
    // win.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    win.removeMenu()    //删除菜单栏好像苹果没用
    win.loadFile('src/index/index.html')
    // win.on('maximize', function () {
    //     win.simpleFullScreen = true;
    // })

    // 获取屏幕信息
    let displays = electron.screen.getAllDisplays()
    // 过滤主屏幕
　　let externalDisplay = displays.filter((display) => {
    　　return display.bounds.x !== 0 || display.bounds.y !== 0
　　})
    console.log(externalDisplay)
    // return
    let src = app.isPackaged ? path.dirname(app.getPath('exe'))+'/resources/src/' : 'src/'
    fs.readFile(src+'config/config.json','utf8',function (err, data) {
        let dataList=JSON.parse(data)
        console.log(dataList)
        let peizhi = {
            width: 540,
            height: 960,
            y:50,
            title:"",
            // frame: false,   //隐藏状态栏
            fullscreen:true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                // additionalArguments:[]
            },
            // autoHideMenuBar:true //自动隐藏菜单 按alt还是会显示
        }
        dataList.map((x,index)=>{
            if(!externalDisplay[index]) return

            x.sendName = 'sendC'+index
            let peizhi1=Object.assign({},peizhi)
                peizhi1.title=x.name
                peizhi1.webPreferences.additionalArguments=[JSON.stringify(x.list)]  //添加属性
                peizhi1.x = externalDisplay[index].bounds.x
                console.log(peizhi1)
            var child1 =  new BrowserWindow(peizhi1)
                child1.loadFile('src/child1/child1.html')
                child1.removeMenu()    //删除菜单栏好像苹果没用
                
            ipcMain.on('sendC'+index,(e,message)=>{
                child1.webContents.send('imgUploadMsgFromMain', message);
            })
        })

        global.childrenList = dataList
        
    
        let list = BrowserWindow.getAllWindows()
        list.forEach(item=>{
            item.on('closed',function(){
                try {
                    let list2 = BrowserWindow.getAllWindows()
                    list2.forEach(item2=>{
                        item2.close()
                    })
                } catch (error) {
                }
            })
        })
    });


    //创建窗口方法一
    // win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    //     if (frameName === 'modal') {
    //         console.log('modal')
    //       // open window as modal
    //       event.preventDefault()
    //       Object.assign(options, {
    //         // modal: true,
    //         parent: win,
    //         width: 800,
    //         height: 800,
    //         fullscreen:false
    //       })
    //       event.newGuest = new BrowserWindow(options)
    //     }
    // })

    
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






