const { remote } = require('electron')
// let configDir = remote.app.getPath('userData');
var path = require('path')
// console.log(path.dirname (remote.app.getPath ('exe')))
// console.log(process.env.PORTABLE_EXECUTABLE_DIR)
new Vue({
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
                rain:"阿夫列莫夫",
                starry:'梵高'
            },
            time_1: 5,    //拍照倒计时
            time_2: 20,   //屏保视频倒计时
            time_3: "",   //15秒返回首页 定时器
            mediaStreamTrack: "",
            showVideo: true,
            newBg: '',
            showVideo2: true,
            erweima:"",
            erweimaType:0,  //0 正在生成 1 成功 2 失败 
            t:new Date().getTime(),
            videoSrc: remote.app.isPackaged ? path.dirname(remote.app.getPath('exe'))+"/resources/src/images/home_video.mp4" : "images/home_video.mp4"
        }
    },
    methods: {
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

            navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 385 } })
                .then(function (stream) {
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
                    };
                })
                .catch(function (err) {
                    console.log(err.name + ": " + err.message);
                    this_1.err('打开摄像头错误')
                });
        },
        daojishi() {
            this.step = 4
            this.time_1 = 5
            var time = setInterval(() => {
                this.time_1--
                if (this.time_1 == 0) {
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
            console.log(vWidth)

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
                        try {
                            clearTimeout(this.time_3)
                        } catch (error) { }
                        this.time_3 = setTimeout(() => {
                            if (this.step == 7) {
                                this.step = 1
                                this.btoaString = ""
                            }
                            this.video2Init()
                        }, 1000 * 15);
                    }, 1500);
                } else {
                    this.err('上传错误，请重试。')
                }
            }).catch(err => {
                console.log('cuowu')
                
                this.err('上传错误，请重试！')
                this.video2Init()
                
                // this.newBg = 'images/下载.jpg'
                // this.openerweima()
                // this.step = 6
                // setTimeout(() => {
                //     this.step = 7
                //     try {
                //         clearTimeout(this.time_3)
                //     } catch (error) { }
                //     this.time_3 = setTimeout(() => {
                //         if (this.step == 7) {
                //             this.step = 1
                //             this.btoaString = ""
                //         }
                //     }, 1000 * 15);
                //     this.video2Init()
                // }, 1500);

            })
        },
        chongXing(type) {
            console.log('重选')
            if(this.style==type) return
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

            // if (document.fullscreenElement) {
            //     document.exitFullscreen()
            // } else {
            //     document.documentElement.requestFullscreen()
            // }
        },
        video2Init() {
            this.time_2 = 20
            this.showVideo2 = false
        },
        async openerweima(){
            this.erweimaType = 0
            try {
                clearTimeout(this.time_3)
            } catch (error) { }
            this.video2Init()
            this.erweima = ''
            //上传base64图片
            var r = await upload(this.newBg)
            this.video2Init()
            if(r.status!=200){
                this.erweima = ''
                this.erweimaType = 2
                return
            }
            console.log(r)
            var imgurl = r.imageUrl
            var QRCode = require('qrcode')
            QRCode.toDataURL(imgurl, (err, url)=> {
                this.video2Init()
                if(err){
                    this.erweima = ''
                    this.erweimaType = 2
                    this.video2Init()
                }else{
                    this.erweima = url
                    this.erweimaType = 1
                }
                // upload(url)
            })
        },
        点击屏幕(e){
            var video2 = document.querySelector('#video2')
            if(e.target != video2){
                console.log('点击非视频内容添加倒计时')
                this.video2Init()
            }
        }
    },
    mounted() {
        // console.log('test')
        // console.log('ttt',remote)

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