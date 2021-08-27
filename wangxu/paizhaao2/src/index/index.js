const { app, remote, ipcRenderer } = require('electron')
var path = require('path')

// let configDir = remote.app.getPath('userData');
// console.log(path.dirname (remote.app.getPath ('exe')))
// console.log(process.env.PORTABLE_EXECUTABLE_DIR)
console.log(remote.getGlobal('childrenList'))
let childrenList = [] 
remote.getGlobal('childrenList').map(value=>{
    childrenList.push({
        sendName:value.sendName
    })
})


Vue.config.devtools = true;
var newVue = new Vue({
    el: '#vue',
    data() {
        return {
            step: 1,    //步骤
            style: 'pointillism',     // "cubism"表示立体主义 "pointillism" 表示点彩风格 "the_scream"表示呐喊风格。
            img2: "",
            img3: "",
            btoaString: "",
            showFile: true,
            errText: "上传错误，请重试",
            user: {
                cubism: '巴勃罗·毕加索',
                pointillism: "乔治·修拉",
                the_scream: "爱德华·蒙克",
                rain: "阿夫列莫夫",
                starry: '梵高'
            },
            time_1: 5,    //拍照倒计时
            time_2: 20,   //屏保视频倒计时
            time_3: "",   //15秒返回首页 定时器
            mediaStreamTrack: "",
            showVideo: true,
            newBg: '',
            showVideo2: true,
            erweima: "",
            erweimaType: 0,  //0 正在生成 1 成功 2 失败 
            t: new Date().getTime(),
            src: remote.app.isPackaged ? path.dirname(remote.app.getPath('exe')) + '/resources/src/' : '../',
            videoSrc: remote.app.isPackaged ? path.dirname(remote.app.getPath('exe')) + "/resources/src/images/home_video.mp4" : "../images/home_video.mp4",
            childrenList:childrenList,
        }
    },
    methods: {
        sedM3() {
            ipcRenderer.send('sendC2', { 'name': "传递参数2222222" });
        },
        xuanZuoZhe(t) {
            var this_1 = this
            this.step = 3
            this.style = t
            this.showVideo = true

            // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }

            // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia 
            // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    // 首先，如果有getUserMedia的话，就获得它
                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }

            navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 385 } }).then(function (stream) {
                this_1.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                var video = document.querySelector('#video');
                // 旧的浏览器可能没有srcObject
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    // 防止在新的浏览器里使用它，应为它已经不再支持了
                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = function (e) {
                    video.play();
                    this_1.daojishi()
                    console.log('摄像头已打开')
                };
            }).catch(function (err) {
                console.log(err.name + ": " + err.message);
                this_1.err('打开摄像头错误')
            });
        },
        daojishi() {
            this.step = 4
            this.time_1 = 5
            var time = setInterval(() => {
                this.time_1--
                if (this.time_1 <= 0) {
                    clearInterval(time)
                    this.paizhao()
                }
            }, 1000);
        },
        paizhao() {
            console.log('开始拍照')
            var video = document.getElementById("video")
            var canvas = document.getElementById("canvas")
            var context = canvas.getContext("2d")
            var vHeight = video.videoHeight
            var vWidth = video.videoWidth;
            // console.log(vWidth)

            canvas.width = vWidth * 4; // 改变画布的宽高
            canvas.height = vHeight * 4;
            context.drawImage(video, 0, 0, vWidth * 4, vHeight * 4);
            // 获取图片src  base64格式
            this.btoaString = document.getElementById("canvas").toDataURL("image/jpeg", 0.8);
            // console.log('拍照：', this.btoaString)
            this.mediaStreamTrack.stop()
            this.showVideo = false
            this.submit()

        },
        submit() {
            this.step = 5
            axios({
                method: 'post',
                url: 'http://localhost:6062/portrait_transfer',
                data: {
                    image: this.btoaString,
                    style: this.style
                }
            }).then(x => {
                console.log('调用上传接口', x)
                this.video2Init()
                if (x.data.state == "success") {
                    this.newBg = x.data.image
                    this.step = 6
                    this.openerweima()
                    setTimeout(() => {
                        this.step = 7
                        // try {
                        //     clearTimeout(this.time_3)
                        // } catch (error) { }
                        // this.time_3 = setTimeout(() => {
                        //     if (this.step == 7) {
                        //         this.step = 1
                        //         this.btoaString = ""
                        //     }
                        //     this.video2Init()
                        // }, 1000 * 10);
                    }, 1500);
                } else {
                    this.err('上传错误，请重试。')
                }
            }).catch(err => {
                console.log('cuowu')

                this.err('上传错误，请重试！')
                this.video2Init()
                // return

                // this.newBg = '这里需要换成base64'
                // this.newBg = 'data:image/png;base64,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'
                // this.openerweima()
                // this.step = 6
                // setTimeout(() => {
                //     this.step = 7
                //     // try {
                //     //     clearTimeout(this.time_3)
                //     // } catch (error) { }
                //     // this.time_3 = setTimeout(() => {
                //     //     if (this.step == 7) {
                //     //         this.step = 1
                //     //         this.btoaString = ""
                //     //     }
                //     //     this.video2Init()
                //     // }, 1000 * 10);
                // }, 1500);

            })
        },
        chongXing(type) {
            console.log('重选')
            if (this.style == type) return
            this.style = type
            this.submit()
        },
        playVideo() {
            if (document.querySelector('#video2')) {
                document.querySelector('#video2').play()
            }
        },
        kaishi() {
            this.step = 2;
        },
        err(str) {
            this.errText = str
            this.step = 'err'
            setTimeout(() => {
                this.step = 1
                this.btoaString = ""
            }, 5000);
        },
        full() {
            var wind = remote.getCurrentWindow()
            wind.simpleFullScreen = !wind.simpleFullScreen;
        },
        video2Init() {
            this.time_2 = 20
            this.showVideo2 = false
        },
        async openerweima() {
            console.log('正在生成二维码')
            this.erweimaType = 0
            try {
                clearTimeout(this.time_3)
            } catch (error) { }
            this.video2Init()
            this.erweima = ''
            //上传base64图片
            var r = await upload(this.newBg)
            console.log(r)
            this.video2Init()
            if (r.status != 200) {
                this.erweima = ''
                this.erweimaType = 2
                return
            }
            var imgurl = 'http://' + r.imageUrl
            console.log(imgurl)
            var QRCode = require('qrcode')
            QRCode.toDataURL(imgurl, (err, url) => {
                this.video2Init()
                if (err) {
                    this.erweima = ''
                    this.erweimaType = 2
                    this.video2Init()
                } else {
                    this.erweima = url
                    this.erweimaType = 1
                    this.sedchildren()
                }
                // upload(url)
            })
        },
        sedchildren(){
            console.log(this.childrenList)
            let L1 = this.childrenList.filter(x=>!x.show)
            console.log(L1)
            if(L1.length<1) return
            var index = Math.floor((Math.random()*L1.length))
            let o = L1[index]
                o.show=true
                o.time=function(){
                    console.log(this)
                    let this_1 = this
                    setTimeout(() => {
                        console.log(this_1)
                        this_1.show=false
                    }, 1000 * 20);
                }
                o.time()
                ipcRenderer.send(o.sendName, { newBg: this.newBg ,erweima:this.erweima });
                
        },
        点击屏幕(e) {
            var video2 = document.querySelector('#video2')
            if (e.target != video2) {
                console.log('点击非视频内容添加倒计时')
                this.video2Init()
            }
        }
    },
    mounted() {
        
       

        setInterval(() => {
            this.time_2--
            if(this.time_2<=0){
                this.showVideo2=true
                this.step = 1
                this.$nextTick(()=>{
                    document.querySelector('#video2').play()
                })
            }
        }, 1000);

    }
})