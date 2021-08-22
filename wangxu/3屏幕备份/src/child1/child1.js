const { remote , ipcRenderer} = require('electron')
// console.log(remote)
// console.log(remote.getCurrentWindow())
const path = require('path')
// console.log(remote.BrowserWindow.getAllWindows())
// w.webContents.openDevTools()
        //父传子
let argv = window.process.argv
let imgList = JSON.parse(argv.pop())
    console.log(imgList)
var newvue = new Vue({
    el:"#vue",
    data() {
        return {
            src:remote.app.isPackaged ? path.dirname(remote.app.getPath('exe'))+'/resources/src/' : '../',
            test1:"显示窗口1",
            imgList:imgList,
            showSwiper:true,
            // get newBg(){
            //     return this.src+'config/下载.jpg'
            // },
            newBg:"",
            erweimaType:0,
            // get erweima(){
            //     return this.src+'config/下载.jpg'
            // },
            erweima:""
            // childrenList:remote.getGlobal('childrenList')
        }
    },
    methods: {
        full(){
            var wind = remote.getCurrentWindow()
            wind.simpleFullScreen = !wind.simpleFullScreen;
        }
    },
    mounted () {
        var swiper = new Swiper('.swiper1',{
            loop : true,
            autoplay: { //自动切换
                disableOnInteraction: false,    //触碰后不会停止自动切换
            },
            observer:true,  //隐藏显示后正常播放
        });


        ipcRenderer.on('imgUploadMsgFromMain',(e, message)=>{
            console.log('收到消息',message)
            this.newBg=message.newBg
            this.erweima = message.erweima
            this.showSwiper = false
            setTimeout(() => {
                this.showSwiper = true
            }, 1000*20);
        })
    }
})

