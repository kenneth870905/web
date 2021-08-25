const { app, BrowserWindow  , BrowserView , ipcMain , session } = require('electron')
const electron = require('electron')
var fs=require('fs')
var path = require('path')
const os = require('os')

// const notifier = require("node-notifier");
// const axios = require("axios");
// 热加载
// require('electron-reloader')(module,{});

global.childrenList = []


async function createWindow() {
    // notifier.notify(
    //     {
    //       title:"提示",
    //       message:"没有检测到分屏，正在等待"
    //     },
    //     (err, res) => {
    //       if (err) {
    //         console.log("error:", err);
    //       }
    //     }
    //   );
    // return

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
        autoHideMenuBar:true //自动隐藏菜单 按alt还是会显示
    })
    win.setAlwaysOnTop(true)
    //菜单
    // win.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    // win.removeMenu()    //删除菜单栏好像苹果没用
    win.loadFile('src/index/index.html')
    setInterval(() => {
        console.log('获取焦点')
        win.focus();
    }, 1000*10);
    
    
    let displays = electron.screen.getAllDisplays()
    let fenPingList  = displays.filter(value=>value.bounds.x !== 0 || value.bounds.y !== 0)

        // fenPingList = [ {bounds: { x: 0, y: 0, width: 1920, height: 1080 }} , {bounds: { x: 0, y: 0, width: 1920, height: 1080 }}]
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
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
            fullscreen:true,    //全屏
            autoHideMenuBar:true //自动隐藏菜单 按alt还是会显示
        }
        dataList.map((x,index)=>{
            if(!fenPingList[index]) return

            x.sendName = 'sendC'+index
            let peizhi1=Object.assign({},peizhi)
                peizhi1.title=x.name
                peizhi1.webPreferences.additionalArguments=[JSON.stringify(x.time),JSON.stringify(x.list)]  //添加属性
                peizhi1.x= fenPingList[index].bounds.x
            var child1 =  new BrowserWindow(peizhi1)
                child1.loadFile('src/child1/child1.html')
                child1.removeMenu()    //删除菜单栏好像苹果没用
            ipcMain.on('sendC'+index,(e,message)=>{
                child1.webContents.send('imgUploadMsgFromMain', message);
            })
        })

        global.childrenList = dataList.filter((value,index)=>fenPingList[index])
        
    
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






