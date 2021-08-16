const { app, BrowserWindow  , BrowserView , ipcMain} = require('electron')

// const axios = require("axios");
// 热加载
// require('electron-reloader')(module,{});

function createWindow() {
    const win = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nativeWindowOpen:true,

            nodeIntegration: true,
            enableRemoteModule: true
        },
        //全屏
        // fullscreen :true,
        // 隐藏标题栏
        // frame: false,
    })
    //菜单
    win.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    win.loadFile('src/index/index.html')
    setTimeout(() => {
        win.webContents.openDevTools()
    }, 1000);

    var childrenList = []
    var fs=require('fs')
    fs.readFile('src/config/config.json','utf8',function (err, dataList) {
        console.log(list)
        let peizhi = {
            width: 960,
            height: 540,
            title:"",
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
        }
        dataList.map((x,index)=>{
            let peizhi1=Object.assign({},peizhi)
                peizhi1.title=x.name
            var child1 =  new BrowserWindow(peizhi1)
                child1.loadFile('src/child1/child1.html')
            ipcMain.on('sendC'+index,(e,message)=>{
                child1.webContents.send('imgUploadMsgFromMain', message);
            })
        })
        
        let peizhi1=Object.assign({},peizhi)
            peizhi1.title='1'
        var child1 =  new BrowserWindow(peizhi1)
        let peizhi2=Object.assign({},peizhi)
            peizhi2.title='2'
        var child2 =  new BrowserWindow(peizhi2)
        let peizhi3=Object.assign({},peizhi)
            peizhi3.title='3'
        var child3 =  new BrowserWindow(peizhi3)
        //菜单
        // child1.setMenuBarVisibility(false)
        //全屏
        // win.simpleFullScreen = true
        child1.loadFile('src/child1/child1.html')
        child2.loadFile('src/child1/child1.html')
        child3.loadFile('src/child1/child1.html')
    
        // ipcMain.on('sendC2',(e,message)=>{
        //     child2.webContents.send('imgUploadMsgFromMain', message);
        // })
    
        // ipcMain.on('imgUploadMain', (event, message) => {
        //     console.log('接受消息')
        //     child1.webContents.send('imgUploadMsgFromMain', message);
        //     child2.webContents.send('imgUploadMsgFromMain', message);
        //     child3.webContents.send('imgUploadMsgFromMain', message);
        // });
    
        // console.log(BrowserWindow.getAllWindows())
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

    return
    let peizhi = {
        width: 960,
        height: 540,
        title:"",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    }
    let peizhi1=Object.assign({},peizhi)
        peizhi1.title='1'
    var child1 =  new BrowserWindow(peizhi1)
    let peizhi2=Object.assign({},peizhi)
        peizhi2.title='2'
    var child2 =  new BrowserWindow(peizhi2)
    let peizhi3=Object.assign({},peizhi)
        peizhi3.title='3'
    var child3 =  new BrowserWindow(peizhi3)
    //菜单
    // child1.setMenuBarVisibility(false)
    //全屏
    // win.simpleFullScreen = true
    child1.loadFile('src/child1/child1.html')
    child2.loadFile('src/child1/child1.html')
    child3.loadFile('src/child1/child1.html')

    ipcMain.on('sendC2',(e,message)=>{
        child2.webContents.send('imgUploadMsgFromMain', message);
    })

    ipcMain.on('imgUploadMain', (event, message) => {
        console.log('接受消息')
        child1.webContents.send('imgUploadMsgFromMain', message);
        child2.webContents.send('imgUploadMsgFromMain', message);
        child3.webContents.send('imgUploadMsgFromMain', message);
    });

    // console.log(BrowserWindow.getAllWindows())
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
    // win.on('closed',function(){
    //     console.log('closd1111111111')
    //     // console.log(BrowserWindow.getAllWindows())
    //     let list = BrowserWindow.getAllWindows()
    //     list.forEach(item=>{
    //         item.close()
    //     })
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


